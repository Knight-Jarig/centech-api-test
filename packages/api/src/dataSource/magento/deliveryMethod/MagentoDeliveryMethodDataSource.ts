import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import cache from '../../../configs/cache';

interface getDeliveryMethods {
  storeCode: string;
  sku: string;
  postcode: string;
}

interface DeliveryMethodsResponseV1 {
  delivery_method: string;
  delivery_method_label: string;
  delivery_method_lead_times_label: string;
  delivery_method_free_label: string;
  sort_order: number;
}

interface DeliveryMethodsResponseV2 {
  delivery_title: string;
  delivery_methods: DeliveryMethodsResponseV1[];
}

export class MagentoDeliveryMethodDataSource extends BaseRESTDataSource {
  async getDeliveryMethods({ storeCode, sku, postcode }: getDeliveryMethods): Promise<DeliveryMethodsResponseV2[]> {
    const response = await this.get(`/${storeCode}/V1/delivery-method/${sku}/postcode/${postcode}`, null, {
      cacheOptions: { ttl: cache.DeliveryMethodAPI.list },
    });

    return response.delivery_methods;
  }

  async getDeliveryMethodsV2({ storeCode, sku, postcode }: getDeliveryMethods): Promise<DeliveryMethodsResponseV2[]> {
    return await this.get(`/${storeCode}/V2/delivery-method/${sku}/postcode/${postcode}`, null, {
      cacheOptions: { ttl: cache.DeliveryMethodAPI.list },
    });
  }
}
