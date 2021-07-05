import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import { searchCriteriaBuilder } from '../../../utils/magento.utils';
import cache from '../../../configs/cache';

export class MagentoPromotionDataSource extends BaseRESTDataSource {
  suggestion(filter) {
    const searchCriteria = searchCriteriaBuilder(filter);
    return this.get(`/V1/promotion-suggestion/product?${searchCriteria}`, null, {
      cacheOptions: { ttl: cache.PromotionAPI.suggestion },
    });
  }
}
