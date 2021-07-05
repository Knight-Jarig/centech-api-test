import { typeDef, resolver } from './index';

const mockDataSources = {
  order: {
    fetchOrderPackageStatus: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesOrder = {
  magento: {
    order: mockDataSources.order,
  },
};

describe('orderPackageStatus', () => {
  const orderResolver = resolver.Order.extension_attributes as Function;

  const _source = {
    increment_id: {},
    extension_attributes: {},
  };
  const params = null;
  const dataSources = dataSourcesOrder;
  const storeCode = 'cds_th';

  it('typeDef should match value', async () => {
    expect(typeDef).toEqual('');
  });

  it('orderResolver should run properly', async () => {
    jest
      .spyOn(dataSources.magento.order, 'fetchOrderPackageStatus')
      .mockReturnValue(
        Promise.resolve([{ shipment_provider: 1, status: 'online', track_url: '', track_number: 1, sold_by: 'name' }]),
      );
    await orderResolver(_source, params, { dataSources, storeCode });
    expect(dataSources.magento.order.fetchOrderPackageStatus).toBeCalledWith(_source.increment_id, storeCode);
  });
});
