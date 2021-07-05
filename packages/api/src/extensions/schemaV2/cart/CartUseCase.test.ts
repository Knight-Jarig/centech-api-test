import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { Prime } from '../../../dataSource/prime';
import { CatalogServiceDataSource } from '../../../dataSource/catalogService';
import DataLakeRecommendationApi from '../../../dataSource/dataLakeRecommendationApi';
import DataLakeAppRecommendationApi from '../../../dataSource/dataLakeAppRecommendationApi';
import { ProductUseCase } from './../products/ProductUseCase';
import { CartUseCase } from './CartUseCase';
import {
  mockCartMDCResult1,
  mockCartMDCResult2,
  mockCartMDCResult3,
  mockCartTotalMDCResult1,
  mockCartTotalMDCResult2,
  mockCartTotalMDCResult3,
  mockProductInCartResult1,
  mockCartResponse1,
  mockCartResponse2,
  mockCartResponse3,
  mockCartMiniMDCResult1,
  mockCartMiniResponseGuest1,
  mockCartMiniResponseMember1,
  mockCartStorePickUpResponse,
  mockCartStorePickUpResponseTransform,
  mockStorePickUpStoreResponseStoreListNull,
  mockStorePickUpStoreResponseStoreListNullTransform,
  mockCartStorePickUpResponseNull,
  mockCartStorePickUpResponseNullTransform,
  mockCartAddCouponResponse,
  mockCartDeleteCouponResponse,
  mockCartStorePickUpResponseWithFilters,
  mockCartStorePickUpResponseWithFiltersResult,
  mockAddCartItemMDCResult,
  mockProductFindBysNew,
  responseAddCartItem,
  mockAddCartItemMDCResult2,
  responseAddCartItem2,
  mockTransformedGetGiftWrapping,
  mockGiftWrappingMessageFromMDC,
  mockGiftWrappingMessageFromMDCNACase,
  mockTransformedGetGiftWrappingNACase,
  mockPaymentInformationFromMDC
} from './__mocks__/Cart';
import {
  ISortersQueryName,
  ISortersQueryField,
  IV2FiltersQueryField,
  IV2FiltersQueryName,
} from '../../../types/graphql';
import { ApplicationError } from '../../../error/ApplicationError';
import { ApolloError } from 'apollo-server';
import { transformProduct } from '../transformer/cs2-transformer';

jest.mock('../../../dataSource/magento/MagentoDataSource');
jest.mock('../../../dataSource/prime');
jest.mock('../../../dataSource/dataLakeRecommendationApi');
jest.mock('../../../dataSource/dataLakeAppRecommendationApi');

const store = { code: 'cds_th' };
const token = '123456';

describe('Cart Usecase', () => {
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

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('get cart member', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'member',
      },
    });

    it('should return data expect: cart member free item in item', async () => {
      jest.spyOn(magento.cart, 'getCartMine').mockReturnValue(Promise.resolve(mockCartMDCResult1));
      jest.spyOn(magento.cart, 'getCartMineTotals').mockReturnValue(Promise.resolve(mockCartTotalMDCResult1));
      jest.spyOn(magento.cart, 'getPaymentInformation').mockReturnValue(Promise.resolve(mockPaymentInformationFromMDC));
      jest.spyOn(productUseCase, 'findBySkusNew').mockReturnValue(Promise.resolve(mockProductInCartResult1));

      const result = await cartUseCase.getCart({});

      expect(result).toEqual(mockCartResponse1);
      expect(magento.cart.getCartMine).toBeCalledWith(store.code);
      expect(magento.cart.getCartMineTotals).toBeCalledWith(store.code);
    });

    it('should return data expect: cart member free item in item and coupon discount 95%', async () => {
      jest.spyOn(magento.cart, 'getCartMine').mockReturnValue(Promise.resolve(mockCartMDCResult3));
      jest.spyOn(magento.cart, 'getCartMineTotals').mockReturnValue(Promise.resolve(mockCartTotalMDCResult3));
      jest.spyOn(productUseCase, 'findBySkusNew').mockReturnValue(Promise.resolve(mockProductInCartResult1));
      jest.spyOn(magento.cart, 'getPaymentInformation').mockReturnValue(Promise.resolve(mockPaymentInformationFromMDC));

      const result = await cartUseCase.getCart({});

      expect(result).toEqual(mockCartResponse3);
      expect(magento.cart.getCartMine).toBeCalledWith(store.code);
      expect(magento.cart.getCartMineTotals).toBeCalledWith(store.code);
    });

    it('should return data expect: cart member is empty item', async () => {
      jest.spyOn(magento.cart, 'getCartMine').mockReturnValue(Promise.resolve(mockCartMDCResult2));
      jest.spyOn(magento.cart, 'getCartMineTotals').mockReturnValue(Promise.resolve(mockCartTotalMDCResult2));
      jest.spyOn(magento.cart, 'getPaymentInformation').mockReturnValue(Promise.resolve(mockPaymentInformationFromMDC));

      const result = await cartUseCase.getCart({});

      expect(result).toEqual(mockCartResponse2);
      expect(magento.cart.getCartMine).toBeCalledWith(store.code);
      expect(magento.cart.getCartMineTotals).toBeCalledWith(store.code);
    });
  });

  describe('get cart guest', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'guest',
        authToken: token,
      },
    });

    it('should call cart guest with params correctly: cart guest', async () => {
      jest.spyOn(magento.cartGuest, 'getCartGuest').mockReturnValue(Promise.resolve(mockCartMDCResult1));
      jest.spyOn(magento.cartGuest, 'getCartGuestTotals').mockReturnValue(Promise.resolve(mockCartTotalMDCResult1));
      jest.spyOn(productUseCase, 'findBySkus').mockReturnValue(Promise.resolve(mockProductInCartResult1));
      jest.spyOn(magento.cartGuest, 'getPaymentInformation').mockReturnValue(Promise.resolve(mockPaymentInformationFromMDC));

      await cartUseCase.getCart({ guestId: '123456' });

      expect(magento.cartGuest.getCartGuest).toBeCalledWith(token, store.code);
      expect(magento.cartGuest.getCartGuestTotals).toBeCalledWith(token, store.code);
    });
  });

  describe('get cart guest without guest id', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'guest',
      },
    });

    it('should call cart guest with params correctly: cart guest', async () => {
      jest.spyOn(magento.cartGuest, 'getCartGuest').mockReturnValue(Promise.resolve(mockCartMDCResult1));
      jest.spyOn(magento.cartGuest, 'getCartGuestTotals').mockReturnValue(Promise.resolve(mockCartTotalMDCResult1));
      jest.spyOn(magento.cartGuest, 'createCartGuest').mockReturnValue(Promise.resolve('123456'));
      jest.spyOn(productUseCase, 'findBySkus').mockReturnValue(Promise.resolve(mockProductInCartResult1));

      expect(async () => {
        await cartUseCase.getCart(null);
      }).not.toThrow();

      expect(magento.cartGuest.createCartGuest).toHaveBeenCalled();
      expect(magento.cartGuest.getCartGuest).toBeCalledWith('123456', 'cds_th');
      expect(magento.cartGuest.getCartGuestTotals).toBeCalledWith('123456', 'cds_th');
    });
  });

  describe('get cart member mini', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'member',
      },
    });

    it('should return data expect', async () => {
      jest.spyOn(magento.cart, 'getCartMineMini').mockReturnValue(Promise.resolve(mockCartMiniMDCResult1));

      const result = await cartUseCase.getCartMini({});

      expect(result).toEqual(mockCartMiniResponseMember1);
      expect(magento.cart.getCartMineMini).toHaveBeenCalled();
    });
  });

  describe('get cart guest mini', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'guest',
        authToken: token,
      },
    });

    it('should return data expect', async () => {
      jest.spyOn(magento.cartGuest, 'getCartGuestMini').mockReturnValue(Promise.resolve(mockCartMiniMDCResult1));

      const result = await cartUseCase.getCartMini({ guestId: '123456' });

      expect(result).toEqual(mockCartMiniResponseGuest1);
      expect(magento.cartGuest.getCartGuestMini).toHaveBeenCalled();
    });
  });

  describe('get cart guest mini', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'guest',
      },
    });

    it('should return data expect', async () => {
      jest.spyOn(magento.cartGuest, 'createCartGuest').mockReturnValue(Promise.resolve('123456'));
      jest.spyOn(magento.cartGuest, 'getCartGuestMini').mockReturnValue(Promise.resolve(mockCartMiniMDCResult1));

      expect(async () => {
        await cartUseCase.getCartMini(null);
      }).not.toThrow();

      expect(magento.cartGuest.createCartGuest).toHaveBeenCalled();
      expect(magento.cartGuest.getCartGuestMini).toHaveBeenCalled();
    });
  });

  describe('getStoreList member', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'member',
      },
    });

    it('should return data expect', async () => {
      jest.spyOn(magento.cart, 'getStoreList').mockReturnValue(Promise.resolve(mockCartStorePickUpResponse as any));

      const result = await cartUseCase.getStorePickUp({ filters: { page: 0, limit: 0 } });

      expect(result).toEqual(mockCartStorePickUpResponseTransform);
      expect(magento.cart.getStoreList).toHaveBeenCalled();
    });

    it('should return data expect', async () => {
      jest
        .spyOn(magento.cart, 'getStoreList')
        .mockReturnValue(Promise.resolve(mockStorePickUpStoreResponseStoreListNull as any));

      const result = await cartUseCase.getStorePickUp({ filters: { page: 0, limit: 0 } });

      expect(result).toEqual(mockStorePickUpStoreResponseStoreListNullTransform);
      expect(magento.cart.getStoreList).toHaveBeenCalled();
    });

    it('should return data expect', async () => {
      jest.spyOn(magento.cart, 'getStoreList').mockReturnValue(Promise.resolve(mockCartStorePickUpResponseNull as any));

      const result = await cartUseCase.getStorePickUp({ filters: { page: 0, limit: 0 } });

      expect(result).toEqual(mockCartStorePickUpResponseNullTransform);
      expect(magento.cart.getStoreList).toHaveBeenCalled();
    });

    it('should return data expect', async () => {
      jest
        .spyOn(magento.cart, 'getStoreList')
        .mockReturnValue(Promise.resolve(mockCartStorePickUpResponseWithFilters as any));

      const result = await cartUseCase.getStorePickUp({
        filters: {
          page: 0,
          limit: 0,
          filters: {
            name: IV2FiltersQueryName.StoreFinder,
            values: [{ field: IV2FiltersQueryField.Input, value: 'bang bua' }],
          } as any,
          sorters: [
            {
              name: ISortersQueryName.CustomerLocation,
              values: [
                { field: ISortersQueryField.Latitude, value: '13.8408' },
                { field: ISortersQueryField.Longitude, value: '100.548763' },
              ],
            },
          ],
        },
      });

      expect(result).toEqual(mockCartStorePickUpResponseWithFiltersResult);
      expect(magento.cart.getStoreList).toHaveBeenCalled();
    });
  });

  describe('getStoreList guest', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'guest',
        authToken: token,
      },
    });

    it('should return data expect', async () => {
      jest
        .spyOn(magento.cartGuest, 'getStoreList')
        .mockReturnValue(Promise.resolve(mockCartStorePickUpResponse as any));

      const result = await cartUseCase.getStorePickUp({ guestId: '123', filters: { page: 0, limit: 0 } });

      expect(result).toEqual(mockCartStorePickUpResponseTransform);
      expect(magento.cartGuest.getStoreList).toHaveBeenCalled();
    });
  });

  describe('v2CartAddCoupon member', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'member',
      },
    });
    const coupon = 'coupon';

    it('should return data expect', async () => {
      jest.spyOn(magento.cart, 'addCoupon').mockReturnValue(Promise.resolve(true));
      const result = await cartUseCase.addCoupon({ coupon });
      expect(result).toEqual(mockCartAddCouponResponse);
    });

    it('should return throw', async () => {
      const extensions = {
        response: {
          body: {},
        },
      };
      const e = new ApolloError("The coupon code isn't valid. Verify the code and try again.", '404', extensions);
      jest.spyOn(magento.cart, 'addCoupon').mockReturnValue(Promise.reject(e));
      expect(async () => {
        await cartUseCase.addCoupon({ coupon });
      }).rejects.toThrowError(ApplicationError);
    });
  });

  describe('v2CartAddCoupon guest', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'guest',
        authToken: token,
      },
    });
    const coupon = 'coupon',
      guestId = 'cartId';

    it('should return data expect', async () => {
      jest.spyOn(magento.cartGuest, 'addCoupon').mockReturnValue(Promise.resolve(true));
      const result = await cartUseCase.addCoupon({ coupon, guestId });
      expect(result).toEqual(mockCartAddCouponResponse);
    });

    it('should return throw', async () => {
      const extensions = {
        response: {
          body: {},
        },
      };
      const e = new ApolloError("The coupon code isn't valid. Verify the code and try again.", '404', extensions);
      jest.spyOn(magento.cartGuest, 'addCoupon').mockReturnValue(Promise.reject(e));
      expect(async () => {
        await cartUseCase.addCoupon({ coupon, guestId });
      }).rejects.toThrowError(ApplicationError);
    });
  });

  describe('v2CartDeleteGiftWrapping guest', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'guest',
        authToken: token,
      },
    });
    const guestId = 'cartId';

    it('should return data expect', async () => {
      jest.spyOn(magento.cartGuest, 'deleteGiftWrapMessage').mockReturnValue(Promise.resolve(true));
      const result = await cartUseCase.deleteGiftWrapping({ guestId });
      expect(result).toEqual({ status: true });
    });
  });

  describe('v2CartDeleteGiftWrapping member', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'member',
        authToken: token,
      },
    });

    it('should return data expect', async () => {
      jest.spyOn(magento.cartGuest, 'deleteGiftWrapMessage').mockReturnValue(Promise.resolve(true));
      const result = await cartUseCase.deleteGiftWrapping(null);
      expect(result).toEqual({ status: true });
    });
  });

  describe('v2CartDeleteCoupon member', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'member',
      },
    });

    it('should return data expect', async () => {
      jest.spyOn(magento.cart, 'deleteCoupon').mockReturnValue(Promise.resolve(true));
      const result = await cartUseCase.deleteCoupon({});
      expect(result).toEqual(mockCartDeleteCouponResponse);
    });

    it('should return throw', async () => {
      const extensions = {
        response: {
          body: {},
        },
      };
      const e = new ApolloError('Error', '404', extensions);
      jest.spyOn(magento.cart, 'deleteCoupon').mockReturnValue(Promise.reject(e));
      expect(async () => {
        await cartUseCase.deleteCoupon();
      }).rejects.toThrowError(ApplicationError);
    });
  });

  describe('v2CartDeleteCoupon guest', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'guest',
        authToken: token,
      },
    });

    const input = {
      guestId: 'cartId',
    };

    it('should return data expect', async () => {
      jest.spyOn(magento.cartGuest, 'deleteCoupon').mockReturnValue(Promise.resolve(true));
      const result = await cartUseCase.deleteCoupon(input);
      expect(result).toEqual(mockCartDeleteCouponResponse);
    });

    it('should return throw', async () => {
      const extensions = {
        response: {
          body: {},
        },
      };
      const e = new ApolloError('Error', '404', extensions);
      jest.spyOn(magento.cartGuest, 'deleteCoupon').mockReturnValue(Promise.reject(e));
      expect(async () => {
        await cartUseCase.deleteCoupon(input);
      }).rejects.toThrowError(ApplicationError);
    });
  });

  describe('v2CartAddGiftWrapping member', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'member',
      },
    });

    const mockResponse = { status: true };

    it('should return data expect', async () => {
      jest.spyOn(magento.cart, 'addGiftWrapMessage').mockReturnValue(Promise.resolve(true));
      const result = await cartUseCase.addGiftWrapMessage({ message: 'test' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('v2CartAddGiftWrapping guest', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'guest',
        authToken: token,
      },
    });

    const mockResponse = { status: true };

    it('should return data expect', async () => {
      jest.spyOn(magento.cartGuest, 'addGiftWrapMessage').mockReturnValue(Promise.resolve(true));
      const result = await cartUseCase.addGiftWrapMessage({ guestId: '123', message: 'test' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe(`v2CartGiftWrapping member`, () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'member',
      },
    });

    const mockResponse = mockTransformedGetGiftWrapping;

    it(`should return data as expect`, async () => {
      jest.spyOn(magento.cart, 'getGiftMessage').mockReturnValue(Promise.resolve(mockGiftWrappingMessageFromMDC));
      const result = await cartUseCase.getGiftWrappingMessage(null);
      expect(result).toEqual(mockResponse);
    });

    it(`should return data as expect`, async () => {
      jest.spyOn(magento.cart, 'getGiftMessage').mockReturnValue(Promise.resolve(mockGiftWrappingMessageFromMDCNACase));
      const result = await cartUseCase.getGiftWrappingMessage(null);
      expect(result).toEqual(mockTransformedGetGiftWrappingNACase);
    });
  });

  describe(`v2CartGiftWrapping guest`, () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'guest',
        authToken: token,
      },
    });

    const mockResponse = mockTransformedGetGiftWrapping;

    it(`should return data as expect`, async () => {
      jest.spyOn(magento.cartGuest, 'getGiftMessage').mockReturnValue(Promise.resolve(mockGiftWrappingMessageFromMDC));
      const result = await cartUseCase.getGiftWrappingMessage({ guestId: '123' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('v2CartChangeGiftWrapping member', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'member',
      },
    });

    const mockResponse = { status: true };

    it('should return data expect', async () => {
      jest.spyOn(magento.cart, 'addGiftWrapMessage').mockReturnValue(Promise.resolve(true));
      const result = await cartUseCase.changeGiftWrapMessage({ message: 'test' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('v2CartChangeGiftWrapping guest', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'guest',
        authToken: token,
      },
    });

    const mockResponse = { status: true };

    it('should return data expect', async () => {
      jest.spyOn(magento.cartGuest, 'addGiftWrapMessage').mockReturnValue(Promise.resolve(true));
      const result = await cartUseCase.changeGiftWrapMessage({ guestId: '123', message: 'test' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('v2AddCartItem guest', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'guest',
        authToken: token,
      },
    });

    it('should return data expect', async () => {
      jest.spyOn(magento.cartGuest, 'addCartGuestItem').mockReturnValue(Promise.resolve(mockAddCartItemMDCResult));
      jest.spyOn(productUseCase, 'findBySkusNew').mockReturnValue(Promise.resolve(mockProductFindBysNew as any));

      const result = await cartUseCase.addCartItem({
        guestId: '123',
        quantity: 1,
        sku: 'cds00000013',
        productOptions: [{ id: '410', value: 16473 }],
      });
      expect(result).toEqual(responseAddCartItem);
    });

    it('parent null', async () => {
      jest.spyOn(magento.cartGuest, 'addCartGuestItem').mockReturnValue(Promise.resolve(mockAddCartItemMDCResult2));
      jest.spyOn(productUseCase, 'findBySkusNew').mockReturnValue(Promise.resolve(mockProductFindBysNew as any));

      const result = await cartUseCase.addCartItem({
        guestId: '123',
        quantity: 1,
        sku: 'cds00000013',
        productOptions: [{ id: '410', value: 16473 }],
      });
      expect(result).toEqual(responseAddCartItem2);
    });
  });

  describe('v2AddCartItem guest', () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });
    cartUseCase.initialize({
      context: {
        store,
        role: 'member',
        authToken: token,
      },
    });

    it('should return data expect', async () => {
      jest.spyOn(magento.cart, 'getCartMine').mockReturnValue(Promise.resolve({ id: '123' } as any));
      jest.spyOn(magento.cart, 'addCartMineItem').mockReturnValue(Promise.resolve(mockAddCartItemMDCResult));
      jest.spyOn(productUseCase, 'findBySkusNew').mockReturnValue(Promise.resolve(mockProductFindBysNew as any));

      const result = await cartUseCase.addCartItem({
        quantity: 1,
        sku: 'cds00000013',
        productOptions: [{ id: '410', value: 16473 }],
      });
      expect(result).toEqual(responseAddCartItem);
    });
  });

  describe(`getPaymentInformation`, () => {
    const cartUseCase = new CartUseCase({ magento, productUseCase });

    it(`should return data as expect for member`, async () => {
      cartUseCase.initialize({
        context: {
          store,
          role: 'member',
          authToken: token,
        },
      });
      jest.spyOn(magento.cart, 'getPaymentInformation').mockReturnValue(Promise.resolve(mockPaymentInformationFromMDC));
      
      const result = await cartUseCase.getPromotionCardName();
      expect(result).toEqual(mockPaymentInformationFromMDC.extension_attributes.p2c2p_credit_card_promotions[0].card_name);
    })

    it(`should return data as expect for guest`, async () => {
      cartUseCase.initialize({
        context: {
          store,
          role: 'guest',
          authToken: token,
        },
      });
      jest.spyOn(magento.cartGuest, 'getPaymentInformation').mockReturnValue(Promise.resolve(mockPaymentInformationFromMDC));
      
      const result = await cartUseCase.getPromotionCardName('guestId');
      expect(result).toEqual(mockPaymentInformationFromMDC.extension_attributes.p2c2p_credit_card_promotions[0].card_name);
    })
  })
});
