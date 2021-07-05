import { WishlistResolvers } from './WishlistResolvers';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { Prime } from '../../../dataSource/prime';
import { CatalogServiceDataSource } from '../../../dataSource/catalogService';
import DataLakeRecommendationApi from '../../../dataSource/dataLakeRecommendationApi';
import DataLakeAppRecommendationApi from '../../../dataSource/dataLakeAppRecommendationApi';
import {
  mockWishlistResponseMDC,
  mockDataGetSimpleProduct,
  mockWishlistItem,
  mockGetWishlist,
  mockCreateWishlist,
  mockTransfromWishlisGroupItems,
  mockProductConfigurable,
  mockChildrenSimpleProduct,
} from './__mocks__/Wishlist';
import { IV2WishlistFilterInputCondition, IV2Direction } from '../../../types/graphql';
import { ProductUseCase } from './../products/ProductUseCase';
import { getWishlistItem } from './WishlistTransformer';

jest.mock('../../../dataSource/magento/MagentoDataSource');
jest.mock('../../../dataSource/prime');
jest.mock('../../../dataSource/dataLakeRecommendationApi');
jest.mock('../../../dataSource/dataLakeAppRecommendationApi');

describe('Product Resolvers', () => {
  const magento = new MagentoDataSource();
  const prime = new Prime();
  const catalogService = new CatalogServiceDataSource();
  const dataLakeRecommendation = new DataLakeRecommendationApi();
  const dataLakeAppRecommendation = new DataLakeAppRecommendationApi();
  const productUseCase = new ProductUseCase({
    catalogService,
    magento,
    prime,
    dataLakeRecommendation,
    dataLakeAppRecommendation,
  });
  const dataSources = {
    magento,
    prime,
    productUseCase,
  };

  describe(`V2WishlistGroup`, () => {
    const getItems = WishlistResolvers.V2WishlistGroup.items as Function;

    it(`should return data size: 1`, async () => {
      const data = [{ wishlistId: '182' }, { wishlistId: '184' }, { wishlistId: '188' }];
      const result = { items: [{ wishlist_id: '182', product_id: '182' }] };

      jest.spyOn(dataSources.magento.wishlist, 'searchWishlistItems').mockReturnValue(Promise.resolve(result as any));

      const values = await getItems({ items: data }, { input: { limit: 1 } }, { dataSources });
      expect(values.data).toEqual(result.items.map(item => getWishlistItem(item)));
      expect(values.totalCount).toEqual(undefined);
    });

    it(`should return data size: 3`, async () => {
      const data = [{ wishlistId: '182' }, { wishlistId: '184' }, { wishlistId: '188' }];
      const result = {
        items: [
          { wishlist_id: '182', product_id: '182' },
          { wishlistId: '184', product_id: '184' },
          { wishlistId: '188', product_id: '188' },
        ],
      };

      jest.spyOn(dataSources.magento.wishlist, 'searchWishlistItems').mockReturnValue(Promise.resolve(result as any));

      const values = await getItems({ items: data }, { input: { limit: 0 } }, { dataSources });
      expect(values.data).toEqual(result.items.map(item => getWishlistItem(item)));
      expect(values.totalCount).toEqual(undefined);
    });

    it(`should return data size: 1 offset: 1`, async () => {
      const data = [{ wishlistId: '182' }, { wishlistIdid: '184' }, { wishlistId: '188' }];
      const result = { items: [{ wishlist_id: '184', product_id: '184' }] };

      jest.spyOn(dataSources.magento.wishlist, 'searchWishlistItems').mockReturnValue(Promise.resolve(result as any));
      jest.spyOn(dataSources.magento.wishlist, 'getWishlistItem').mockReturnValue(Promise.resolve(result));

      const values = await getItems({ items: data }, { input: { limit: 1, page: 2 } }, { dataSources });
      expect(values.data).toEqual(result.items.map(item => getWishlistItem(item)));
      expect(values.totalCount).toEqual(undefined);
    });

    it(`should return data size: 1 offset: 1`, async () => {
      const data = [{ wishlistId: '182' }, { wishlistIdid: '184' }, { wishlistId: '188' }];
      const result = { total_count: 1, items: [{ wishlist_id: '184', product_id: '184' }] };

      jest.spyOn(dataSources.magento.wishlist, 'searchWishlistItems').mockReturnValue(Promise.resolve(result as any));
      jest.spyOn(dataSources.magento.wishlist, 'getWishlistItem').mockReturnValue(Promise.resolve(result));

      const values = await getItems({ items: data }, {}, { dataSources });
      expect(values.data).toEqual(result.items.map(item => getWishlistItem(item)));
      expect(values.totalCount).toEqual(1);
    });

    it(`should return data size: 1 offset: 1`, async () => {
      const data = [{}];
      const result = { total_count: 0, items: [] };

      jest.spyOn(dataSources.magento.wishlist, 'searchWishlistItems').mockReturnValue(Promise.resolve(result as any));
      jest.spyOn(dataSources.magento.wishlist, 'getWishlistItem').mockReturnValue(Promise.resolve(result));

      const values = await getItems({ items: data }, { input: null }, { dataSources });
      expect(values.data).toEqual([]);
      expect(values.totalCount).toEqual(0);
    });

    it(`should return data size: 1 offset: 1`, async () => {
      const data = [];
      const result = { total_count: 0, items: [] };

      jest.spyOn(dataSources.magento.wishlist, 'searchWishlistItems').mockReturnValue(Promise.resolve(result as any));
      jest.spyOn(dataSources.magento.wishlist, 'getWishlistItem').mockReturnValue(Promise.resolve(result));

      const values = await getItems({ items: data }, {}, { dataSources });
      expect(values.data).toEqual([]);
      expect(values.totalCount).toEqual(0);
    });
  });

  describe(`V2WishlistGroupItem`, () => {
    const getParent = WishlistResolvers.V2WishlistGroupItem.parent as Function;
    const getProduct = WishlistResolvers.V2WishlistGroupItem.product as Function;
    const getProductOptions = WishlistResolvers.V2WishlistGroupItem.productOptions as Function;

    it(`should return parent data`, async () => {
      const mockData = {
        sku: '123',
      };

      jest
        .spyOn(dataSources.productUseCase, 'findProductDetailBySKU')
        .mockReturnValue(Promise.resolve(mockData as any));

      jest
        .spyOn(dataSources.productUseCase, 'findByIdNew')
        .mockReturnValue(Promise.resolve(mockDataGetSimpleProduct as any));
      jest.spyOn(dataSources.magento.wishlist, 'getWishlistItem').mockReturnValue(Promise.resolve(mockWishlistItem));

      const values = await getParent({ sku: '123' }, null, { dataSources });
      expect(dataSources.productUseCase.findByIdNew).toHaveBeenCalled();
      expect(values).toEqual(null);
    });

    it(`should return parent data`, async () => {
      const mockData = {
        sku: '123',
      };

      jest
        .spyOn(dataSources.productUseCase, 'findProductDetailBySKU')
        .mockReturnValue(Promise.resolve(mockData as any));

      jest
        .spyOn(dataSources.productUseCase, 'findByIdNew')
        .mockReturnValue(Promise.resolve(mockProductConfigurable as any));
      jest.spyOn(dataSources.magento.wishlist, 'getWishlistItem').mockReturnValue(Promise.resolve(mockWishlistItem));

      const values = await getParent({ sku: '123' }, null, { dataSources });
      expect(dataSources.productUseCase.findByIdNew).toHaveBeenCalled();
      expect(values).toEqual(mockProductConfigurable);
    });

    it(`should return product data`, async () => {
      const mockParameters = {
        productId: '123',
        productOptions: [{ attributeCode: '123', value: '1' }],
      };

      jest
        .spyOn(dataSources.magento.product, 'getAttributesByAttributeCode')
        .mockReturnValue(Promise.resolve({ attribute_id: '123' }));
      jest
        .spyOn(dataSources.productUseCase, 'findByIdNew')
        .mockReturnValue(Promise.resolve(mockProductConfigurable as any));

      const values = await getProduct(mockParameters, null, { dataSources });
      expect(values).toEqual(mockChildrenSimpleProduct);
    });

    it(`should return product data`, async () => {
      const mockParameters = {
        productId: '123',
        productOptions: [{ attributeCode: '123', value: '1' }],
      };

      jest
        .spyOn(dataSources.magento.product, 'getAttributesByAttributeCode')
        .mockReturnValue(Promise.resolve({ attribute_id: '123' }));
      jest
        .spyOn(dataSources.productUseCase, 'findByIdNew')
        .mockReturnValue(Promise.resolve(mockDataGetSimpleProduct as any));

      const values = await getProduct(mockParameters, null, { dataSources });
      expect(values).toEqual(mockDataGetSimpleProduct);
    });

    it(`should return product data`, async () => {
      const mockParameters = {
        productId: '123',
        productOptions: [{ attributeCode: '123', value: '1' }],
      };

      const values = await getProductOptions(mockParameters, null, { dataSources });
      expect(values).toEqual(mockParameters.productOptions);
    });

    it(`should return product data`, async () => {
      const mockParameters = {
        productId: '123',
        productOptions: [],
      };

      const responseExpect = [{ attributeCode: '123', name: 'test', value: '1' }];

      jest
        .spyOn(dataSources.productUseCase, 'findByIdNew')
        .mockReturnValue(Promise.resolve(mockProductConfigurable as any));

      const values = await getProductOptions(mockParameters, null, { dataSources });
      expect(values).toEqual(responseExpect);
    });

    it(`should return product data`, async () => {
      const mockParameters = {
        productId: '123',
        productOptions: [],
      };

      jest
        .spyOn(dataSources.productUseCase, 'findByIdNew')
        .mockReturnValue(Promise.resolve(mockDataGetSimpleProduct as any));

      const values = await getProductOptions(mockParameters, null, { dataSources });
      expect(values).toEqual([]);
    });

    it(`should return product data`, async () => {
      const mockParameters = {
        productId: '123',
        productOptions: null,
      };

      jest
        .spyOn(dataSources.productUseCase, 'findByIdNew')
        .mockReturnValue(Promise.resolve(mockDataGetSimpleProduct as any));

      const values = await getProductOptions(mockParameters, null, { dataSources });
      expect(values).toEqual([]);
    });
  });

  describe(`Query v2GetWishlists`, () => {
    const getV2Wishlists = WishlistResolvers.Query.v2Wishlists as Function;

    const context = {
      dataSources,
      storeCode: 'cds',
      customerToken: '11111',
    };

    it(`should return data as expect 1`, async () => {
      const mockCustomerData = {
        id: 123,
      };

      const mockResponseSelectForUser = {
        items: [],
      };

      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomerData));
      jest.spyOn(dataSources.magento.wishlist, 'search').mockReturnValue(Promise.resolve(mockWishlistResponseMDC));
      jest
        .spyOn(dataSources.magento.wishlist, 'selectForUser')
        .mockReturnValue(Promise.resolve(mockResponseSelectForUser));
      jest.spyOn(dataSources.magento.wishlist, 'createWishlist').mockReturnValue(Promise.resolve());

      await getV2Wishlists(null, {}, context);

      const params = {
        page: 1,
        size: 0,
        filterGroups: [{ filters: [{ field: 'customer_id', value: '123' }] }],
        sortOrders: undefined,
      };

      expect(context.dataSources.magento.wishlist.search).toBeCalledWith(expect.objectContaining(params));
    });

    it(`should return data as expect 2`, async () => {
      const mockCustomerData = {
        id: 123,
      };

      const mockResponseSelectForUser = {
        items: [{ id: 123 }],
      };

      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomerData));
      jest.spyOn(dataSources.magento.wishlist, 'search').mockReturnValue(Promise.resolve(mockWishlistResponseMDC));
      jest
        .spyOn(dataSources.magento.wishlist, 'selectForUser')
        .mockReturnValue(Promise.resolve(mockResponseSelectForUser));

      const input = {
        input: {
          limit: 10,
          page: 1,
          filters: [
            {
              id: 'customer_id',
              optionIds: ['12'],
              condition: IV2WishlistFilterInputCondition.Eq,
            },
          ],
          sorts: [
            {
              id: 'name',
              direction: IV2Direction.Desc,
            },
          ],
        },
      };
      await getV2Wishlists(null, input, context);

      const params = {
        page: 1,
        size: 0,
        filterGroups: [{ filters: [{ field: 'customer_id', value: '123' }] }],
        sortOrders: undefined,
      };

      expect(context.dataSources.magento.wishlist.search).toBeCalledWith(expect.objectContaining(params));
    });

    it(`should return data as expect 3`, async () => {
      const mockCustomerData = { id: null };

      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomerData));

      expect(async () => await getV2Wishlists(null, { input: {} }, context)).rejects.toThrow();
    });

    it(`should throw error when customer token is empty`, () => {
      expect(async () => await getV2Wishlists(null, { input: {} }, { customerToken: null })).rejects.toThrow();
    });
  });

  describe(`Mutation v2CreateWishListItem`, () => {
    const v2CreateWishListItem = WishlistResolvers.Mutation.v2CreateWishListItem as Function;

    const context = {
      dataSources,
      storeCode: 'cds',
      customerToken: '11111',
    };

    it(`should return data as expect 4`, async () => {
      const mockCustomerData = {
        id: 123,
      };

      const itemDataConfiguration = {
        id: 4636,
        productId: '195990',
        customAttributes: [
          { value: '743', attributeCode: 'color_shade', name: 'color_shade' },
          { value: '848', attributeCode: 'size', name: 'size' },
        ],
      };

      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomerData));
      jest.spyOn(dataSources.magento.wishlist, 'getWishlist').mockReturnValue(Promise.resolve(mockGetWishlist));

      const response = await v2CreateWishListItem(null, { input: itemDataConfiguration }, context);
      expect(response).toEqual(mockTransfromWishlisGroupItems);
    });

    it(`should return data as expect 5`, async () => {
      const mockCustomerData = {
        id: 123,
      };

      const itemDataConfiguration = {
        id: 4636,
        productId: '195990',
        customAttributes: [{ value: '743', attributeCode: 'color_shade', name: 'color_shade' }],
      };

      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomerData));
      jest.spyOn(dataSources.magento.wishlist, 'getWishlist').mockReturnValue(Promise.resolve(mockGetWishlist));
      jest
        .spyOn(dataSources.magento.wishlist, 'createWishlistItem')
        .mockReturnValue(Promise.resolve(mockCreateWishlist));

      const response = await v2CreateWishListItem(null, { input: itemDataConfiguration }, context);
      expect(response).toEqual(getWishlistItem(mockCreateWishlist));
    });
  });

  describe(`Mutation v2DeleteWishListItem`, () => {
    const v2DeleteWishListItem = WishlistResolvers.Mutation.v2DeleteWishListItem as Function;

    const context = {
      dataSources,
      storeCode: 'cds',
      customerToken: '11111',
    };

    it(`should return data as expect 6`, async () => {
      const mockCustomerData = {
        id: 3675,
      };
      const wishlistItemId = 123;

      const mockResponse = {
        status: true,
      };
      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomerData));
      jest.spyOn(dataSources.magento.wishlist, 'getWishlistItem').mockReturnValue(Promise.resolve(mockWishlistItem));
      jest.spyOn(dataSources.magento.wishlist, 'getWishlist').mockReturnValue(Promise.resolve(mockGetWishlist));
      jest.spyOn(dataSources.magento.wishlist, 'deleteWishlistItem').mockReturnValue(Promise.resolve());

      const response = await v2DeleteWishListItem(null, { input: wishlistItemId }, context);
      expect(response).toEqual(mockResponse);
    });

    it(`should return data as expect 7`, async () => {
      const mockCustomerData = {
        id: 123,
      };
      const wishlistItemId = 123;

      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomerData));
      jest.spyOn(dataSources.magento.wishlist, 'getWishlistItem').mockReturnValue(Promise.resolve(mockWishlistItem));
      jest.spyOn(dataSources.magento.wishlist, 'getWishlist').mockReturnValue(Promise.resolve(mockGetWishlist));
      await expect(() => v2DeleteWishListItem(null, { input: wishlistItemId }, context)).rejects.toThrow();
    });

    it(`should return data as expect 8`, async () => {
      await expect(() => v2DeleteWishListItem(null, { input: {} }, { customerToken: null })).rejects.toThrow();
    });

    it(`should return data as expect 9`, async () => {
      const mockCustomerData = {
        id: 3675,
      };
      const wishlistItemId = 123;

      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomerData));
      jest.spyOn(dataSources.magento.wishlist, 'getWishlistItem').mockReturnValue(Promise.resolve(mockWishlistItem));
      jest.spyOn(dataSources.magento.wishlist, 'getWishlist').mockReturnValue(Promise.resolve(mockGetWishlist));
      jest.spyOn(dataSources.magento.wishlist, 'deleteWishlistItem').mockReturnValue(Promise.reject());

      await expect(() => v2DeleteWishListItem(null, { input: wishlistItemId }, context)).rejects.toThrow();
    });
  });

  describe(`Mutation v2MoveToWishlist`, () => {
    const v2MoveToWishList = WishlistResolvers.Mutation.v2MoveItemToWishListItem as Function;

    const context = {
      dataSources,
      storeCode: 'cds',
      customerToken: '11111',
    };

    it(`should return data as expect 10`, async () => {
      const mockCustomerData = {
        id: 123,
      };

      const itemDataConfiguration = {
        id: 4636,
        productId: '195990',
        customAttributes: [
          { value: '743', attributeCode: 'color_shade', name: 'color_shade' },
          { value: '848', attributeCode: 'size', name: 'size' },
        ],
        itemId: '1234',
      };

      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomerData));
      jest.spyOn(dataSources.magento.wishlist, 'getWishlist').mockReturnValue(Promise.resolve(mockGetWishlist));
      jest.spyOn(dataSources.magento.cart, 'deleteCartMineItem').mockReturnValue(Promise.resolve(true));

      const response = await v2MoveToWishList(null, { input: itemDataConfiguration }, context);
      expect(response).toEqual({ status: true });
    });

    it(`should return data as expect 11`, async () => {
      const mockCustomerData = {
        id: 123,
      };

      const itemDataConfiguration = {
        id: 4636,
        productId: '195990',
        customAttributes: [
          { value: '743', attributeCode: 'color_shade', name: 'color_shade' },
          { value: '848', attributeCode: 'size', name: 'size' },
        ],
        itemId: '1234',
      };

      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomerData));
      jest.spyOn(dataSources.magento.wishlist, 'getWishlist').mockReturnValue(Promise.resolve(mockGetWishlist));
      jest.spyOn(dataSources.magento.cart, 'deleteCartMineItem').mockReturnValue(Promise.resolve(false));

      const response = await v2MoveToWishList(null, { input: itemDataConfiguration }, context);
      expect(response).toEqual({ status: true });
    });
  });
});
