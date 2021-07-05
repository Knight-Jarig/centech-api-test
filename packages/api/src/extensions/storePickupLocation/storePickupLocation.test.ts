import { resolver } from './index';
import { MagentoDataSource } from '../../dataSource/magento/MagentoDataSource';
import StoreModel from '../../transform/store.model';

import { mockGetPickupLocationBySKU } from './__mocks__/storePickUpLocation';

jest.mock('../../dataSource/magento/MagentoDataSource');

describe('Store pick up location', () => {
  const pickupLocations = resolver.Query.pickupLocations as Function;
  const magento = new MagentoDataSource();

  const dataSources = {
    magento,
  };

  const mockSKU = { sku: '123' };
  const storeCode = 'cds_th';

  it('StorePickUpLocation query return []', async () => {
    jest.spyOn(dataSources.magento.storePickUp, 'getPickupLocationsBySKU').mockReturnValue(Promise.resolve(null));

    const response = await pickupLocations(null, mockSKU, { dataSources, storeCode });
    expect(response).toEqual([]);
  });

  it('StorePickUpLocation query return mockGetPickupLocationBySKU with transfrom', async () => {
    jest
      .spyOn(dataSources.magento.storePickUp, 'getPickupLocationsBySKU')
      .mockReturnValue(Promise.resolve(mockGetPickupLocationBySKU as any));

    const response = await pickupLocations(null, mockSKU, { dataSources, storeCode });
    expect(response).toEqual(mockGetPickupLocationBySKU.map(store => StoreModel.transformPickUpLocation(store)));
  });
});
