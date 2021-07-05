import { typeDef, resolver } from './index';

const mockDataSources = {
  catalogService: {
    findBySkuNew: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesOrder = {
  catalogService: mockDataSources.catalogService,
};

describe('cartWithParent', () => {
  const cartWithParentParent = resolver.CartItem.parent as Function;
  const cartWithParentProduct = resolver.CartItem.product as Function;

  const _source = {
    extension_attributes: {
      parent_sku: 'cds',
    },
    sku: 'cds',
  };
  const params = null;
  const dataSources = dataSourcesOrder;

  it('cartWithParent should run properly', async () => {
    jest.spyOn(dataSources.catalogService, 'findBySkuNew').mockReturnValue(Promise.resolve('1'));
    await cartWithParentParent(_source, params, { dataSources });
    expect(dataSources.catalogService.findBySkuNew).toBeCalledWith(_source.extension_attributes.parent_sku);
  });

  it('cartWithParent should run properly', async () => {
    jest.spyOn(dataSources.catalogService, 'findBySkuNew').mockReturnValue(Promise.resolve('1'));
    await cartWithParentProduct(_source, params, { dataSources });
    expect(dataSources.catalogService.findBySkuNew).toBeCalledWith(_source.extension_attributes.parent_sku);
  });
});
