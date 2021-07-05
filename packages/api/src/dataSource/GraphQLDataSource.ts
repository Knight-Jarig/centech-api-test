// Module is inactive for almost 6 months and do not provide type definition.
// https://github.com/poetic/apollo-datasource-graphql/blob/master/src/GraphQLDataSource.ts

import { DataSourceConfig } from 'apollo-datasource';
import { ApolloLink, execute, GraphQLRequest, makePromise } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { ApolloError, AuthenticationError, ForbiddenError } from 'apollo-server-errors';
import { DocumentNode } from 'graphql';
import fetch from 'isomorphic-unfetch';
import { KeyValueCache } from 'apollo-server-caching';
import { BaseContext } from '../types';
import configs from '../configs/vars';
import { canUseCache } from '../utils/cache';
import * as Sentry from '@sentry/node';

interface Config {
  cacheOptions?: { ttl?: number };
}

export class GraphQLDataSource {
  public baseURL!: string;
  public context!: BaseContext;
  protected cache: KeyValueCache;

  public initialize(config: DataSourceConfig<BaseContext>): void {
    this.context = config.context;
    this.cache = config.cache;
  }

  public async mutation(mutation: DocumentNode, options?: GraphQLRequest) {
    // GraphQL request requires the DocumentNode property to be named query
    return this.executeSingleOperation({ ...options, query: mutation });
  }

  public async query(query: DocumentNode, options?: GraphQLRequest, config?: Config) {
    return this.executeSingleOperation({ ...options, query }, config);
  }

  protected willSendRequest?(request: any): any;

  private composeLinks(): ApolloLink {
    const uri = this.resolveUri();

    return ApolloLink.from([this.onErrorLink(), this.onRequestLink(), createHttpLink({ fetch, uri })]);
  }

  private didEncounterError(error: any) {
    const status = error.statusCode ? error.statusCode : null;
    const message = error.bodyText ? error.bodyText : null;

    let apolloError: ApolloError;

    switch (status) {
      case 401:
        apolloError = new AuthenticationError(message);
        break;
      case 403:
        apolloError = new ForbiddenError(message);
        break;
      case 502:
        apolloError = new ApolloError('Bad Gateway', status);
        break;
      case 504:
        apolloError = new ApolloError('Gateway Timeout From Other Service', status);
        break;
      default:
        apolloError = new ApolloError(message, status);
    }

    throw apolloError;
  }

  protected async executeSingleOperation(operation: GraphQLRequest, config?: Config) {
    const definition = operation.query.definitions.find(i => i.kind === 'OperationDefinition') as any;
    const name = definition?.name.value ?? 'N/A';
    const variables = JSON.stringify(operation.variables);
    const ALTERNATE = 'alternate';
    const DEBUG = 'debug';
    const alternateKey = this.context?.headers?.['x-intent-alias'] === ALTERNATE ? `:${ALTERNATE}` : '';
    const debugKey = this.context?.headers?.['x-force-debug-cs-response'] === '1' ? `:${DEBUG}` : '';
    const key = `${name}(${variables})${alternateKey}${debugKey}`;
    const start = Date.now();
    const ttl = config?.cacheOptions?.ttl;

    if (canUseCache(configs.appEnv, this.context?.headers?.['cache-control'] || '')) {
      let useRedis = configs.useRedisCluster ? !!configs.redisClusterUrl : !!configs.redisUrl;
      useRedis = useRedis || !!(configs.redisUrlReadOnly && configs.redisUrlReadWrite);
      const cache = useRedis ? await this.cache.get(key) : null;
      if (cache) {
        const endWithCache = Date.now();
        const cacheData = JSON.parse(cache);

        console.log(`(${endWithCache - start}ms) FROM CACHE ${key}`);

        this.addRequestUsage(
          key,
          ttl,
          {
            statusCode: 200,
            bodyText: 'CACHE',
          },
          cacheData,
        );

        return cacheData;
      }
    }

    const link = this.composeLinks();

    let lock;
    let useRedis = configs.useRedisCluster ? !!configs.redisClusterUrl : !!configs.redisUrl;
    useRedis = useRedis || !!(configs.redisUrlReadOnly && configs.redisUrlReadWrite);
    if (useRedis && this.context.redlock) {
      try {
        lock = await this.context.redlock.lock(`locks:${key}`, configs.redlock.catalogServiceLockTTL);
      } catch (e) {
        if (configs.sentry.dsn) {
          Sentry.withScope(scope => {
            scope.setLevel(Sentry.Severity.Warning);
            Sentry.captureException(e);
          });
        }
      }
    }

    if (this.context.redlock && canUseCache(configs.appEnv, this.context?.headers?.['cache-control'] || '')) {
      let useRedis = configs.useRedisCluster ? !!configs.redisClusterUrl : !!configs.redisUrl;
      useRedis = useRedis || !!(configs.redisUrlReadOnly && configs.redisUrlReadWrite);
      const cache = useRedis ? await this.cache.get(key) : null;
      if (cache) {
        lock?.unlock();
        const endWithCache = Date.now();
        const cacheData = JSON.parse(cache);

        console.log(`(${endWithCache - start}ms) FROM CACHE ${key}`);

        this.addRequestUsage(
          key,
          ttl,
          {
            statusCode: 200,
            bodyText: 'CACHE',
          },
          cacheData,
        );

        return cacheData;
      }
    }

    const [error, response] = await makePromise(execute(link, operation))
      .then(res => [null, res])
      .catch(err => [err, null]);

    const end = Date.now();

    console.log(`(${end - start}ms) ${key}`);

    this.addRequestUsage(key, ttl, error, response);

    if (error) {
      await lock?.unlock();
      this.didEncounterError(error);
    }

    if (definition?.operation !== 'query' || error) {
      return response;
    }

    if (configs.redisUrl || !!(configs.redisUrlReadOnly && configs.redisUrlReadWrite)) {
      this.cache.set(key, JSON.stringify(response), { ttl });
      await lock?.unlock();
    }

    return response;
  }

  private resolveUri(): string {
    const baseURL = this.baseURL;

    if (!baseURL) {
      throw new ApolloError('Cannot make request to GraphQL API, missing baseURL');
    }

    return baseURL;
  }

  private onRequestLink() {
    return setContext((_, request) => {
      if (this.willSendRequest) {
        this.willSendRequest(request);
      }

      return request;
    });
  }

  private onErrorLink() {
    return onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(graphqlError => console.error(`[GraphQL error]: ${graphqlError.message}`));
      }

      if (networkError) {
        console.log(`[Network Error]: ${networkError}`);
      }
    });
  }

  protected addRequestUsage(query, ttl, error, response = null): void {
    const status = error ? error.statusCode : 200;
    const statusText = error ? error.bodyText : 'OK';

    this.context.requestUsage = [
      ...this.context.requestUsage,
      {
        request: {
          url: this.baseURL,
          method: 'POST',
          query,
        },
        response: {
          status,
          statusText,
          ...(this.context.requestUsageResponseEnable && { data: JSON.parse(JSON.stringify(response)) }),
        },
        ttl,
      },
    ];
  }
}
