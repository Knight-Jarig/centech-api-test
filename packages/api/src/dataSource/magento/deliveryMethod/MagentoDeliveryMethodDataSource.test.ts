import { MagentoDeliveryMethodDataSource } from './MagentoDeliveryMethodDataSource';
import cache from '../../../configs/cache';

class MagentoDeliveryMethodDataSourceTest extends MagentoDeliveryMethodDataSource {
  get() {
    return jest.fn() as any;
  }
}

describe('MagentoDeliveryMethodDataSourceTest', () => {
  const MagentoDeliveryMethod = new MagentoDeliveryMethodDataSourceTest();
  const storeCode = 'cds_th';
  it(`should call getDeliveryMethods with expect params`, async () => {
    const sku = '11111';
    const postcode = '10222';
    const path = `/${storeCode}/V1/delivery-method/${sku}/postcode/${postcode}`;

    jest.spyOn(MagentoDeliveryMethod, 'get').mockReturnValue(Promise.resolve({}) as any);
    await MagentoDeliveryMethod.getDeliveryMethods({ storeCode, sku, postcode });
    expect(MagentoDeliveryMethod.get).toBeCalledWith(path, null, {
      cacheOptions: { ttl: cache.DeliveryMethodAPI.list },
    });
  });

  it(`should call getDeliveryMethods with expect params`, async () => {
    const sku = '11111';
    const postcode = '10222';
    const path = `/${storeCode}/V1/delivery-method/${sku}/postcode/${postcode}`;

    jest.spyOn(MagentoDeliveryMethod, 'get').mockReturnValue(Promise.resolve({}) as any);
    await MagentoDeliveryMethod.getDeliveryMethods({ storeCode, sku, postcode });
    expect(MagentoDeliveryMethod.get).toBeCalledWith(path, null, {
      cacheOptions: { ttl: cache.DeliveryMethodAPI.list },
    });
  });
});
