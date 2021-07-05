import { typeDef, resolver, addSpace, convertStringToTimePeriod, isFutureTime } from './index';

const mockDataSources = {
  catalogService: {
    find: () => new Promise(resolve => resolve(true)),
  },
  flashDeals: {
    activeCategory: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesCatalogServiceFilterByFlashDeal = {
  magento: {
    catalogService: mockDataSources.catalogService,
    flashDeals: mockDataSources.flashDeals,
  },
};

describe('catalogServiceFilterByFlashDeal', () => {
  const isHideDisplayPrice = resolver.Category.is_hide_display_price as Function;
  const productSearch = resolver.Query.productSearch as Function;

  const _source = {};
  const params = {
    filter: {
      filterGroups: [{ filters: [{ field: 'category_id', value: '111' }] }],
      page: 1,
      size: 10,
      sortOrders: 'ASC',
    },
  };
  const dataSources = dataSourcesCatalogServiceFilterByFlashDeal;
  const storeCode = 'cds_th';

  it('isHideDisplayPrice should run properly', async () => {
    const name = '';
    const result = await isHideDisplayPrice({ name });
    expect(result).toEqual(false);
  });

  it('isHideDisplayPrice should run properly with name', async () => {
    const name = '08:30am - 09:30pm';
    const result = await isHideDisplayPrice({ name });
    expect(result).toEqual(false);
  });

  it('productSearch should run properly', async () => {
    jest.spyOn(dataSources.magento.catalogService, 'find').mockReturnValue(Promise.resolve({ products: [] }));
    jest
      .spyOn(dataSources.magento.flashDeals, 'activeCategory')
      .mockReturnValue(Promise.resolve({ active_flash_deal_category_id: '111' }));
    const result = await productSearch(_source, params, { dataSources, storeCode });
    expect(dataSources.magento.catalogService.find).toBeCalledWith(
      {
        ...params.filter,
        filterGroups: [...params.filter.filterGroups, { filters: [{ field: 'flash_deal_enable', value: '1' }] }],
      },
      storeCode,
    );
    expect(result).toEqual({ products: [] });
  });

  it('addSpace should run properly', async () => {
    const string = 'ab cd';
    const result = await addSpace(string);
    expect(result).toEqual('ab cd ');
  });
});
