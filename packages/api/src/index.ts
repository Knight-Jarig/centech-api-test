import config from './configs/vars';
import { ApolloServer, UserInputError } from 'apollo-server-express';
import merge from 'lodash/merge';
import { ulid } from 'ulid';
import { makeExecutableSchema } from 'graphql-tools';
import { RedisCache } from './dataSource/cache/RedisCache';
import { RedisCacheMasterSlave } from './dataSource/cache/RedisCacheMasterSlave';
import { RedisClusterCache } from './dataSource/cache/RedisClusterCache';
import depthLimit from 'graphql-depth-limit';
import { createDataSources } from './dataSource';
import { resolvers, typeDefs } from './schema';
import extensions from './extensions';
import { BaseContext } from './types';
import { MDCStoreConfig } from './extensions/schemaV2/types/mdc-store-config';
import formatErrorUtil from './utils/formatError.util';
import RequestUsagePlugin from './plugins/RequestUsagePlugin';
import NewrelicPlugin from './plugins/NewrelicPlugin';
import RequestIdPlugin from './plugins/RequestIdPlugin';
import SentryPlugin from './plugins/SentryPlugin';
import * as Sentry from '@sentry/node';
import Redlock from 'redlock';
import ApolloResponseCachePlugin from './plugins/ResponseCachePlugin';
const createNewrelicPlugin = require('@newrelic/apollo-server-plugin');

const schemas = makeExecutableSchema({
  typeDefs: [...typeDefs, ...extensions.typeDefs],
  resolvers: merge(resolvers, extensions.resolvers),
  resolverValidationOptions: { requireResolversForResolveType: false },
});

const newrelic = global?.newrelic;
let redisClient: RedisCache | RedisClusterCache | RedisCacheMasterSlave = undefined;
let redlock: Redlock | null;

async function fetchMDCStoreConfigs(): Promise<Record<string, MDCStoreConfig>> {
  console.log('initial storeConfig');
  try {
    const response = await fetch(config.magento.base_url + 'V1/store/storeConfigs', {
      headers: { Authorization: 'Bearer ' + config.magento.token },
    });
    const result: MDCStoreConfig[] = await response.json();
    return result.reduce((all, item) => ({ ...all, [item.code]: item }), {});
  } catch (e) {
    throw new Error('fetch storeConfig fail');
  }
}

function createRedisClient(): RedisCache | RedisClusterCache | RedisCacheMasterSlave {
  if (config.redisUrlReadOnly && config.redisUrlReadWrite) {
    return createRedisMasterSlaveClient();
  }
  if (!config.useRedisCluster) {
    return createRedisSingleClient();
  }
  return createRedisClusterClient();
}

function createRedisMasterSlaveClient() {
  if (redisClient !== undefined) {
    console.log('RedisClient has already been created, reusing the existing one');
    return redisClient;
  }

  console.log('redisMasterSlave is being created');
  redisClient = new RedisCacheMasterSlave({
    masterHost: config.redisUrlReadWrite,
    slaveHost: config.redisUrlReadOnly,
    db: parseInt(process.env.REDIS_DB) || 0,
    showFriendlyErrorStack: true,
    retryStrategy: function (times: any) {
      return Math.min(times * 500, 3000);
    },
  });
  console.log('redisMasterSlave has been created successfully');

  return redisClient;
}

function createRedisSingleClient() {
  if (!config.redisUrl) {
    console.error('Redis URL is not defined. Stop creating RedisClient');
    return null;
  }

  if (redisClient !== undefined) {
    console.log('RedisClient has already been created, reusing the existing one');
    return redisClient;
  }

  console.log('redisClient is being created');
  redisClient = new RedisCache({
    host: process.env.REDIS_URL,
    db: parseInt(process.env.REDIS_DB) || 0,
    showFriendlyErrorStack: true,
    retryStrategy: function (times: any) {
      return Math.min(times * 500, 3000);
    },
  });
  console.log('redisClient has been created successfully');

  return redisClient;
}

function createRedisClusterClient() {
  if (!config.redisClusterUrl) {
    console.error('Redis Cluster URL is not defined. Stop creating RedisClusterClient');
    return null;
  }

  if (redisClient !== undefined) {
    console.log('RedisClusterClient has already been created, reusing the existing one');
    return redisClient;
  }

  console.log('redisClusterClient is being created');
  const nodes = [];
  const redisClusterUrl = config.redisClusterUrl.split(',');
  redisClusterUrl.forEach(item => {
    const redisUrl = item.split(':'),
      port = redisUrl[1] || '',
      node = {
        host: redisUrl[0],
        ...(port
          ? {
              port: +port,
            }
          : {}),
      };
    nodes.push(node);
  });
  redisClient = new RedisClusterCache(nodes, {
    clusterRetryStrategy: function (times: any) {
      return Math.min(times * 500, 3000);
    },
    scaleReads: 'slave',
    dnsLookup: (address, callback) => callback(null, address),
    slotsRefreshTimeout: 3000,
  });
  console.log('redisClusterClient has been created successfully');

  return redisClient;
}

export const createServer = async ({ apolloConfig } = { apolloConfig: {} }) => {
  const storeConfigs = await fetchMDCStoreConfigs();

  redisClient = createRedisClient();
  redlock =
    redisClient && !config.redlock.disable ? new Redlock([redisClient.getClient()], config.redlock.config) : null;

  return new ApolloServer({
    schema: schemas,
    dataSources: createDataSources,
    playground: config.appEnv !== 'production' && {
      endpoint: process.env.BASE_ENDPOINT || '/graphql',
    },
    context: ({ req }): BaseContext => {
      const headers = req.headers;
      let selectedStoreCode = headers?.store as string;
      if (!storeConfigs[selectedStoreCode]) {
        const prefixTHRegex = /^[th]/i;
        const stores = Object.values(storeConfigs);
        const defaultStore = stores.find(storeData => prefixTHRegex.test(storeData.locale)) ?? stores[0];
        selectedStoreCode = defaultStore.code;
        // if (config.sentry.dsn && headers?.client && headers?.client !== 'web') {
        //   Sentry.captureException(new UserInputError('Invalid store on headers'));
        // }
      }

      const store = storeConfigs[selectedStoreCode];
      const requestId = (req.headers['x-request-id'] as string) || ulid();
      const deviceId = req.headers['device-id'] as string;

      const enableRequestUsage = req.headers['x-force-request-usage-enable'] === '1';
      const token = req.headers['x-force-request-usage-token'] === config.requestUsageToken;
      const requestUsage = config.extension.requestUsage;
      const requestUsageEnable = token ? enableRequestUsage : !!+requestUsage;

      return {
        token: config.magento.token,
        bu: config.bu || '',
        customerToken: req.headers.authorization,
        authToken: req.headers.authorization?.split(' ')[1],
        role: !req.headers.authorization ? 'guest' : req.headers.authorization.includes('Bearer') ? 'member' : 'guest',
        client: (req.headers.client as string) || 'web',
        storeCode: selectedStoreCode,
        locale: selectedStoreCode?.split('_').slice(-1)[0],
        productCustomAttributes: (req.headers['x-product-attr'] as string) || '',
        productCustomAttributesOption: (req.headers['x-product-attr-option'] as string) || '',
        referer: req.headers.referer || '',
        headers: req.headers,
        redisClient: redisClient,
        store,
        requestUsage: [],
        requestId,
        deviceId,
        requestUsageResponseEnable: (req.headers['x-force-request-usage-response-enable'] as string) === '1',
        requestUsageEnable,
        redlock,
      };
    },
    formatError: formatErrorUtil,
    plugins: [
      new RequestIdPlugin(),
      config.sentry.dsn ? new SentryPlugin() : {},
      !config.responseCachePluginDisable ? ApolloResponseCachePlugin : {},
      new RequestUsagePlugin(),
      newrelic && config.newrelic.apolloPluginDisable ? new NewrelicPlugin(newrelic) : {},
      newrelic && !config.newrelic.apolloPluginDisable
        ? createNewrelicPlugin({
            captureScalars: true,
          })
        : {},
    ],
    cache: redisClient,
    tracing: false,
    cacheControl: {
      defaultMaxAge: 60,
      stripFormattedExtensions: true,
    },
    engine: false,
    introspection: config.introspection,
    validationRules: [depthLimit(30)],
    ...apolloConfig,
  });
};
