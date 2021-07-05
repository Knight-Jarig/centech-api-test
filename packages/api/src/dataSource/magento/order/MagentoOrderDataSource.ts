import { searchCriteriaBuilder } from '../../../utils/magento.utils';
import cache from '../../../configs/cache';
import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import { IFiltersQuery } from '../../../types/graphql';
import { MagentoSearchOrderResponse, MDCOrderPackageStatusResponse } from './MagentoOrderTypes';

export class MagentoOrderDataSource extends BaseRESTDataSource {
  search(filter: IFiltersQuery, storeCode: string | string[]): Promise<MagentoSearchOrderResponse> {
    const searchCriteria = searchCriteriaBuilder(filter);
    return this.get(`/${storeCode}/V1/orders?${searchCriteria}`, null, {
      cacheOptions: { ttl: cache.OrderAPI.search },
    });
  }

  async fetchOrderPackageStatus(orderNumber: string, storeCode: string): Promise<MDCOrderPackageStatusResponse[]> {
    return this.get(`/${storeCode}/V1/deliveryItem/packageStatusSummary/${orderNumber}`, null, {
      cacheOptions: { ttl: cache.OrderAPI.fetchOrderPackageStatus },
    });
  }

  async fetchOrder(orderId: number, storeCode: string | string[]) {
    return this.get(`/${storeCode}/V1/orders/${orderId}`, null, {
      cacheOptions: { ttl: cache.OrderAPI.fetchOrder },
    });
  }

  async shipmentTracking(increment_id: string, storeCode: string) {
    const filterByOrderId = [
      {
        filters: [{ field: 'order_id', value: increment_id }], // on this api use increment_id on order_id field ?
      },
    ];

    const searchCriteria = searchCriteriaBuilder({
      filterGroups: filterByOrderId,
    });
    const path = `/${storeCode}/V1/shipment-tracking?${searchCriteria}`;
    return this.get(path, null, {
      cacheOptions: { ttl: cache.OrderAPI.fetchOrderPackageStatus },
    });
  }
}
