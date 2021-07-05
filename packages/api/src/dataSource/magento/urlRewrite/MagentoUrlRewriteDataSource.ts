import cache from '../../../configs/cache';
import { BaseRESTDataSource } from '../../BaseRESTDataSource';

export class MagentoUrlRewriteDataSource extends BaseRESTDataSource {
  find({ url, storeCode }) {
    const encodeUrl = encodeURIComponent(url);

    const path = `/${storeCode}/V1/url-rewrite/${encodeUrl}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: cache.UrlRewriteApi.find },
    };

    return this.get(path, params, init);
  }

  redirect({ url, storeCode }) {
    const encodeUrl = encodeURIComponent(url);

    const path = `/${storeCode}/V1/mapping-url?requestPath=${encodeUrl}`;

    return this.post(path);
  }
}
