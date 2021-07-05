import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import { searchCriteriaBuilder } from '../../../utils/magento.utils';
import { IFiltersQuery } from '../../../types/graphql';
import cache from '../../../configs/cache';

export class MagnetoStoreLocatorDataSource extends BaseRESTDataSource {
  getStores() {
    return this.get(
      '/V1/storelocator?criteria[filter_groups][0][filters][0][field]=is_active&criteria[filter_groups][0][filters][0][value]=1&criteria[filter_groups][0][filters][0][condition_type]=eq',
      null,
      {
        cacheOptions: { ttl: cache.StoreLocatorAPI.list },
      },
    );
  }

  searchStore(criteria: IFiltersQuery) {
    const searchCriteria = searchCriteriaBuilder(criteria).split('searchCriteria').join('criteria');
    return this.get(`/V1/storelocator?${searchCriteria}`, null, {
      cacheOptions: { ttl: cache.StoreLocatorAPI.list },
    });
  }

  getStoreById(retailerId) {
    return this.get(`/V1/retailer/get/${retailerId}`, null, {
      cacheOptions: { ttl: cache.StoreLocatorAPI.getById },
    });
  }
}
