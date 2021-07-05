import { searchCriteriaBuilder } from '../../utils/magento.utils';
import configs from '../../configs/vars';
import cache from '../../configs/cache';
import { IFiltersQuery } from '../../types/graphql';
import { BaseRESTDataSource } from '../BaseRESTDataSource';

class DataLakeApi extends BaseRESTDataSource {
  baseURL = configs.dataLake.base_url;

  willSendRequest(request) {
    super.setCacheOptions(request);

    request.headers.set('x-api-key', `${configs.dataLake.token}`);
    request.headers.set('Content-Type', 'application/json');
  }

  searchService(criteria: IFiltersQuery, storeCode: string) {
    const searchCriteria = searchCriteriaBuilder(criteria);
    return this.get(`/search-service/${storeCode}/products?${searchCriteria}`, null, {
      cacheOptions: { ttl: cache.DatatLake.search },
    });
  }

  searchSuggestionTerms(keyword: string, lang = 'th'): Promise<string[]> {
    return this.get(
      `/search-suggestion/keywords/${keyword}`,
      { lang },
      { cacheOptions: { ttl: cache.DatatLake.searchSuggestionTerms } },
    );
  }

  searchTrendingTerms(lang = 'th'): Promise<string[]> {
    return this.get('/search-trending', { lang }, { cacheOptions: { ttl: cache.DatatLake.searchTrendingTerms } });
  }
}

export default DataLakeApi;
