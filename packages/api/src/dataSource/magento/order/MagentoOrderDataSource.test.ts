import { MagentoOrderDataSource } from './MagentoOrderDataSource';
import cache from '../../../configs/cache';
import { searchCriteriaBuilder } from '../../../utils/magento.utils';

class MagentoOrderDataSourceTest extends MagentoOrderDataSource {
  get() {
    return jest.fn() as any;
  }
}

describe('MagentoOrderDataSource', () => {
  const magentoOrder = new MagentoOrderDataSourceTest();

  describe(`order page`, () => {
    const storeCode = 'cds_th';

    it(`should run search properly`, async () => {
      const filter = {
        filterGroups: [{ filters: [{ field: 'customer_id', value: '1' }] }],
      };
      const searchCriteria = searchCriteriaBuilder(filter);

      const path = `/${storeCode}/V1/orders?${searchCriteria}`;
      const params = null;
      const init = {
        cacheOptions: { ttl: cache.OrderAPI.search },
      };

      jest.spyOn(magentoOrder, 'get').mockReturnValue(Promise.resolve({}) as any);

      await magentoOrder.search(filter, storeCode);
      expect(magentoOrder.get).toBeCalledWith(path, params, init);
    });

    it(`should run fetchOrderPackageStatus properly`, async () => {
      const orderNumber = '1';
      const path = `/${storeCode}/V1/deliveryItem/packageStatusSummary/${orderNumber}`;
      const params = null;
      const init = {
        cacheOptions: { ttl: cache.OrderAPI.fetchOrderPackageStatus },
      };

      jest.spyOn(magentoOrder, 'get').mockReturnValue(Promise.resolve({}) as any);

      await magentoOrder.fetchOrderPackageStatus(orderNumber, storeCode);
      expect(magentoOrder.get).toBeCalledWith(path, params, init);
    });

    it(`should run fetchOrder properly`, async () => {
      const orderId = 1;
      const path = `/${storeCode}/V1/orders/${orderId}`;
      const params = null;
      const init = {
        cacheOptions: { ttl: cache.OrderAPI.fetchOrder },
      };

      jest.spyOn(magentoOrder, 'get').mockReturnValue(Promise.resolve({}) as any);

      await magentoOrder.fetchOrder(orderId, storeCode);
      expect(magentoOrder.get).toBeCalledWith(path, params, init);
    });

    it(`should run shipmentTracking properly`, async () => {
      const increment_id = '1';
      const filterByOrderId = [
        {
          filters: [{ field: 'order_id', value: increment_id }],
        },
      ];
      const searchCriteria = searchCriteriaBuilder({
        filterGroups: filterByOrderId,
      });

      const path = `/${storeCode}/V1/shipment-tracking?${searchCriteria}`;
      const params = null;
      const init = {
        cacheOptions: { ttl: cache.OrderAPI.fetchOrderPackageStatus },
      };

      jest.spyOn(magentoOrder, 'get').mockReturnValue(Promise.resolve({}) as any);

      await magentoOrder.shipmentTracking(increment_id, storeCode);
      expect(magentoOrder.get).toBeCalledWith(path, params, init);
    });
  });
});
