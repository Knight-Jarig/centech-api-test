import OrderResolvers from './orderResolvers';
import { encrypt } from '../../utils/crypto.utils';

const mockDataSources = {
  order: {
    search: () => new Promise(resolve => resolve(true)),
    fetchOrderPackageStatus: () => new Promise(resolve => resolve(true)),
    fetchOrder: () => new Promise(resolve => resolve(true)),
    shipmentTracking: () => new Promise(resolve => resolve(true)),
  },
  customer: {
    getCustomer: () => new Promise(resolve => resolve(true)),
  },
  product: {
    findBySku: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesCategory = {
  magento: {
    order: mockDataSources.order,
    customer: mockDataSources.customer,
    product: mockDataSources.product,
  },
};

describe('OrderResolver', () => {
  const queryOrderByIncrementId = OrderResolvers.Query.orderByIncrementId as Function;
  const queryOrderByEmail = OrderResolvers.Query.orderByEmail as Function;
  const queryOrders = OrderResolvers.Query.orders as Function;
  const queryOrder = OrderResolvers.Query.order as Function;
  const OrderItemProduct = OrderResolvers.OrderItem.product as Function;
  const BillingAddressCustomAttributes = OrderResolvers.BillingAddress.custom_attributes as Function;
  const ShippingAddressCustomAttributes = OrderResolvers.ShippingAddress.custom_attributes as Function;

  const _source = {
    sku: {},
  };
  const dataSources = dataSourcesCategory;
  const storeCode = 'cds_th';
  const orderId = 1;
  const customerToken = 1;
  const filter = {
    filterGroups: [
      { filters: [{ field: 'increment_id', value: '1' }] },
      { filters: [{ field: 'customer_id', value: undefined }] },
    ],
  };

  it('Query orderByIncrementId should run properly', async () => {
    const incrementId = '1';
    const key = encrypt(incrementId);
    const result = { ...filter, page: 1, size: 1 };
    jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve([]));
    jest
      .spyOn(dataSources.magento.order, 'search')
      .mockReturnValue(Promise.resolve({ items: [{ extension_attributes: { order_children_ids: 1 } }] }));
    await queryOrderByIncrementId(_source, { incrementId, key }, { dataSources, storeCode, customerToken });
    expect(dataSources.magento.order.search).toBeCalledWith(result, storeCode);
  });

  it('Query orderByEmail should run properly', async () => {
    const incrementId = '1';
    const key = encrypt(incrementId);
    const result = { ...filter, page: 1, size: 1 };
    jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve([]));
    jest
      .spyOn(dataSources.magento.order, 'search')
      .mockReturnValue(Promise.resolve({ items: [{ extension_attributes: { order_children_ids: 1 } }] }));
    await queryOrderByEmail(_source, { incrementId, key }, { dataSources, storeCode });
    expect(dataSources.magento.order.search).toBeCalledWith(result, storeCode);
  });

  it('Query orders should run properly', async () => {
    jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve([]));
    jest
      .spyOn(dataSources.magento.order, 'search')
      .mockReturnValue(Promise.resolve({ items: [{ extension_attributes: { order_children_ids: 1 } }] }));
    await queryOrders(_source, { filter }, { dataSources, storeCode, customerToken });
    expect(dataSources.magento.order.search).toBeCalledWith(filter, storeCode);
  });

  it('Query order should run properly', async () => {
    jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: 1 }));
    jest.spyOn(dataSources.magento.order, 'fetchOrder').mockReturnValue(Promise.resolve({ customer_id: 1 }));
    await queryOrder(_source, { orderId }, { dataSources, storeCode, customerToken });
    expect(dataSources.magento.order.fetchOrder).toBeCalledWith(orderId, storeCode);
  });

  it('OrderItem should run properly', async () => {
    jest.spyOn(dataSources.magento.product, 'findBySku').mockReturnValue(Promise.resolve({}));
    await OrderItemProduct(_source, {}, { dataSources, storeCode, customerToken });
    expect(dataSources.magento.product.findBySku).toBeCalledWith({ storeCode, sku: _source.sku });
  });

  it('BillingAddress should run properly', async () => {
    const result = await BillingAddressCustomAttributes(_source, { filter: {} });
    expect(result).toEqual({});
  });

  it('ShippingAddress should run properly', async () => {
    const result = await ShippingAddressCustomAttributes(_source, { filter: {} });
    expect(result).toEqual({});
  });
});
