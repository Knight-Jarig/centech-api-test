import { typeDef, resolver } from './index';

const mockDataSources = {
  order: {
    shipmentTracking: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesOrder = {
  magento: {
    order: mockDataSources.order,
  },
};

describe('orderShipmentTracking', () => {
  const orderShipment = resolver.Order.shipment as Function;
  const queryTrackOrder = resolver.Query.trackOrder as Function;

  const _source = {
    increment_id: '1',
  };
  const params = null;
  const dataSources = dataSourcesOrder;
  const storeCode = 'cds_th';

  it('typeDef should match value', async () => {
    expect(typeDef).toEqual('');
  });

  it('orderShipment should run properly', async () => {
    jest.spyOn(dataSources.magento.order, 'shipmentTracking').mockReturnValue(Promise.resolve([]));
    await orderShipment(_source, params, { dataSources, storeCode });
    expect(dataSources.magento.order.shipmentTracking).toBeCalledWith(_source.increment_id, storeCode);
  });

  it('orderShipment should run properly', async () => {
    jest.spyOn(dataSources.magento.order, 'shipmentTracking').mockReturnValue(Promise.resolve({ items: 'a' }));
    await orderShipment(_source, params, { dataSources, storeCode });
    expect(dataSources.magento.order.shipmentTracking).toBeCalledWith(_source.increment_id, storeCode);
  });

  it('queryTrackOrder should run properly', async () => {
    jest.spyOn(dataSources.magento.order, 'shipmentTracking').mockReturnValue(Promise.resolve({ items: 'a' }));
    await queryTrackOrder(_source, { increment_id: _source.increment_id }, { dataSources, storeCode });
    expect(dataSources.magento.order.shipmentTracking).toBeCalledWith(_source.increment_id, storeCode);
  });
});
