import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import cache from '../../../configs/cache';

export class MagentoDeliveryOptionDataSource extends BaseRESTDataSource {
  async getDeliveryOptions({ storeCode, sku, postcode }) {
    return this.get(
      `/${storeCode}/V1/delivery-info/products/${sku}` + (postcode ? `/postcode/${postcode}` : ''),
      null,
      {
        cacheOptions: { ttl: cache.DeliveryMethodAPI.list },
      },
    );
  }
}
