import { searchCriteriaBuilder } from '../../../utils/magento.utils';
import { customAttributes } from '../../../utils/transformer';
import cache from '../../../configs/cache';
import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import { IFiltersQuery } from '../../../types/graphql';

export class MagentoCatalogServiceDataSource extends BaseRESTDataSource {
  find(searchCriteria: IFiltersQuery, storeCode: string) {
    const searchQueryString = searchCriteriaBuilder(searchCriteria);
    return this.get(`/catalog-service/${storeCode}/V1/products/search?${searchQueryString}`, null, {
      cacheOptions: { ttl: cache.CatalogService.find },
    });
  }

  getSearchSuggestion({ storeCode, keyword }) {
    const encodeKeywork = encodeURIComponent(keyword);
    return this.get(
      `/catalog-service/${storeCode}/V1/products/suggest?q=${encodeKeywork}&with_custom_attributes=true`,
      null,
      {
        cacheOptions: { ttl: cache.CatalogService.getSearchSuggestion },
      },
    ).then(data => ({
      products:
        data?.products?.map(item => ({ ...item, custom_attributes: customAttributes(item.custom_attributes) })) || [],
      categories: data?.categories || [],
      terms: data?.terms || [],
    }));
  }

  getSearchTrending(storeCode) {
    return this.get(`/catalog-service/${storeCode}/V1/products/top-search`, null, {
      cacheOptions: { ttl: cache.CatalogService.getSearchTrending },
    });
  }
}
