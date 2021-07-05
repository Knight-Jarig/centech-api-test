import firebase from 'firebase';
import 'firebase/firestore';

import { BaseRESTDataSource } from '../BaseRESTDataSource';
import { ApplicationError } from '../../error/ApplicationError';
import { RequestUsageRequest } from '../../types';
import config from '../../configs/vars';

export class Firebase extends BaseRESTDataSource {
  initialize(arg) {
    super.initialize(arg);
    if (config.firebase.apiKey && config.firebase.authDomain && config.firebase.projectId) {
      if (!firebase.apps.length) {
        firebase.initializeApp(config.firebase);
      }
    }
  }

  getFireStore() {
    return firebase.firestore();
  }

  withCachePrefix(key) {
    return `firebase:firestore:${key}`;
  }

  async getData(collection: string, doc: string, ttl = 3600): Promise<any> {
    const cacheKey = this.withCachePrefix(`${collection}:${doc}`);
    const redis = this.context.redisClient;
    const request: RequestUsageRequest = {
      url: 'tops-online-staging.firebaseio.com',
      method: 'GET',
      body: {
        database: 'tops-online-staging.firebaseio.com',
        collection,
        doc,
      },
      headers: null,
    };
    if (redis) {
      const cache = await redis.get(cacheKey);
      const cacheData = JSON.parse(cache);
      if (cache) {
        this.addRequestUsageData(
          request,
          {
            statusText: 'FROM CACHE',
            status: 200,
          },
          ttl,
          cache,
        );
        return cacheData;
      }
    }
    const firestore = this.getFireStore();
    const snapshot = await firestore.collection(collection).doc(doc).get();
    if (!snapshot.exists) {
      throw new ApplicationError(`firestore collection:${collection} doc:${doc} not exists`);
    }
    const data = snapshot.data();

    if (redis && ttl > 0) {
      await redis.set(cacheKey, JSON.stringify(data), { ttl });
    }

    this.addRequestUsageData(
      request,
      {
        statusText: null,
        status: 200,
      },
      ttl,
      data,
    );

    return data;
  }

  addRequestUsageData(request, response, ttl, responseData): void {
    this.context.requestUsage = [
      ...this.context.requestUsage,
      {
        request,
        response: {
          status: response.status,
          statusText: response.statusText,
          ...(this.context.requestUsageResponseEnable && { data: JSON.parse(JSON.stringify(responseData)) }),
        },
        ttl,
      },
    ];
  }
}
