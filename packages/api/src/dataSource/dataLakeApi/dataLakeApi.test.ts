import DataLakeApi from './index';
import { searchCriteriaBuilder } from '../../utils/magento.utils';
import cache from '../../configs/cache';

class DataLakeApiTest extends DataLakeApi {
  get() {
    return jest.fn() as any;
  }
}

describe('DataLakeApi', () => {
  const DataLakeApi = new DataLakeApiTest();

  const storeCode = 'cds_th';
  const params = null;
  const init = {};

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`searchService should run properly`, async () => {
    const criteria = {
      filterGroups: [{ filters: [{ field: 'customer_id', value: '1' }] }],
    };
    const searchCriteria = searchCriteriaBuilder(criteria);
    const path = `/search-service/${storeCode}/products?${searchCriteria}`;
    const init = {
      cacheOptions: { ttl: cache.DatatLake.search },
    };
    jest.spyOn(DataLakeApi, 'get').mockReturnValue(Promise.resolve({}) as any);
    await DataLakeApi.searchService(criteria, storeCode);
    expect(DataLakeApi.get).toBeCalledWith(path, params, init);
  });

  it(`searchSuggestionTerms should run properly`, async () => {
    const keyword = 'keyword';
    const lang = 'en';
    const path = `/search-suggestion/keywords/${keyword}`;
    const params = { lang };
    const init = {
      cacheOptions: { ttl: cache.DatatLake.searchSuggestionTerms },
    };
    jest.spyOn(DataLakeApi, 'get').mockReturnValue(Promise.resolve({}) as any);
    await DataLakeApi.searchSuggestionTerms(keyword, lang);
    expect(DataLakeApi.get).toBeCalledWith(path, params, init);
  });

  it(`searchTrendingTerms should run properly`, async () => {
    const lang = 'en';
    const path = `/search-trending`;
    const params = { lang };
    const init = {
      cacheOptions: { ttl: cache.DatatLake.searchTrendingTerms },
    };
    jest.spyOn(DataLakeApi, 'get').mockReturnValue(Promise.resolve({}) as any);
    await DataLakeApi.searchTrendingTerms(lang);
    expect(DataLakeApi.get).toBeCalledWith(path, params, init);
  });

  it(`willSendRequest should run properly`, async () => {
    DataLakeApi.initialize({
      context: {},
    });
    const request = {
      headers: {
        set: jest.fn((name, value) => (request.headers[name] = value)),
      },
    };
    await DataLakeApi.willSendRequest(request);
    expect(request.headers.set).toBeCalled();
  });
});
