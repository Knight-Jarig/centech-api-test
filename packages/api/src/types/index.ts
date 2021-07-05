/* eslint-disable @typescript-eslint/ban-types */
import { CoreAPIDataSources } from '../dataSource';
import { RedisCache } from '../dataSource/cache/RedisCache';
import { RedisClusterCache } from '../dataSource/cache/RedisClusterCache';
import { MDCStoreConfig } from '../extensions/schemaV2/types/mdc-store-config';
import { RedisCacheMasterSlave } from '../dataSource/cache/RedisCacheMasterSlave';
import Redlock from 'redlock';

export interface RequestUsageRequest {
  url: string;
  method: string;
  headers?: object;
  query?: string;
  body?: object;
}

export interface RequestUsageResponse {
  status: number;
  statusText: string;
  data?: object;
}

export interface RequestUsage {
  request: RequestUsageRequest;
  response: RequestUsageResponse;
  ttl: number;
}

export interface BaseContext {
  storeCode: string;
  token: string;
  customerToken: string;
  client: string;
  authToken?: string;
  role: 'guest' | 'member';
  bu: string;
  productCustomAttributes: string;
  productCustomAttributesOption: string;
  referer: string;
  redisClient: RedisCache | RedisClusterCache | RedisCacheMasterSlave | null;
  locale: string;
  store: MDCStoreConfig;
  headers: object;
  requestUsage: RequestUsage[];
  requestId: string;
  requestUsageResponseEnable: boolean;
  requestUsageEnable: boolean;
  deviceId: string;
  redlock: Redlock | null;
}

export interface ResolverContext extends BaseContext {
  dataSources: CoreAPIDataSources;
}

export interface UpdateStoreInterface {
  updateData: {
    cart_id: string;
    quote_item_group: string;
    extension_attributes: {
      allocated_store_id: number;
    };
  };
}
