import cache from '../../../configs/cache';
import {
  MagentoCategoryAllResponse,
  MagentoCategoryFindOneResponse,
  MagentoCategoryFindResponse,
} from './MagentoCategoryResponse';
import { MagentoCategoryFindOneParams } from './MagentoCategoryParams';
import { BaseRESTDataSource } from '../../BaseRESTDataSource';

export class MagentoCategoryDataSource extends BaseRESTDataSource {
  all(storeCode: string): Promise<MagentoCategoryAllResponse> {
    const path = `${storeCode}/V1/categories`;
    const params = null;
    const init = {
      cacheOptions: { ttl: cache.CategoryAPI.all },
    };

    return this.get<MagentoCategoryAllResponse>(path, params, init);
  }

  find(storeCode: string): Promise<MagentoCategoryFindResponse> {
    const path = `${storeCode}/V1/category/flat`;
    const params = null;
    const init = {
      cacheOptions: { ttl: cache.CategoryAPI.find },
    };

    return this.get<MagentoCategoryFindResponse>(path, params, init);
  }

  findOne({ id, storeCode }: MagentoCategoryFindOneParams): Promise<MagentoCategoryFindOneResponse> {
    const path = `${storeCode}/V1/categories/${id}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: cache.CategoryAPI.findOne },
    };

    return this.get(path, params, init);
  }
}
