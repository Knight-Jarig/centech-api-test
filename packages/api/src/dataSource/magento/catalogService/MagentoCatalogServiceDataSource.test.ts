import { MagentoCatalogServiceDataSource } from './MagentoCatalogServiceDataSource';
import { searchCriteriaBuilder } from '../../../utils/magento.utils';
import cache from '../../../configs/cache';

class MagentoCatalogServiceDataSourceTest extends MagentoCatalogServiceDataSource {
  get() {
    return jest.fn() as any;
  }
  put() {
    return jest.fn() as any;
  }
}

describe('MagentoCatalogServiceDataSource', () => {
  const magentoCatalogService = new MagentoCatalogServiceDataSourceTest();

  const params = {
    filterGroups: [],
    page: 1,
    size: 20,
    sortOrders: [],
  };
  const storeCode = 'cds_th';

  it(`find should run properly`, async () => {
    const searchQueryString = searchCriteriaBuilder(params);
    const path = `/catalog-service/${storeCode}/V1/products/search?${searchQueryString}`;
    const init = { cacheOptions: { ttl: cache.CatalogService.find } };
    jest.spyOn(magentoCatalogService, 'get').mockReturnValue(Promise.resolve({}) as any);
    await magentoCatalogService.find(params, storeCode);
    expect(magentoCatalogService.get).toBeCalledWith(path, null, init);
  });

  it(`getSearchSuggestion should run properly`, async () => {
    const keyword = 'keyword';
    const encodeKeywork = encodeURIComponent(keyword);
    const path = `/catalog-service/${storeCode}/V1/products/suggest?q=${encodeKeywork}&with_custom_attributes=true`;
    const init = { cacheOptions: { ttl: cache.CatalogService.getSearchSuggestion } };
    jest.spyOn(magentoCatalogService, 'get').mockReturnValue(Promise.resolve({}) as any);
    await magentoCatalogService.getSearchSuggestion({ storeCode, keyword });
    expect(magentoCatalogService.get).toBeCalledWith(path, null, init);
  });

  it(`getSearchTrending should run properly`, async () => {
    const path = `/catalog-service/${storeCode}/V1/products/top-search`;
    const init = { cacheOptions: { ttl: cache.CatalogService.getSearchTrending } };
    jest.spyOn(magentoCatalogService, 'get').mockReturnValue(Promise.resolve({}) as any);
    await magentoCatalogService.getSearchTrending(storeCode);
    expect(magentoCatalogService.get).toBeCalledWith(path, null, init);
  });
});
