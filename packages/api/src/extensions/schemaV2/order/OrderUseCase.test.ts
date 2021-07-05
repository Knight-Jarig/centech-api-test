import { OrderUseCase } from './OrderUseCase';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { ApplicationError } from '../../../error/ApplicationError';
import {
  mockOrderWithCanceledItemResponse,
  mockOrderWithCanceledResult,
  mockPackagesWithCanceledResponse,
  mockOrderWithPackageItemResponse,
  mockOrderWithPackageItemHasMarketPlaceInfoResponse,
  mockPackagesResponse,
  mockOrderWithPackageResult,
  mockOrderWithPackageHasMargetPlaceInfoResult,
  mockOrderWithOtherItemResponse,
  mockPackageWithOtherItemResponse,
  mockOrderWithOtherResult,
  mockOrdersWithCanceledResult,
  mockOrdersWithOtherResult,
  mockOrdersWithPackageResult,
  mockOrdersPackagesResult
} from './__mocks__/Order';

jest.mock('../../../dataSource/magento/MagentoDataSource');

describe('Order Usecase', () => {
  const magento = new MagentoDataSource();
  const orderUseCase = new OrderUseCase({ magento });
  const storeCode = 'cds_th';
  const customerToken = 'customer_token';
  const jsonParseStringify = value => JSON.parse(JSON.stringify(value));

  describe('getOrder', () => {
    const input = { incrementId: '43234' };
    it('Should return error if customerToken is empty', async () => {
      orderUseCase.initialize({
        context: {
          storeCode,
          customerToken: '',
        },
      });
      await expect(() => orderUseCase.getOrder(input)).rejects.toThrow(
        new ApplicationError("you don't have permission to view this order"),
      );
    });

    it('Should return error if can not find customer', async () => {
      orderUseCase.initialize({
        context: {
          storeCode,
          customerToken,
        },
      });

      jest.spyOn(magento.order, 'search').mockReturnValue(Promise.resolve({ items: [] }) as any);
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(null) as any);

      await expect(() => orderUseCase.getOrder(input)).rejects.toThrow(
        new ApplicationError("you don't have permission to view this order"),
      );
    });

    it('Should return null', async () => {
      const customerId = '333';
      const expectFilters = {
        page: 1,
        size: 1,
        filterGroups: [
          { filters: [{ field: 'customer_id', value: customerId, conditionType: 'eq' }] },
          { filters: [{ field: 'increment_id', value: input.incrementId, conditionType: 'eq' }] },
        ],
      };
      orderUseCase.initialize({
        context: {
          storeCode,
          customerToken,
        },
      });

      jest.spyOn(magento.order, 'search').mockReturnValue(Promise.resolve({ items: [] }) as any);
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: customerId }) as any);

      const result = await orderUseCase.getOrder(input);
      expect(magento.order.search).toBeCalledWith(expectFilters, storeCode);
      expect(result).toBeNull();
    });

    it('Should return order with canceled item', async () => {
      const customerId = '333';
      orderUseCase.initialize({
        context: {
          storeCode,
          customerToken,
          store: {
            secure_base_media_url: 'secureBaseMediaUrl/',
          },
        },
      });

      jest.spyOn(magento.order, 'search').mockReturnValue(Promise.resolve(mockOrderWithCanceledItemResponse) as any);
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: customerId }) as any);

      const result = await orderUseCase.getOrder(input);

      expect(jsonParseStringify(result)).toEqual(jsonParseStringify(mockOrderWithCanceledResult));
    });

    it('Should return order with package item', async () => {
      const customerId = '333';
      orderUseCase.initialize({
        context: {
          storeCode,
          customerToken,
          store: {
            secure_base_media_url: 'secureBaseMediaUrl/',
          },
        },
      });

      jest.spyOn(magento.order, 'search').mockReturnValue(Promise.resolve(mockOrderWithPackageItemResponse) as any);
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: customerId }) as any);
      jest
        .spyOn(magento.order, 'fetchOrderPackageStatus')
        .mockReturnValue(Promise.resolve(mockPackagesResponse) as any);

      const result = await orderUseCase.getOrder(input);

      expect(jsonParseStringify(result)).toEqual(jsonParseStringify(mockOrderWithPackageResult));
    });

    it('Should return order has market place info with package item', async () => {
      const customerId = '333';
      orderUseCase.initialize({
        context: {
          storeCode,
          customerToken,
          store: {
            secure_base_media_url: 'secureBaseMediaUrl/',
          },
        },
      });

      jest
        .spyOn(magento.order, 'search')
        .mockReturnValue(Promise.resolve(mockOrderWithPackageItemHasMarketPlaceInfoResponse) as any);
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: customerId }) as any);
      jest
        .spyOn(magento.order, 'fetchOrderPackageStatus')
        .mockReturnValue(Promise.resolve(mockPackagesResponse) as any);

      const result = await orderUseCase.getOrder(input);
      const jsonParseStringify = value => JSON.parse(JSON.stringify(value));

      expect(jsonParseStringify(result)).toEqual(jsonParseStringify(mockOrderWithPackageHasMargetPlaceInfoResult));
    });

    it('Should return order with other item', async () => {
      const customerId = '333';
      orderUseCase.initialize({
        context: {
          storeCode,
          customerToken,
          store: {
            secure_base_media_url: 'secureBaseMediaUrl/',
          },
        },
      });

      jest.spyOn(magento.order, 'search').mockReturnValue(Promise.resolve(mockOrderWithOtherItemResponse) as any);
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: customerId }) as any);
      jest
        .spyOn(magento.order, 'fetchOrderPackageStatus')
        .mockReturnValue(Promise.resolve(mockPackageWithOtherItemResponse) as any);

      const result = await orderUseCase.getOrder(input);

      expect(jsonParseStringify(result)).toEqual(jsonParseStringify(mockOrderWithOtherResult));
    });

    it('Should return orders with itemsGroupBySeller.', async () => {
      const customerId = '333';
      orderUseCase.initialize({
        context: {
          storeCode,
          customerToken,
          store: {
            secure_base_media_url: 'secureBaseMediaUrl/',
          },
        },
      });

      jest.spyOn(magento.order, 'search').mockReturnValue(Promise.resolve(mockOrderWithPackageItemResponse) as any);
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: customerId }) as any);
      jest
        .spyOn(magento.order, 'fetchOrderPackageStatus')
        .mockReturnValue(Promise.resolve(mockPackagesResponse) as any);
      await orderUseCase.getOrder(input);
      const result = await orderUseCase.fetchOrderPackage(input.incrementId);
      expect(jsonParseStringify(result)).toEqual(jsonParseStringify(mockOrdersPackagesResult));
    });
    it('Should throw application error when did not fetch orders.', async () => {
      const customerId = '333';
      orderUseCase.initialize({
        context: {
          storeCode,
          customerToken,
          store: {
            secure_base_media_url: 'secureBaseMediaUrl/',
          },
        },
      });
  
      jest.spyOn(magento.order, 'search').mockReturnValue(Promise.resolve(mockOrderWithPackageItemResponse) as any);
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: customerId }) as any);
      jest
        .spyOn(magento.order, 'fetchOrderPackageStatus')
        .mockReturnValue(Promise.resolve(mockPackagesResponse) as any);
      try {
        await orderUseCase.fetchOrderPackage(input.incrementId);
      } catch(e) {
        expect(e).toBeInstanceOf(ApplicationError);
      }
    });
  });

  describe('getOrders', () => {
    const input = {
      page: 1,
      limit: 5,
    };
    const customerId = '333';
    orderUseCase.initialize({
      context: {
        storeCode,
        customerToken,
        store: {
          secure_base_media_url: 'secureBaseMediaUrl/',
        },
      },
    });

    it('Should return orders with canceled item', async () => {
      jest.spyOn(magento.order, 'search').mockReturnValue(Promise.resolve(mockOrderWithCanceledItemResponse) as any);
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: customerId }) as any);
      jest
        .spyOn(magento.order, 'fetchOrderPackageStatus')
        .mockReturnValue(Promise.resolve(mockPackagesWithCanceledResponse) as any);

      const result = await orderUseCase.getOrders(input);
      expect(jsonParseStringify(result)).toEqual(jsonParseStringify(mockOrdersWithCanceledResult));
    });

    it('Should return orders with package item', async () => {
      const customerId = '333';
      orderUseCase.initialize({
        context: {
          storeCode,
          customerToken,
          store: {
            secure_base_media_url: 'secureBaseMediaUrl/',
          },
        },
      });

      jest.spyOn(magento.order, 'search').mockReturnValue(Promise.resolve(mockOrderWithPackageItemResponse) as any);
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: customerId }) as any);
      jest
        .spyOn(magento.order, 'fetchOrderPackageStatus')
        .mockReturnValue(Promise.resolve(mockPackagesResponse) as any);

      const result = await orderUseCase.getOrders(input);

      expect(jsonParseStringify(result)).toEqual(jsonParseStringify(mockOrdersWithPackageResult));
    });

    it('Should return orders with other item', async () => {
      const customerId = '333';
      orderUseCase.initialize({
        context: {
          storeCode,
          customerToken,
          store: {
            secure_base_media_url: 'secureBaseMediaUrl/',
          },
        },
      });

      jest.spyOn(magento.order, 'search').mockReturnValue(Promise.resolve(mockOrderWithOtherItemResponse) as any);
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: customerId }) as any);
      jest
        .spyOn(magento.order, 'fetchOrderPackageStatus')
        .mockReturnValue(Promise.resolve(mockPackagesResponse) as any);

      const result = await orderUseCase.getOrders(input);

      expect(jsonParseStringify(result)).toEqual(jsonParseStringify(mockOrdersWithOtherResult));
    });
  });
});
