import { BaseRESTDataSource } from '../BaseRESTDataSource';
import configs from '../../configs/vars';
import cache from '../../configs/cache';
import { InstagramSchema } from './InstagramDataSourceParams';
import { ApplicationError } from '../../error/ApplicationError';
import { getAccessToken } from '../../utils/awsParamStore.util';
export class InstagramDataSource extends BaseRESTDataSource {
  constructor() {
    super();
    this.baseURL = configs.instagram.base_url;
  }

  async getPosts(): Promise<InstagramSchema> {
    const token = await getAccessToken();
    if (token === '' || !token) {
      throw new ApplicationError(`Token is mandatory field`);
    }
    const path = `/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${token}`;
    return this.get(
      path,
      {},
      {
        cacheOptions: { ttl: cache.Instagram.getPosts },
      },
    );
  }
}
