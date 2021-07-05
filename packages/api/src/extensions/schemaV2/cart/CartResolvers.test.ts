import { CartResolvers } from './CartResolvers';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { Prime } from '../../../dataSource/prime';
import { CatalogServiceDataSource } from '../../../dataSource/catalogService';
import DataLakeRecommendationApi from '../../../dataSource/dataLakeRecommendationApi';
import DataLakeAppRecommendationApi from '../../../dataSource/dataLakeAppRecommendationApi';
import { ProductUseCase } from './../products/ProductUseCase';
import { CartUseCase } from './CartUseCase';
import { mockCartResponse2 } from './__mocks__/Cart';

jest.mock('../../../dataSource/magento/MagentoDataSource');
jest.mock('../../../dataSource/prime');
jest.mock('../../../dataSource/dataLakeRecommendationApi');
jest.mock('../../../dataSource/dataLakeAppRecommendationApi');

describe('Cart Resolvers', () => {
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
  const cartUseCase = new CartUseCase({ magento, productUseCase });
  const dataSources = {
    magento,
    prime,
    productUseCase,
    cartUseCase,
  };

  describe(`Query v2Cart`, () => {
    const getV2Cart = CartResolvers.Query.v2Cart as Function;

    const context = {
      dataSources,
      storeCode: 'cds',
      role: 'guest',
    };

    it(`should return data as expect`, async () => {
      jest.spyOn(dataSources.cartUseCase, 'getCart').mockReturnValue(Promise.resolve(null));

      await getV2Cart(null, {}, context);

      expect(dataSources.cartUseCase.getCart).toHaveBeenCalled();
    });
  });

  describe(`Field Resolver`, () => {

    const v2CartPromotionCardName = CartResolvers.V2Cart.promotionCardName as Function;

    it(`isPaymentPromotionLocked is 0 for member`, async () => {
      const context = {
        dataSources,
        storeCode: 'cds',
        role: 'member',
      };
      jest.spyOn(dataSources.cartUseCase, 'getPromotionCardName').mockReturnValue(Promise.resolve("MOCK"));

      await v2CartPromotionCardName({isPaymentPromotionLocked: false}, {} ,context);

      expect(dataSources.cartUseCase.getPromotionCardName).toHaveBeenCalledTimes(0);
    });

    it(`isPaymentPromotionLocked is 0 for guest`, async () => {
      const context = {
        dataSources,
        storeCode: 'cds',
        role: 'member',
      };
      jest.spyOn(dataSources.cartUseCase, 'getPromotionCardName').mockReturnValue(Promise.resolve("MOCK"));

      await v2CartPromotionCardName({isPaymentPromotionLocked: false,guestId: 'guestId'}, {} ,context);

      expect(dataSources.cartUseCase.getPromotionCardName).toHaveBeenCalledTimes(0);
    });

    it(`isPaymentPromotionLocked is 1 for member`, async () => {
      const context = {
        dataSources,
        storeCode: 'cds',
        role: 'member',
      };
      jest.spyOn(dataSources.cartUseCase, 'getPromotionCardName').mockReturnValue(Promise.resolve("MOCK"));

      await v2CartPromotionCardName({isPaymentPromotionLocked: true}, {} ,context);

      expect(dataSources.cartUseCase.getPromotionCardName).toHaveBeenCalled();
    });

    it(`isPaymentPromotionLocked is 1 for guest`, async () => {
      const context = {
        dataSources,
        storeCode: 'cds',
        role: 'guest',
      };
      jest.spyOn(dataSources.cartUseCase, 'getPromotionCardName').mockReturnValue(Promise.resolve("MOCK"));

      await v2CartPromotionCardName({isPaymentPromotionLocked: true,guestId: 'guestId'}, {} ,context);

      expect(dataSources.cartUseCase.getPromotionCardName).toHaveBeenCalledWith('guestId');
    });

  })

  describe(`Query v2CartMini`, () => {
    const getV2CartMini = CartResolvers.Query.v2CartMini as Function;
    const context = { dataSources };

    it(`should return data as expect`, async () => {
      jest.spyOn(dataSources.cartUseCase, 'getCartMini').mockReturnValue(Promise.resolve(null));
      await getV2CartMini(null, {}, context);
      expect(dataSources.cartUseCase.getCartMini).toHaveBeenCalled();
    });
  });

  describe(`Query getStorePickUp`, () => {
    const getV2Cart = CartResolvers.Query.v2StorePickUp as Function;

    const context = {
      dataSources,
    };

    it(`should return data as expect`, async () => {
      jest.spyOn(dataSources.cartUseCase, 'getStorePickUp').mockReturnValue(Promise.resolve(null));

      await getV2Cart(null, {}, context);

      expect(dataSources.cartUseCase.getStorePickUp).toHaveBeenCalled();
    });
  });

  describe(`Mutation v2DeleteCartItem`, () => {
    const deleteV2Cart = CartResolvers.Mutation.v2DeleteCartItem as Function;

    it(`should delete item from guest cart if guest id exists`, async () => {
      const context = {
        dataSources,
        storeCode: 'cds',
        role: 'guest',
      };

      dataSources.cartUseCase.initialize({
        context,
      });

      jest.spyOn(dataSources.magento.cartGuest, 'deleteCartGuestItem').mockReturnValue(Promise.resolve({}));

      await deleteV2Cart(
        null,
        {
          input: {
            itemId: 12345,
            guestId: 'testGuestId',
          },
        },
        context,
      );

      expect(dataSources.magento.cartGuest.deleteCartGuestItem).toHaveBeenCalled();
    });

    it(`should delete item from cart if guest id does not exists`, async () => {
      const context = {
        dataSources,
        storeCode: 'cds',
        role: 'member',
      };

      dataSources.cartUseCase.initialize({
        context,
      });

      jest.spyOn(dataSources.magento.cart, 'deleteCartMineItem').mockReturnValue(Promise.resolve({}));

      await deleteV2Cart(
        null,
        {
          input: {
            itemId: 12345,
          },
        },
        context,
      );

      expect(dataSources.magento.cart.deleteCartMineItem).toHaveBeenCalled();
    });
  });

  describe(`Mutation v2CartAddCoupon`, () => {
    const v2CartAddCoupon = CartResolvers.Mutation.v2CartAddCoupon as Function;
    const context = { dataSources };
    const input = {};

    it(`should return data as expect`, async () => {
      jest.spyOn(dataSources.cartUseCase, 'addCoupon').mockReturnValue(Promise.resolve(null));
      await v2CartAddCoupon(null, { input }, context);
      expect(dataSources.cartUseCase.addCoupon).toHaveBeenCalled();
    });
  });

  describe(`Mutation v2CartDeleteCoupon`, () => {
    const v2CartDeleteCoupon = CartResolvers.Mutation.v2CartDeleteCoupon as Function;
    const context = { dataSources };
    const input = {};

    it(`should return data as expect`, async () => {
      jest.spyOn(dataSources.cartUseCase, 'deleteCoupon').mockReturnValue(Promise.resolve(null));
      await v2CartDeleteCoupon(null, { input }, context);
      expect(dataSources.cartUseCase.deleteCoupon).toHaveBeenCalled();
    });
  });

  describe(`Mutation v2CartChangeQuantity`, () => {
    const v2CartChangeQuantity = CartResolvers.Mutation.v2CartChangeQuantity as Function;

    it(`should return data as expect on member`, async () => {
      jest.spyOn(dataSources.magento.cart, 'editCartItem').mockReturnValue(Promise.resolve(null));
      const context = {
        dataSources,
        storeCode: 'cds',
        role: 'member',
      };
      dataSources.cartUseCase.initialize({
        context,
      });
      await v2CartChangeQuantity(
        null,
        {
          input: {
            quantity: 1,
            itemId: 1234,
            cartId: 1234,
          },
        },
        context,
      );

      expect(dataSources.magento.cart.editCartItem).toHaveBeenCalled();
    });

    it(`should return data as expect on guest`, async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'editCartItem').mockReturnValue(Promise.resolve(null));
      const context = {
        dataSources,
        storeCode: 'cds',
        role: 'guest',
      };
      dataSources.cartUseCase.initialize({
        context,
      });
      await v2CartChangeQuantity(
        null,
        {
          input: {
            guestId: 'GUEST',
            quantity: 1,
            itemId: 1234,
            cartId: 1234,
          },
        },
        context,
      );

      expect(dataSources.magento.cartGuest.editCartItem).toHaveBeenCalled();
    });
  });

  describe(`Mutation v2CartAddGiftWrapping`, () => {
    const v2CartAddGiftWrapping = CartResolvers.Mutation.v2CartAddGiftWrapping as Function;

    it(`should return data as expect on member`, async () => {
      jest.spyOn(dataSources.magento.cart, 'addGiftWrapMessage').mockReturnValue(Promise.resolve(null));
      const context = {
        dataSources,
        storeCode: 'cds',
        role: 'member',
      };
      dataSources.cartUseCase.initialize({
        context,
      });
      await v2CartAddGiftWrapping(
        null,
        {
          input: {
            message: 'test',
          },
        },
        context,
      );

      expect(dataSources.magento.cart.addGiftWrapMessage).toHaveBeenCalled();
    });

    it(`should return data as expect on guest`, async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'addGiftWrapMessage').mockReturnValue(Promise.resolve(null));
      const context = {
        dataSources,
        storeCode: 'cds',
        role: 'guest',
      };
      dataSources.cartUseCase.initialize({
        context,
      });
      await v2CartAddGiftWrapping(
        null,
        {
          input: {
            message: 'test',
            cartId: '123s',
          },
        },
        context,
      );

      expect(dataSources.magento.cartGuest.addGiftWrapMessage).toHaveBeenCalled();
    });
  });

  describe(`Query deleteGiftWrapping`, () => {
    const v2DeleteGiftWrapping = CartResolvers.Mutation.v2CartDeleteGiftWrapping as Function;

    const context = {
      dataSources,
    };

    it(`should return data as expect`, async () => {
      jest.spyOn(dataSources.cartUseCase, 'deleteGiftWrapping').mockReturnValue(Promise.resolve({ status: true }));

      await v2DeleteGiftWrapping(null, {}, context);

      expect(dataSources.cartUseCase.deleteGiftWrapping).toHaveBeenCalled();
    });
  });

  describe(`Query getGiftWrapping`, () => {
    const v2GetGiftWrapping = CartResolvers.Query.v2CartGiftWrapping as Function;

    const context = {
      dataSources,
    };

    it(`should call getGiftWrappingMessage`, async () => {
      jest.spyOn(dataSources.cartUseCase, 'getGiftWrappingMessage').mockReturnValue(Promise.resolve({}));

      await v2GetGiftWrapping(null, {}, context);

      expect(dataSources.cartUseCase.getGiftWrappingMessage).toHaveBeenCalled();
    });
  });

  describe(`Mutation v2CartChangeGiftWrapping`, () => {
    const v2CartChangeGiftWrapping = CartResolvers.Mutation.v2CartChangeGiftWrapping as Function;

    it(`should return data as expect on member`, async () => {
      jest.spyOn(dataSources.magento.cart, 'addGiftWrapMessage').mockReturnValue(Promise.resolve(null));
      const context = {
        dataSources,
        storeCode: 'cds',
        role: 'member',
      };
      dataSources.cartUseCase.initialize({
        context,
      });
      await v2CartChangeGiftWrapping(
        null,
        {
          input: {
            message: 'test',
          },
        },
        context,
      );

      expect(dataSources.magento.cart.addGiftWrapMessage).toHaveBeenCalled();
    });

    it(`should return data as expect on guest`, async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'addGiftWrapMessage').mockReturnValue(Promise.resolve(null));
      const context = {
        dataSources,
        storeCode: 'cds',
        role: 'guest',
      };
      dataSources.cartUseCase.initialize({
        context,
      });
      await v2CartChangeGiftWrapping(
        null,
        {
          input: {
            message: 'test',
            cartId: '123s',
          },
        },
        context,
      );

      expect(dataSources.magento.cartGuest.addGiftWrapMessage).toHaveBeenCalled();
    });
  });

  describe(`Mutation v2AddCartItem`, () => {
    const v2AddCartItem = CartResolvers.Mutation.v2AddCartItem as Function;

    it(`should return data as expect on member`, async () => {
      jest.spyOn(dataSources.cartUseCase, 'addCartItem').mockReturnValue(Promise.resolve(null));

      const context = {
        dataSources,
        storeCode: 'cds',
        role: 'member',
      };
      dataSources.cartUseCase.initialize({
        context,
      });

      await v2AddCartItem(
        null,
        {
          input: {},
        },
        context,
      );
      expect(dataSources.cartUseCase.addCartItem).toHaveBeenCalled();
    });
  });
});
