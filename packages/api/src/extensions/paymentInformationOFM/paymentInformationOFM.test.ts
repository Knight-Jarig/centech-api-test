import { typeDef, resolver } from './index';

const mockDataSources = {
  cart: {
    getPaymentInformationOFM: () => new Promise(resolve => resolve(true)),
  },
  cartGuest: {
    getPaymentInformationOFM: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesOrder = {
  magento: {
    cart: mockDataSources.cart,
    cartGuest: mockDataSources.cartGuest,
  },
};

describe('paymentInformationOFM ', () => {
  const paymentInformations = resolver.Query.paymentInformations as Function;

  const _source = {};
  const params = {
    cartId: '1',
    isGuest: true,
    company_id: '1',
  };
  const dataSources = dataSourcesOrder;
  const storeCode = 'cds_th';

  it('paymentInformationOFM  should run properly with guest status', async () => {
    const { cartId, company_id } = params;
    jest.spyOn(dataSources.magento.cartGuest, 'getPaymentInformationOFM').mockReturnValue(Promise.resolve([]));
    await paymentInformations(_source, params, { dataSources, storeCode });
    expect(dataSources.magento.cartGuest.getPaymentInformationOFM).toBeCalledWith(cartId, storeCode, company_id);
  });

  it('paymentInformationOFM  should run properly with not guest status', async () => {
    params.isGuest = false;
    const { cartId, company_id } = params;
    jest.spyOn(dataSources.magento.cart, 'getPaymentInformationOFM').mockReturnValue(
      Promise.resolve({
        extension_attributes: {
          is_payment_promotion_locked: '1',
        },
      }),
    );
    await paymentInformations(_source, params, { dataSources, storeCode });
    expect(dataSources.magento.cart.getPaymentInformationOFM).toBeCalledWith(storeCode, company_id);
  });
});
