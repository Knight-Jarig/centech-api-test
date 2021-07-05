import { RedisClusterCache as ApolloRedisCache } from 'apollo-server-cache-redis';
import { ClusterOptions, ClusterNode } from 'ioredis';
import { KeyValueCacheSetOptions } from 'apollo-server-caching';
import config from '../../configs/vars';
import * as Sentry from '@sentry/node';

class RedisClusterCache extends ApolloRedisCache {
  private isRedisConnected: boolean;
  private lastErrorTimeStampInMillisec: number;

  constructor(nodes: ClusterNode[], options?: ClusterOptions) {
    super(nodes, options);
    this.client.on('connect', () => {
      this.onRedisConnectedEventHandler();
    });
    this.client.on('error', (err: any) => {
      this.onRedisConnectErrorEventHandler(err);
    });
  }

  async set(key: string, value: string, options?: KeyValueCacheSetOptions): Promise<void> {
    if (!this.isRedisConnected) return;

    const setResult = await super.set(key, value, options);
    // await tagCache(this.client, key, value); // Disable Tag Cache for reduce Mem used

    return setResult;
  }

  async get(key: string): Promise<string | undefined> {
    if (!this.isRedisConnected) return;
    return super.get(key);
  }

  async delete(key: string): Promise<boolean> {
    if (!this.isRedisConnected) return;
    return super.delete(key);
  }

  async smembers(key: string): Promise<[string] | undefined> {
    if (!this.isRedisConnected) return;
    return this.client.smembers(key);
  }

  private onRedisConnectedEventHandler() {
    console.log('Redis connection is connected');
    this.isRedisConnected = true;
  }

  private onRedisConnectErrorEventHandler(err: any) {
    console.error(`Redis connection error occur. Error: ${err}`);

    this.isRedisConnected = false;
    if (config.sentry.dsn) {
      const fiveMiniutesInMilliseconds = 300000;
      const currentTimeStampInMillisec: number = Date.now();

      if (
        this.lastErrorTimeStampInMillisec === undefined ||
        currentTimeStampInMillisec - this.lastErrorTimeStampInMillisec > fiveMiniutesInMilliseconds
      ) {
        Sentry.captureException(err.originalError || err);
        console.log('Redis Connection Error event is captured to Sentry');
        this.lastErrorTimeStampInMillisec = currentTimeStampInMillisec;
      }
    }
  }
  getClient(){
    return this.client;
  }
}

export { RedisClusterCache };
