import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import cache from '../../../configs/cache';

export class MagentoFlashDealsDataSource extends BaseRESTDataSource {
  activeCategory() {
    return this.get(`/V1/flash-deals/active-category/`, null, {
      cacheOptions: { ttl: cache.FlashDealAPI.list },
    });
  }
}
