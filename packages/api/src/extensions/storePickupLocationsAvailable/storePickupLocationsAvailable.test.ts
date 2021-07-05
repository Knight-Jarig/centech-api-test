import { resolver } from './index';
import { MagentoDataSource } from '../../dataSource/magento/MagentoDataSource';
import GoogleApi from '../../dataSource/googleApi';
import { ShippingUseCase } from '../../extensions/schemaV2/shipping/ShippingUseCase';
import StoreModel from '../../transform/store.model';

jest.mock('../../dataSource/magento/MagentoDataSource');

describe('Store pick up location', () => {
  const storePickupLocationsAvailable = resolver.Query.storePickupLocationsAvailable as Function;
  const magento = new MagentoDataSource();
  const google = new GoogleApi();
  const shippingUseCase = new ShippingUseCase({ magento, google });

  const dataSources = {
    magento,
    shippingUseCase,
  };

  const mockSKU = { sku: '123' };
  const storeCode = 'cds_th';

  it('StorePickUpLocation query return []', async () => {
    jest
      .spyOn(dataSources.magento.storePickUp, 'getStorePickupLocationsAvailable')
      .mockReturnValue(Promise.resolve(null));

    const response = await storePickupLocationsAvailable(null, mockSKU, { dataSources, storeCode });
    expect(response).toEqual([]);
  });

  it('StorePickUpLocation query return []', async () => {
    jest
      .spyOn(dataSources.magento.storePickUp, 'getStorePickupLocationsAvailable')
      .mockReturnValue(Promise.resolve([]));

    const response = await storePickupLocationsAvailable(null, mockSKU, { dataSources, storeCode });
    expect(response).toEqual([]);
  });

  it('StorePickUpLocation query return []', async () => {
    jest
      .spyOn(dataSources.magento.storePickUp, 'getStorePickupLocationsAvailable')
      .mockReturnValue(Promise.resolve([{}] as any));

    jest.spyOn(dataSources.shippingUseCase, 'getDistanceNearestPickupLocations').mockReturnValue(Promise.resolve([]));

    const response = await storePickupLocationsAvailable(
      null,
      { sku: '123', filter: { keyword: 'test' } },
      { dataSources, storeCode },
    );
    expect(response).toEqual([]);
  });

  it('StorePickUpLocation query return []', async () => {
    jest
      .spyOn(dataSources.magento.storePickUp, 'getStorePickupLocationsAvailable')
      .mockReturnValue(Promise.resolve([{}] as any));

    jest.spyOn(dataSources.shippingUseCase, 'getDistanceNearestPickupLocations').mockReturnValue(Promise.resolve([]));

    const response = await storePickupLocationsAvailable(
      null,
      { sku: '123', filter: { keyword: 'test', location: { lat: 'lat', lng: 'lng' } } },
      { dataSources, storeCode },
    );
    expect(response).toEqual([]);
  });

  it('StorePickUpLocation query return []', async () => {
    jest
      .spyOn(dataSources.magento.storePickUp, 'getStorePickupLocationsAvailable')
      .mockReturnValue(Promise.resolve([{}] as any));

    jest.spyOn(dataSources.shippingUseCase, 'getDistanceNearestPickupLocations').mockReturnValue(Promise.resolve([]));

    const response = await storePickupLocationsAvailable(
      null,
      { sku: '123', filter: { keyword: null, location: { lat: 'null', lng: 'null' } } },
      { dataSources, storeCode },
    );
    expect(response).toEqual(response.map(res => StoreModel.transformPickUpLocation(res)));
  });

  it('StorePickUpLocation query return []', async () => {
    jest
      .spyOn(dataSources.magento.storePickUp, 'getStorePickupLocationsAvailable')
      .mockReturnValue(Promise.resolve([{}] as any));

    jest.spyOn(dataSources.shippingUseCase, 'getDistanceNearestPickupLocations').mockReturnValue(Promise.resolve([]));

    const response = await storePickupLocationsAvailable(
      null,
      { sku: '123', filter: { keyword: null, location: null } },
      { dataSources, storeCode },
    );
    expect(response).toEqual(response.map(res => StoreModel.transformPickUpLocation(res)));
  });

  it('StorePickUpLocation query return []', async () => {
    const limit = 2;

    const expectedResponse = [{ id: 1 }, { id: 2 }];

    jest
      .spyOn(dataSources.magento.storePickUp, 'getStorePickupLocationsAvailable')
      .mockReturnValue(Promise.resolve([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] as any));

    const response = await storePickupLocationsAvailable(
      null,
      { sku: '123', filter: null, limit, offset: 0 },
      { dataSources, storeCode },
    );
    expect(response.length).toBe(limit);
    expect(response).toEqual(expectedResponse.map(res => StoreModel.transformPickUpLocation(res)));
  });

  it('StorePickUpLocation query return []', async () => {
    const limit = 4;

    const expectedResponse = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

    jest
      .spyOn(dataSources.magento.storePickUp, 'getStorePickupLocationsAvailable')
      .mockReturnValue(Promise.resolve(expectedResponse as any));

    const response = await storePickupLocationsAvailable(
      null,
      { sku: '123', filter: null },
      { dataSources, storeCode },
    );
    expect(response.length).toBe(limit);
    expect(response).toEqual(expectedResponse.map(res => StoreModel.transformPickUpLocation(res)));
  });

  it('StorePickUpLocation query return []', async () => {
    const limit = 4;

    const expectedResponse = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

    jest
      .spyOn(dataSources.magento.storePickUp, 'getStorePickupLocationsAvailable')
      .mockReturnValue(Promise.resolve(expectedResponse as any));

    const response = await storePickupLocationsAvailable(
      null,
      { sku: '123', filter: null, limit, offset: undefined },
      { dataSources, storeCode },
    );
    expect(response.length).toBe(limit);
    expect(response).toEqual(expectedResponse.map(res => StoreModel.transformPickUpLocation(res)));
  });
});
