import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import {
  MDCClickNCollectPickUpStores,
  MDCPickupLocation,
  MDCShipFromStoreAvailableTime,
  MDCStorePickupLocationsAvailable,
} from './MagentoStorePickupType';
import cache from '../../../configs/cache';

export class MagentoStorePickUpDataSource extends BaseRESTDataSource {
  get2hrsPickUpStores(sku: string, storeCode: string) {
    const path = `${storeCode}/V1/storepickup/stores/ispu/${sku}`;

    return this.get(path, null, { cacheOptions: { ttl: cache.StorePickAPI.list } });
  }

  getAllActive2hrsPickUpStores(sku: string, storeCode: string) {
    const path = `${storeCode}/V1/storepickup/stores/active/${sku}`;

    return this.get(path, null, { cacheOptions: { ttl: cache.StorePickAPI.list } });
  }

  getClickNCollectPickUpStores(storeCode: string, cartId: string): Promise<MDCClickNCollectPickUpStores[]> {
    const path = `${storeCode}/V1/storepickup/stores/sts/${cartId}`;

    return this.get(path, null, { cacheOptions: { ttl: cache.StorePickAPI.list } });
  }

  getStatusActivePickupStore(sku: string, storeCode: string) {
    const path = `${storeCode}/V1/storepickup/stores/active/${sku}/is-salable`;

    return this.get(path, null, { cacheOptions: { ttl: cache.StorePickAPI.list } });
  }

  getPickupLocationsBySKU(sku: string, storeCode: string): Promise<MDCPickupLocation[]> {
    const path = `${storeCode}/V1/get-pickup-locations`;

    return this.post(path, { sku });
  }

  getStorePickupLocationsAvailable(sku: string, storeCode: string): Promise<MDCStorePickupLocationsAvailable[]> {
    const path = `${storeCode}/V1/get-store-pickup-locations-available/${sku}`;

    return this.get(path, null, { cacheOptions: { ttl: cache.StorePickAPI.list } });
  }

  getShipFromStoreAvailableTime(): Promise<MDCShipFromStoreAvailableTime> {
    const path = `/V1/ship-from-store/available-time`;

    return this.get(path, null, {
      cacheOptions: { ttl: cache.StorePickAPI.shipFromStoreAvailableTime },
    });
  }
}
