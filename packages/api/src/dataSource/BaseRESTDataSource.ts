import { HTTPCache, Request, RequestOptions, Response, RESTDataSource } from 'apollo-datasource-rest';
import { ApolloError, AuthenticationError, ForbiddenError } from 'apollo-server-errors';
import configs from '../configs/vars';
import cache from '../configs/cache';
import { ApplicationError } from '../error/ApplicationError';
import { BaseContext, RequestUsage } from '../types';
import { RequestTimoutError } from '../error/RequestTimoutError';
import { canUseCache } from '../utils/cache';

export abstract class BaseRESTDataSource extends RESTDataSource {
  baseURL = configs.magento.base_url;
  cacheOptions = {};

  public context: BaseContext;
  public httpCache: any;
  private useCache: boolean;

  initialize(config) {
    super.initialize(config);

    let useRedis = configs.useRedisCluster ? !!configs.redisClusterUrl : !!configs.redisUrl;
    useRedis = useRedis || !!(configs.redisUrlReadOnly && configs.redisUrlReadWrite);
    this.useCache = canUseCache(configs.appEnv, this.context?.headers?.['cache-control'] || '');
    if (!useRedis || !this.useCache) {
      this.httpCache = new HTTPCache();
    }
  }

  protected cacheKeyFor(request: Request): string {
    const url = request.url;
    const isClientSuffix = !!cache.cacheWithClientSuffix.find(item => {
      return url.endsWith(item);
    });
    const cacheSuffix = isClientSuffix && request.headers.get('client') ? `:${request.headers.get('client')}` : '';

    return `${request.url}${cacheSuffix}`;
  }

  willSendRequest(request: RequestOptions): void {
    const { token, client } = this.context;
    const headers = [
      ['Authorization', `Bearer ${token}`],
      ['Client', client],
      ['Content-Type', 'application/json'],
    ];

    const hasRequestTimout = !!request.timeout;

    if (!hasRequestTimout && configs.timoutLimit && configs.timoutLimit > 0) {
      request.timeout = configs.timoutLimit;
    }

    headers.forEach(([key, value]) => {
      if (!request.headers.has(key)) {
        request.headers.set(key, value);
      }
    });
    this.setCacheOptions(request);
  }

  setCacheOptions(request) {
    const date = Date.now();
    const { headers: requestHeader, requestId, deviceId } = this.context;

    if (!this.useCache && request.cacheOptions) {
      request.cacheOptions.ttl = 0;
    }
    this.cacheOptions[date] = request.cacheOptions;

    request.headers.set('X-Request-Start', date);
    request.headers.set('X-Request-Id', requestId);
    request.headers.set('device-id', deviceId);

    if (requestHeader?.['user-agent']) {
      request.headers.set('User-Agent', requestHeader['user-agent']);
    }
  }

  protected async didReceiveResponse<TResult = any>(response: Response, request: Request): Promise<TResult> {
    const timeMs = Date.now() - +request.headers.get('X-Request-Start');
    const fromCacheText = !response.url ? 'FROM CACHE ' : '';
    console.info(`(${timeMs}ms) ${fromCacheText}${response.status} ${request.method} ${request.url}`);

    if (configs.env !== 'production' && configs.debugRequest) {
      this.logRequest(request);
      console.info();
      this.logResponse(response);
    }

    const body = await this.parseBody(response);

    this.addRequestUsage(request, response, body);

    const isError = !response.ok;
    if (isError) {
      throw await this.errorFromResponse(response, body);
    }

    const isBoolean = val => 'boolean' === typeof val;

    if (!isBoolean(body) && !body && response.status === 200) {
      throw new ApplicationError(`200 status with empty body : ${request.url.replace(this.baseURL, '')}`);
    }

    return body as Promise<TResult>;
  }

  protected didEncounterError(error: Error): void {
    if ((error as any)?.type === 'request-timeout') {
      throw new RequestTimoutError('Something went wrong, please try again', 'REQUEST_TIMEOUT');
    }

    if ((error as any).extensions) {
      (error as any).extensions.fingerprint = this.constructor.name;
    }

    throw error;
  }

  protected async errorFromResponse(response: Response, responseBody = null) {
    const message = `${response.status}: ${response.statusText}`;

    let error: ApolloError;
    if (response.status === 401) {
      error = new AuthenticationError(message);
    } else if (response.status === 403) {
      error = new ForbiddenError(message);
    } else {
      error = new ApolloError(message);
    }

    const body = responseBody || (await this.parseBody(response));

    Object.assign(error.extensions, {
      response: {
        url: response.url,
        status: response.status,
        statusText: response.statusText,
        body,
      },
    });

    return error;
  }

  private logRequest(request: Request): void {
    const headers = this.getHeaders(request.headers);

    console.debug(`--> ${request.method} ${request.url.replace(this.baseURL, '/')}`);
    console.debug(`host: ${this.baseURL}`);
    console.debug(`headers: ${JSON.stringify(headers, null, 2)}`);

    if ((request as any).body) {
      console.debug();
      console.debug((request as any).body.toString('utf8'));
    }
  }

  private async logResponse(response: Response): Promise<void> {
    const headers = this.getHeaders(response.headers);
    const body = await this.parseBody(response.clone());

    console.debug(`<-- ${response.status} ${response.statusText}`);
    console.debug(`headers: ${JSON.stringify(headers, null, 2)}`);
    console.debug();
    console.debug(typeof body === 'object' ? JSON.stringify(body) : body, '\n');
  }

  private getHeaders(headers): any {
    return Array.from(headers.entries()).reduce((acc, [key, value]) => {
      return Object.assign(acc, { [key]: value });
    }, {});
  }

  protected addRequestUsage(request: Request, response: Response, responseBody = null): void {
    const { url, method } = request;
    const headers = this.getHeaders(request.headers);
    const { status, statusText } = response;
    let body = {};
    try {
      const rawBody = (request as any)?.body;
      body = JSON.parse(rawBody);
    } catch (e) {}

    const ttl = this.cacheOptions[headers['x-request-start']]?.ttl;

    if (headers?.authorization) {
      if (headers.authorization.indexOf(configs.magento.token) >= 0) {
        headers.authorization = '[Admin Token]';
      } else if (configs.dataLake.token && headers.authorization.indexOf(configs.dataLake.token) >= 0) {
        headers.authorization = '[DataLake Token]';
      } else if (headers.authorization.indexOf('amx ') >= 0) {
        headers.authorization = '[Payment Service AMX Token]';
      } else {
        headers.authorization = '[User Token]';
      }
    }

    if (headers?.['x-api-key']) {
      headers['x-api-key'] = 'API KEY';
    }

    if (headers?.['x-authorization-key']) {
      headers['x-authorization-key'] = '[T1 Token]';
    }

    this.context.requestUsage = [
      ...this.context.requestUsage,
      {
        request: {
          url,
          method,
          headers,
          body,
        },
        response: {
          status,
          statusText: response.url ? statusText : 'CACHE',
          ...(this.context.requestUsageResponseEnable && { data: JSON.parse(JSON.stringify(responseBody)) }),
        },
        ttl,
      } as RequestUsage,
    ];
  }

  protected getRequestHeaders(context: BaseContext, isGuest = false): { [name: string]: string } {
    const headers = {
      client: `${context.client}`,
      'user-agent': context.headers?.['user-agent'] || '',
      'x-request-id': context.requestId,
      'device-id': context.deviceId,
    };
    if (!isGuest) {
      headers['authorization'] = `${context.customerToken}`;
    }
    const whiteListHeader = ['app-version', 'os', 'os-version', 'track-sku', 'x-authorization-key'];

    const headersExtend = Object.keys(context.headers)
      .filter(key => whiteListHeader.includes(key))
      .reduce((obj, key) => {
        obj[key] = context.headers[key];
        return obj;
      }, {});

    return {
      ...headers,
      ...headersExtend,
    };
  }
}
