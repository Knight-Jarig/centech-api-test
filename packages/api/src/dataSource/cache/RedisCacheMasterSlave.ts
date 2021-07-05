import { RedisCache as ApolloRedisCache } from 'apollo-server-cache-redis';
import Redis, { RedisOptions } from 'ioredis';
import { KeyValueCacheSetOptions } from 'apollo-server-caching';
import config from '../../configs/vars';
import * as Sentry from '@sentry/node';

interface RedisOptionsWithOutHost extends RedisOptions {
  host?: string;
  masterHost: string;
  slaveHost: string;
}

class RedisCacheMasterSlave extends ApolloRedisCache {
  private isRedisConnected: boolean;
  private lastErrorTimeStampInMillisec: number;
  private writeClient: any;
  private writeClientIsRedisConnected: boolean;
  // private loader: DataLoader<string, string | null>;

  constructor(options?: RedisOptionsWithOutHost) {
    const { masterHost, slaveHost, ...redisOption } = options;
    const slaveHostSplit = slaveHost.split(':');
    super({
      ...redisOption,
      host: slaveHostSplit[0],
      port: slaveHostSplit[1] ? +slaveHostSplit[1] : 6379,
    });

    this.client.on('connect', () => {
      console.log('Redis read client connection is connected', slaveHostSplit[0]);
      this.onRedisConnectedEventHandler();
    });
    this.client.on('error', (err: any) => {
      this.onRedisConnectErrorEventHandler(err);
    });

    const masterHostSplit = masterHost.split(':');
    this.writeClient = new Redis({
      ...options,
      host: masterHostSplit[0],
      port: masterHostSplit[1] ? +masterHostSplit[1] : 6379,
    });

    this.writeClient.on('connect', () => {
      console.log('Redis write client connection is connected', masterHostSplit[0]);
      this.writeClientIsRedisConnected = true;
    });
    this.writeClient.on('error', error => {
      console.log(`Redis write client is error: ${error}`);
      this.writeClientIsRedisConnected = false;
    });
  }

  async setWriteClient(key: string, value: string, options?: KeyValueCacheSetOptions): Promise<void> {
    const { ttl } = Object.assign({}, this.defaultSetOptions, options);
    if (typeof ttl === 'number') {
      await this.writeClient.set(key, value, 'EX', ttl);
    } else {
      // We'll leave out the EXpiration when no value is specified.  Of course,
      // it may be purged from the cache for other reasons as deemed necessary.
      await this.writeClient.set(key, value);
    }
  }

  async set(key: string, value: string, options?: KeyValueCacheSetOptions): Promise<void> {
    if (!this.writeClient || !this.writeClientIsRedisConnected) return;

    return await this.setWriteClient(key, value, options);
  }

  async get(key: string): Promise<string | undefined> {
    if (!this.isRedisConnected) return;
    return super.get(key);
  }

  async delete(key: string): Promise<boolean> {
    if (!this.isRedisConnected) return;
    return this.writeClient.del(key);
  }

  async smembers(key: string): Promise<[string] | undefined> {
    if (!this.isRedisConnected) return;
    return this.client.smembers(key);
  }

  private onRedisConnectedEventHandler() {
    this.isRedisConnected = true;
  }

  private onRedisConnectErrorEventHandler(err: any) {
    console.error(`Redis read client connection error occur. Error: ${err}`);

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

  getClient() {
    return this.writeClient;
  }
}

export { RedisCacheMasterSlave };
