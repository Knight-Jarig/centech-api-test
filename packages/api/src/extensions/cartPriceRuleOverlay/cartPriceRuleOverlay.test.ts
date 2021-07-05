import { typeDef, resolver } from './index';

const mockDataSources = {
  product: {
    getSaleRuleOverlays: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesOrder = {
  magento: {
    product: mockDataSources.product,
  },
};

describe('cartPriceRuleOverlay', () => {
  const cartPriceRuleOverlay = resolver.Product.cart_price_rule_overlays as Function;

  const _source = { id: {} };
  const params = null;
  const dataSources = dataSourcesOrder;

  it('typeDef should match value', async () => {
    expect(typeDef).toEqual('');
  });

  it('cartPriceRuleOverlay should run properly', async () => {
    jest.spyOn(dataSources.magento.product, 'getSaleRuleOverlays').mockReturnValue(Promise.resolve([]));
    await cartPriceRuleOverlay(_source, params, { dataSources });
    expect(dataSources.magento.product.getSaleRuleOverlays).toBeCalledWith(_source.id);
  });
});
