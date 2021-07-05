import { searchCriteriaBuilder } from '../../../utils/magento.utils';
import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import { IFiltersQuery } from '../../../types/graphql';
import cache from '../../../configs/cache';

export class MagentoBannerDataSource extends BaseRESTDataSource {
  async find(criteria: IFiltersQuery) {
    const searchCriteria = searchCriteriaBuilder(criteria);
    const path = `/V1/banners?${searchCriteria}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: cache.BannerAPI.find },
    };
    const { items = [] } = await this.get(path, params, init);
    return items;
  }
}
