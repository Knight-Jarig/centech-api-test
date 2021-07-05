import { OrderResolvers } from './OrderResolvers';
import { createDataSources } from '../../../dataSource';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { OrderUseCase } from './OrderUseCase';
import  { 
  mockOrderWithPackageItemResponse, 
  mockPackagesResponse,
  mockItemsGroupBySellerResponse,
  mockOrderWithPackagesItemResponse,
  mockPackagesResponses,
  mockItemsGroupBySellerResponses,
 } from './__mocks__/Order';

jest.mock('../../../dataSource');
jest.mock('../../../dataSource/magento/MagentoDataSource');

describe('Order Resolvers: Test Query', () => {
  const dataSources = createDataSources();
  dataSources.orderUseCase = {
    getOrder: jest.fn(),
    getOrders: jest.fn(),
  } as any;

  describe(`Query: v2Order`, () => {
    const v2Order = OrderResolvers.Query.v2Order as Function;

    it(`getOrder should have to be called with expect input`, async () => {
      const input = { incrementId: '123' };
      await v2Order(null, { input }, { dataSources });
      expect(dataSources.orderUseCase.getOrder).toBeCalledWith(input);
    });
  });

  describe(`Query: v2Orders`, () => {
    const v2Orders = OrderResolvers.Query.v2Orders as Function;

    it(`getOrders should have to be called with expect input`, async () => {
      const input = {
        page: 1,
        limit: 5,
        sorts: [
          {
            direction: 'DESC',
            id: 'increment_id',
          },
        ],
        filters: [
          {
            id: 'created_at',
            optionIds: '2020-12-16 00:00:01',
            condition: 'FROM',
          },
          {
            id: 'created_at',
            optionIds: '2020-12-20 23:59:59',
            condition: 'TO',
          },
        ],
      };

      await v2Orders(null, { input }, { dataSources });
      expect(dataSources.orderUseCase.getOrders).toBeCalledWith(input);
    });
  });
});

describe('Order Resolvers: Test V2Order', () => {
  const v2Order = OrderResolvers.Query.v2Order as Function;
  const v2Orders = OrderResolvers.Query.v2Orders as Function;
  const itemsGroupBySeller = OrderResolvers.V2Order.itemsGroupBySeller as Function;
  const jsonParseStringify = value => JSON.parse(JSON.stringify(value));
  const store = {
    secure_base_media_url: 'secureBaseMediaUrl/',
  }
  const storeCode = 'cds_th';
  const customerToken = 'customer_token';
  const dataSources = createDataSources();
  const magento = new MagentoDataSource();
  dataSources.orderUseCase = new OrderUseCase({ magento });
  dataSources.orderUseCase.initialize({
    context: {
      storeCode,
      customerToken,
      store: store,
    },
  });

  it(`ItemsGroupBySeller should not null when get order detail.`, async () => {
    const incrementId = '123';
    const input = { incrementId };
    const customerId = '333';

    jest.spyOn(magento.order, 'search').mockReturnValue(Promise.resolve(mockOrderWithPackageItemResponse) as any);
    jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: customerId }) as any);
    jest.spyOn(magento.order, 'fetchOrderPackageStatus').mockReturnValue(Promise.resolve(mockPackagesResponse) as any);

    await v2Order(null, { input }, { dataSources });
    const response = await itemsGroupBySeller({ incrementId }, null, { dataSources, store });

    expect(jsonParseStringify(response)).toEqual(jsonParseStringify(mockItemsGroupBySellerResponse));
  });

  it(`ItemsGroupBySeller should not null when get order list.`, async () => {
    const incrementId = 'STGCO2006090002555';
    const input = {
      page: 1,
      limit: 5,
      sorts: [
        {
          direction: 'DESC',
          id: 'increment_id',
        },
      ],
      filters: [],
    };
    const customerId = '333';

    jest.spyOn(magento.order, 'search').mockReturnValue(Promise.resolve(mockOrderWithPackagesItemResponse) as any);
    jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: customerId }) as any);
    jest.spyOn(magento.order, 'fetchOrderPackageStatus').mockReturnValue(Promise.resolve(mockPackagesResponses) as any);

    await v2Orders(null, { input }, { dataSources });
    const response = await itemsGroupBySeller({ incrementId }, null, { dataSources, store });
    expect(jsonParseStringify(response)).toEqual(jsonParseStringify(mockItemsGroupBySellerResponses));
  });
});
