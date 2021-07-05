import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import { MDCCmsPage } from './MagentoCmsResponse';
import cache from '../../../configs/cache';

export class MagentoCmsDataSource extends BaseRESTDataSource {
  getCmsPage(id: number, storeCode: string): Promise<MDCCmsPage> {
    return this.get(`${storeCode}/V1/cmsPage/${id}`, null, {
      cacheOptions: { ttl: cache.CMSAPI.getCmsPage },
    });
  }
}
