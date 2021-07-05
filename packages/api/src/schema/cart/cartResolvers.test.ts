import { MagentoDataSource } from '../../dataSource/magento/MagentoDataSource';
import CartResolver from './cartResolvers';

const mockDataSources = {
  multi: {
    addCoupon: coupon => {
      const preValidCoupon = ['COUPON_1', 'COUPON_2'];
      const couponList = coupon.split(',');
      const validCoupon = couponList.filter(couponCode => preValidCoupon.includes(couponCode)).join(',');
      return new Promise((resolve, reject) => {
        if (validCoupon !== '') return resolve(validCoupon);
        return reject(new Error('404'));
      });
    },
  },
  single: {
    getCartMineMini: () => new Promise(resolve => resolve(true)),
    createCartMine: () => new Promise(resolve => resolve(true)),
    getStoreList: () => new Promise(resolve => resolve(true)),
    editCartItem: () => new Promise(resolve => resolve(true)),
    addCartMineItem: () => new Promise(resolve => resolve(true)),
    deleteCartMineItem: () => new Promise(resolve => resolve(true)),
    addCoupon: () => new Promise(resolve => resolve(true)),
    deleteCoupon: () => new Promise(resolve => resolve(true)),
    loginT1: () => new Promise(resolve => resolve(true)),
    deletePoint: () => new Promise(resolve => resolve(true)),
    addGiftWrapMessage: () => new Promise(resolve => resolve(true)),
    deleteGiftWrapMessage: () => new Promise(resolve => resolve(true)),
    getCartMine: () => new Promise(resolve => resolve(true)),
    getCartMineTotals: () => new Promise(resolve => resolve(true)),
    burnPoint: () => new Promise(resolve => resolve(true)),
  },
  cartGuest: {
    getCartGuestMini: () => new Promise(resolve => resolve(true)),
    createCartGuest: () => new Promise(resolve => resolve(true)),
    getStoreList: () => new Promise(resolve => resolve(true)),
    editCartItem: () => new Promise(resolve => resolve(true)),
    addCartGuestItem: () => new Promise(resolve => resolve(true)),
    deleteCartGuestItem: () => new Promise(resolve => resolve(true)),
    addCoupon: () => new Promise(resolve => resolve(true)),
    deleteCoupon: () => new Promise(resolve => resolve(true)),
    loginT1GuestCart: () => new Promise(resolve => resolve(true)),
    deletePoint: () => new Promise(resolve => resolve(true)),
    addGiftWrapMessage: () => new Promise(resolve => resolve(true)),
    deleteGiftWrapMessage: () => new Promise(resolve => resolve(true)),
    getCartGuest: () => new Promise(resolve => resolve(true)),
    getCartGuestTotals: () => new Promise(resolve => resolve(true)),
    restoreCartGuest: () => new Promise(resolve => resolve(true)),
    burnPoint: () => new Promise(resolve => resolve(true)),
  },
  cartId: {
    getCartByID: () => new Promise(resolve => resolve(true)),
    getShippingSlotInfoHdl: () => new Promise(resolve => resolve(true)),
    getCartTotalsByID: () => new Promise(resolve => resolve(true)),
  },
  admin: {
    restoreShippingAssignment: () => new Promise(resolve => resolve(true)),
  },
  product: {
    findBySku: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesSingle = {
  magento: {
    cart: mockDataSources.single,
    cartGuest: mockDataSources.cartGuest,
    cartId: mockDataSources.cartId,
    admin: mockDataSources.admin,
    product: mockDataSources.product,
  },
};

const dataSourcesMulti = {
  magento: {
    cart: mockDataSources.multi,
  },
};

jest.mock('../../dataSource/magento/MagentoDataSource.ts');

describe('Cart Resolver', () => {
  describe(`addCoupon`, () => {
    const addCoupon = CartResolver.Mutation.addCoupon as Function;

    it(`should return valid coupon on single coupon`, async () => {
      const coupon = 'COUPON_1';
      const couponResponse = await addCoupon(
        {},
        { coupon, isGuest: false },
        {
          dataSources: dataSourcesSingle,
        },
      );

      expect(couponResponse).toEqual({ message: 'success', valid_coupon: ['COUPON_1'], invalid_coupon: [] });
    });

    it(`should return valid coupon list on multiple coupon`, async () => {
      const coupon = 'COUPON_1,COUPON_2';
      const couponResponse = await addCoupon(
        {},
        { coupon, isGuest: false },
        {
          dataSources: dataSourcesMulti,
        },
      );

      expect(couponResponse).toEqual({
        message: 'success',
        valid_coupon: ['COUPON_1', 'COUPON_2'],
        invalid_coupon: [],
      });
    });

    it(`should return invalid coupon list on has invalid coupon`, async () => {
      const coupon = 'COUPON_1,COUPON_2,COUPON_3';
      const couponResponse = await addCoupon(
        {},
        { coupon, isGuest: false },
        {
          dataSources: dataSourcesMulti,
        },
      );

      expect(couponResponse).toEqual({
        message: 'success',
        valid_coupon: ['COUPON_1', 'COUPON_2'],
        invalid_coupon: ['COUPON_3'],
      });
    });

    it(`must be return error on has all invalid coupon`, async () => {
      const coupon = 'COUPON_3,COUPON_4';
      try {
        await addCoupon(
          {},
          { coupon, isGuest: false },
          {
            dataSources: dataSourcesMulti,
          },
        );
      } catch (e) {
        expect(e.message).toEqual('404');
      }
    });
  });

  describe(`storePickUp`, () => {
    const storePickUp = CartResolver.Query.storePickUp as Function;
    const magentoDataSource = new MagentoDataSource();

    const dataSources = {
      magento: magentoDataSource,
    };
    it('should return guest store list', async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'getStoreList').mockReturnValue(Promise.resolve({} as any));
      const response = await storePickUp({}, { isGuest: true, cartId: '1' }, { dataSources });
      expect(response).toEqual({});
    });

    it('should return guest store list with searchCondtion', async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'getStoreList').mockReturnValue(Promise.resolve({} as any));
      const filters = { page: 0, filters: [], sorters: [] };
      const response = await storePickUp({}, { isGuest: true, cartId: '1', filters }, { dataSources });
      expect(response).toEqual({});
    });

    it('should return guest store list with searchCondtion', async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'getStoreList').mockReturnValue(Promise.resolve({} as any));
      const filters = { page: 0, sorters: [] };
      const response = await storePickUp({}, { isGuest: true, cartId: '1', filters }, { dataSources });
      expect(response).toEqual({});
    });

    it('should return guest store list with searchCondtion', async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'getStoreList').mockReturnValue(Promise.resolve({} as any));
      const filters = { page: 0, filters: [] };
      const response = await storePickUp({}, { isGuest: true, cartId: '1', filters }, { dataSources });
      expect(response).toEqual({});
    });

    it('should return throw', async () => {
      const filters = { page: 0, filters: [] };
      expect(async () => {
        await storePickUp({}, { isGuest: true, filters }, { dataSources });
      }).rejects.toThrow();
    });

    it('should return customer store list with searchCondtion', async () => {
      jest.spyOn(dataSources.magento.cart, 'getStoreList').mockReturnValue(Promise.resolve({} as any));
      const filters = { page: 0, filters: [] };
      const response = await storePickUp({}, { isGuest: false, filters }, { dataSources, customerToken: '123' });
      expect(response).toEqual({});
    });

    it('should return throw', async () => {
      const filters = { page: 0, filters: [] };
      expect(async () => {
        await storePickUp({}, { isGuest: false, filters }, { dataSources });
      }).rejects.toThrow();
    });
  });

  describe(`deleteGiftWrapMessage`, () => {
    const deleteGiftWrapMessage = CartResolver.Mutation.deleteGiftWrapMessage as Function;
    const magentoDataSource = new MagentoDataSource();

    const dataSources = {
      magento: magentoDataSource,
    };
    it('should return true', async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'deleteGiftWrapMessage').mockReturnValue(Promise.resolve(true as any));
      const response = await deleteGiftWrapMessage({}, { input: { isGuest: true, cartId: '123' } }, { dataSources });
      expect(response).toEqual({ message: 'success' });
    });

    it('should return true', async () => {
      jest.spyOn(dataSources.magento.cart, 'deleteGiftWrapMessage').mockReturnValue(Promise.resolve(false as any));
      const response = await deleteGiftWrapMessage({}, { input: { isGuest: false } }, { dataSources });
      expect(response).toEqual({ message: 'error' });
    });
  });

  describe(`addGiftWrapMessage`, () => {
    const addGiftWrapMessage = CartResolver.Mutation.addGiftWrapMessage as Function;
    const magentoDataSource = new MagentoDataSource();

    const dataSources = {
      magento: magentoDataSource,
    };

    it('should return guest store list', async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'addGiftWrapMessage').mockReturnValue(Promise.resolve({} as any));
      const response = await addGiftWrapMessage(
        {},
        { input: { isGuest: true, cartId: '1', message: 'test' } },
        { dataSources },
      );
      expect(response).toEqual({ message: 'success' });
    });

    it('should return guest store list', async () => {
      jest.spyOn(dataSources.magento.cart, 'addGiftWrapMessage').mockReturnValue(Promise.resolve(null));
      const response = await addGiftWrapMessage(
        {},
        { input: { isGuest: false, cartId: '1', message: 'test' } },
        { dataSources },
      );
      expect(response).toEqual({ message: 'error' });
    });
  });

  describe('test query', () => {
    const queryCart = CartResolver.Query.cart as Function;
    const queryCartMini = CartResolver.Query.cartMini as Function;
    const queryShippingSlotInfoHdl = CartResolver.Query.shippingSlotInfoHdl as Function;

    const _source = {};
    const dataSources = dataSourcesSingle;
    const storeCode = 'cds_th';
    const bu = 'cds';
    const customerToken = '1';

    const isGuest = true;
    const cartId = '1';
    const address = '';

    it('Query cart should run properly with guest status', async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'getCartGuest').mockReturnValue(Promise.resolve({ items: ['1'] }));
      await queryCart(_source, { isGuest, cartId }, { dataSources, storeCode, bu, customerToken });
      expect(dataSources.magento.cartGuest.getCartGuest).toBeCalledWith(cartId, storeCode);
    });

    it('Query cart should run properly with not guest status', async () => {
      const isGuest = false;
      jest.spyOn(dataSources.magento.cart, 'getCartMine').mockReturnValue(Promise.resolve({ items: ['1'] }));
      await queryCart(_source, { isGuest, cartId }, { dataSources, storeCode, bu, customerToken });
      expect(dataSources.magento.cart.getCartMine).toBeCalledWith(storeCode);
    });

    it('Query cartMini should run properly with guest status', async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'getCartGuestMini').mockReturnValue(Promise.resolve({ items: ['1'] }));
      await queryCartMini(_source, { isGuest, cartId }, { dataSources, storeCode });
      expect(dataSources.magento.cartGuest.getCartGuestMini).toBeCalledWith(cartId);
    });

    it('Query cartMini should run properly with not guest status', async () => {
      const isGuest = false;
      jest.spyOn(dataSources.magento.cart, 'getCartMineMini').mockReturnValue(Promise.resolve({ items: ['1'] }));
      await queryCartMini(_source, { isGuest, cartId }, { dataSources, storeCode });
      expect(dataSources.magento.cart.getCartMineMini).toBeCalledWith();
    });

    it('Query shippingSlotInfoHdl should run properly with guest status', async () => {
      jest.spyOn(dataSources.magento.cartId, 'getShippingSlotInfoHdl').mockReturnValue(Promise.resolve([]));
      await queryShippingSlotInfoHdl(_source, { cartId, address }, { dataSources });
      expect(dataSources.magento.cartId.getShippingSlotInfoHdl).toBeCalledWith(address, cartId);
    });
  });

  describe('test mutation', () => {
    const mutationEditCartItem = CartResolver.Mutation.editCartItem as Function;
    const mutationAddCartItem = CartResolver.Mutation.addCartItem as Function;
    const mutationDeleteCartItem = CartResolver.Mutation.deleteCartItem as Function;
    const mutationDeleteCoupon = CartResolver.Mutation.deleteCoupon as Function;
    const mutationLoginT1 = CartResolver.Mutation.loginT1 as Function;
    const mutationBurnPoint = CartResolver.Mutation.burnPoint as Function;
    const mutationDeletePoint = CartResolver.Mutation.deletePoint as Function;
    const mutationDeleteGiftWrapMessage = CartResolver.Mutation.deleteGiftWrapMessage as Function;
    const mutationRestoreShippingAssignment = CartResolver.Mutation.restoreShippingAssignment as Function;

    const _source = {};
    const dataSources = dataSourcesSingle;
    const storeCode = 'cds_th';
    const bu = 'cds';
    const customerToken = '1';

    const id = 1;
    const isGuest = true;
    const guestToken = '1';
    const item_id = '1';
    const cartId = '1';
    const input = { quote_id: '1' };
    const points = '1';

    it('Mutation editCartItem should run properly with guest status', async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'editCartItem').mockReturnValue(Promise.resolve({ items: ['1'] }));
      await mutationEditCartItem(_source, { id, isGuest, item_id, input }, { dataSources });
      expect(dataSources.magento.cartGuest.editCartItem).toBeCalledWith(id, item_id, input);
    });

    it('Mutation editCartItem should run properly with not guest status', async () => {
      const isGuest = false;
      jest.spyOn(dataSources.magento.cart, 'editCartItem').mockReturnValue(Promise.resolve({ items: ['1'] }));
      await mutationEditCartItem(_source, { id, isGuest, item_id, input }, { dataSources });
      expect(dataSources.magento.cart.editCartItem).toBeCalledWith(item_id, input);
    });

    it('Mutation addCartItem should run properly with guest status', async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'addCartGuestItem').mockReturnValue(Promise.resolve({}));
      await mutationAddCartItem(_source, { isGuest, cartId, input }, { dataSources });
      expect(dataSources.magento.cartGuest.addCartGuestItem).toBeCalledWith(cartId, { quote_id: input.quote_id });
    });

    it('Mutation addCartItem should run properly with not guest status', async () => {
      const isGuest = false;
      const input = { quote_id: null };
      jest.spyOn(dataSources.magento.cart, 'addCartMineItem').mockReturnValue(Promise.resolve({}));
      await mutationAddCartItem(_source, { isGuest, cartId, input }, { dataSources });
      expect(dataSources.magento.cart.addCartMineItem).toBeCalledWith({ quote_id: undefined });
    });

    it('Mutation deleteCartItem should run properly with guest status', async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'deleteCartGuestItem').mockReturnValue(Promise.resolve({}));
      await mutationDeleteCartItem(_source, { guest: isGuest, item_id }, { dataSources });
      expect(dataSources.magento.cartGuest.deleteCartGuestItem).toBeCalledWith(isGuest, item_id);
    });

    it('Mutation deleteCartItem should run properly with not guest status', async () => {
      const isGuest = false;
      const customerToken = '1';
      jest.spyOn(dataSources.magento.cart, 'deleteCartMineItem').mockReturnValue(Promise.resolve({}));
      await mutationDeleteCartItem(_source, { guest: isGuest, item_id }, { dataSources, customerToken });
      expect(dataSources.magento.cart.deleteCartMineItem).toBeCalledWith(item_id);
    });

    it('Mutation deleteCoupon should run properly with guest status', async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'deleteCoupon').mockReturnValue(Promise.resolve({}));
      await mutationDeleteCoupon(_source, { isGuest, cartId }, { dataSources });
      expect(dataSources.magento.cartGuest.deleteCoupon).toBeCalledWith(cartId);
    });

    it('Mutation deleteCoupon should run properly with not guest status', async () => {
      const isGuest = false;
      jest.spyOn(dataSources.magento.cart, 'deleteCoupon').mockReturnValue(Promise.resolve({}));
      await mutationDeleteCoupon(_source, { isGuest, cartId }, { dataSources });
      expect(dataSources.magento.cart.deleteCoupon).toBeCalledWith();
    });

    it('Mutation loginT1 should run properly with guest status', async () => {
      const input = {
        quote_id: '1',
        email: 'test@mail.com',
        password: '1234',
      };
      const { email, password } = input;
      jest.spyOn(dataSources.magento.cartGuest, 'loginT1GuestCart').mockReturnValue(Promise.resolve({}));
      await mutationLoginT1(_source, { input, isGuest, guestToken }, { dataSources });
      expect(dataSources.magento.cartGuest.loginT1GuestCart).toBeCalledWith(guestToken, { email, password });
    });

    it('Mutation loginT1 should run properly with not guest status', async () => {
      const isGuest = false;
      const input = {
        quote_id: '1',
        email: 'test@mail.com',
        password: '1234',
      };
      const { email, password } = input;
      jest.spyOn(dataSources.magento.cartGuest, 'loginT1GuestCart').mockReturnValue(Promise.resolve({}));
      await mutationLoginT1(_source, { input, isGuest, guestToken }, { dataSources });
      expect(dataSources.magento.cartGuest.loginT1GuestCart).toBeCalledWith(guestToken, { email, password });
    });

    it('Mutation burnPoint should run properly with guest status', async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'burnPoint').mockReturnValue(Promise.resolve({}));
      await mutationBurnPoint(_source, { points, isGuest, cartId }, { dataSources, storeCode });
      expect(dataSources.magento.cartGuest.burnPoint).toBeCalledWith(points, cartId, storeCode);
    });

    it('Mutation burnPoint should run properly with guest status', async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'burnPoint').mockReturnValue(Promise.resolve(null));
      const response = await mutationBurnPoint(_source, { points, isGuest, cartId }, { dataSources, storeCode });
      expect(dataSources.magento.cartGuest.burnPoint).toBeCalledWith(points, cartId, storeCode);
      expect(response).toEqual({ message: undefined, all_item_applied_t1c_rule: false });
    });

    it('Mutation burnPoint should run properly with not guest status', async () => {
      const isGuest = false;
      jest.spyOn(dataSources.magento.cart, 'burnPoint').mockReturnValue(Promise.resolve({}));
      await mutationBurnPoint(_source, { points, isGuest, cartId }, { dataSources, storeCode });
      expect(dataSources.magento.cart.burnPoint).toBeCalledWith(points, storeCode);
    });

    it('Mutation burnPoint should run properly with not guest status', async () => {
      const isGuest = false;
      jest.spyOn(dataSources.magento.cart, 'burnPoint').mockReturnValue(Promise.resolve({ message: 'test' }));
      const response = await mutationBurnPoint(_source, { points, isGuest, cartId }, { dataSources, storeCode });
      expect(dataSources.magento.cart.burnPoint).toBeCalledWith(points, storeCode);
      expect(response).toEqual({ message: 'test', all_item_applied_t1c_rule: false });
    });

    it('Mutation deletePoint should run properly with guest status', async () => {
      jest.spyOn(dataSources.magento.cartGuest, 'deletePoint').mockReturnValue(Promise.resolve({}));
      await mutationDeletePoint(_source, { isGuest, cartId }, { dataSources });
      expect(dataSources.magento.cartGuest.deletePoint).toBeCalledWith(cartId);
    });

    it('Mutation deletePoint should run properly with not guest status', async () => {
      const isGuest = false;
      jest.spyOn(dataSources.magento.cart, 'deletePoint').mockReturnValue(Promise.resolve({}));
      await mutationDeletePoint(_source, { isGuest, cartId }, { dataSources });
      expect(dataSources.magento.cart.deletePoint).toBeCalledWith();
    });

    it('Mutation deleteGiftWrapMessage should run properly with guest status', async () => {
      const input = { isGuest: true };
      jest.spyOn(dataSources.magento.cartGuest, 'deleteGiftWrapMessage').mockReturnValue(Promise.resolve({}));
      await mutationDeleteGiftWrapMessage(_source, { input }, { dataSources });
      expect(dataSources.magento.cartGuest.deleteGiftWrapMessage).toBeCalledWith(undefined);
    });

    it('Mutation deleteGiftWrapMessage should run properly with not guest status', async () => {
      const input = { isGuest: false };
      jest.spyOn(dataSources.magento.cart, 'deleteGiftWrapMessage').mockReturnValue(Promise.resolve({}));
      await mutationDeleteGiftWrapMessage(_source, { input }, { dataSources });
      expect(dataSources.magento.cart.deleteGiftWrapMessage).toBeCalledWith();
    });

    it('Mutation restoreShippingAssignment should run properly with guest status', async () => {
      const input = { cartId: '1' };
      jest.spyOn(dataSources.magento.admin, 'restoreShippingAssignment').mockReturnValue(Promise.resolve({}));
      await mutationRestoreShippingAssignment(_source, { input }, { dataSources });
      expect(dataSources.magento.admin.restoreShippingAssignment).toBeCalledWith(input.cartId);
    });
  });

  describe('test CartItem', () => {
    const cartItemProduct = CartResolver.CartItem.product as Function;
    const cartItemTotalPrice = CartResolver.CartItem.total_price as Function;

    const _source = { sku: '1' };
    const dataSources = dataSourcesSingle;
    const storeCode = 'cds_th';

    it('product should run properly ', async () => {
      jest.spyOn(dataSources.magento.product, 'findBySku').mockReturnValue(Promise.resolve({ items: ['1'] }));
      await cartItemProduct(_source, {}, { dataSources, storeCode });
      expect(dataSources.magento.product.findBySku).toBeCalledWith({ storeCode, sku: _source.sku });
    });

    it('total_price should run properly', async () => {
      const result = await cartItemTotalPrice({ row_total_incl_tax: 2, discount_amount: 1 });
      expect(result).toEqual(1);
    });
  });
});
