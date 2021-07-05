import { typeDef, resolver } from './index';
import paymentResolvers from '../../schema/payment/paymentResolvers';

const mockDataSources = {
  order: {
    search: () => new Promise(resolve => resolve(true)),
  },
  cart: {
    getPaymentInformation: () => new Promise(resolve => resolve(true)),
  },
  cartId: {
    getPaymentInformation: () => new Promise(resolve => resolve(true)),
  },
  cartGuest: {
    getPaymentInformation: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesOrder = {
  magento: {
    order: mockDataSources.order,
    cart: mockDataSources.cart,
    cartId: mockDataSources.cartId,
    cartGuest: mockDataSources.cartGuest,
  },
};

describe('splitOrders', () => {
  const orderChildren = resolver.Order.children as Function;
  const queryPaymentInformations = resolver.Query.paymentInformations as Function;
  const queryPaymentResolverInformations = paymentResolvers.Query.paymentInformations as Function;

  const _source = { extension_attributes: { order_children_ids: [] } };
  const params = { childrenIds: [{ cartId: '1', payment_methods: 'online' }] };
  const dataSources = dataSourcesOrder;
  const storeCode = 'cds_th';

  it('typeDef should match value', async () => {
    expect(typeDef).toEqual('');
  });

  it('orderChildren should run properly', async () => {
    jest.spyOn(dataSources.magento.order, 'search').mockReturnValue(Promise.resolve([]));
    const result = await orderChildren(_source, params, { dataSources, storeCode });
    expect(result).toEqual([]);
  });

  it('orderChildren should run properly', async () => {
    const _source = { extension_attributes: { order_children_ids: ['1'] } };
    const filters = {
      filterGroups: [{ filters: [{ field: 'entity_id', value: '1', conditionType: 'in' }] }],
      page: 1,
      size: 0,
    };
    jest.spyOn(dataSources.magento.order, 'search').mockReturnValue(Promise.resolve([]));
    const result = await orderChildren(_source, params, { dataSources, storeCode });
    expect(dataSources.magento.order.search).toBeCalledWith(filters, storeCode);
  });

  it('queryPaymentInformations should run properly', async () => {
    jest
      .spyOn(dataSources.magento.cart, 'getPaymentInformation')
      .mockReturnValue(Promise.resolve({ payment_methods: [{ code: 'payment_service_installment' }] }));
    jest
      .spyOn(dataSources.magento.cartId, 'getPaymentInformation')
      .mockReturnValue(Promise.resolve({ payment_methods: [{ code: 'payment_service_installment' }] }));
    jest
      .spyOn(dataSources.magento.cartGuest, 'getPaymentInformation')
      .mockReturnValue(Promise.resolve({ payment_methods: [{ code: 'payment_service_installment' }] }));
    const result = await queryPaymentInformations(_source, params, { dataSources, storeCode });
    const expected = {
      extension_attributes: { is_payment_promotion_locked: false },
      payment_methods: [{ code: 'payment_service_fullpayment', title: 'Credit Card (Full Payment)' }],
    };
    expect(result).toEqual(expected);
  });
});
