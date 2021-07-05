import { MagentoDeliveryOptionDataSource } from './MagentoDeliveryOptionDataSource';
import cache from '../../../configs/cache';

class MagentoDeliveryOptionDataSourceTest extends MagentoDeliveryOptionDataSource {
  get() {
    return jest.fn() as any;
  }
}

describe('MagentoDeliveryMethodDataSourceTest', () => {
  const MagentoDeliveryOption = new MagentoDeliveryOptionDataSourceTest();
  const storeCode = 'cds_th';
  it(`should call getDeliveryOptions with expect params`, async () => {
    const sku = '11111';
    const postcode = '10222';
    const path = `/${storeCode}/V1/delivery-info/products/${sku}` + `/postcode/${postcode}`;

    jest.spyOn(MagentoDeliveryOption, 'get').mockReturnValue(Promise.resolve({}) as any);
    await MagentoDeliveryOption.getDeliveryOptions({ storeCode, sku, postcode });
    expect(MagentoDeliveryOption.get).toBeCalledWith(path, null, {
      cacheOptions: { ttl: cache.DeliveryMethodAPI.list },
    });
  });
});
