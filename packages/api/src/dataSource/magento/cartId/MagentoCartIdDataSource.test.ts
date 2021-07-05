import { MagentoCartIdDataSource } from './MagentoCartIdDataSource';

class MagentoCartIdDataSourceTest extends MagentoCartIdDataSource {
  get() {
    return jest.fn() as any;
  }
  post() {
    return jest.fn() as any;
  }
  put() {
    return jest.fn() as any;
  }
  delete() {
    return jest.fn() as any;
  }
}

describe('MagentoCartIdDataSource', () => {
  const magentoCartId = new MagentoCartIdDataSourceTest();

  describe(`cartId`, () => {
    const storeCode = 'cds_th';
    const params = null;
    const init = { cacheOptions: { ttl: 0 } };

    it(`createCartMine should run properly`, async () => {
      const path = `/${storeCode}/V1/carts/mine`;
      jest.spyOn(magentoCartId, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartId.createCartMine(storeCode);
      expect(magentoCartId.post).toBeCalledWith(path);
    });

    it(`getCartByID should run properly`, async () => {
      const cartId = '1';
      const path = `${storeCode}/V1/carts/${cartId}`;
      jest.spyOn(magentoCartId, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartId.getCartByID(storeCode, cartId);
      expect(magentoCartId.get).toBeCalledWith(path, params, init);
    });

    it(`getCartTotalsByID should run properly`, async () => {
      const cartId = '1';
      const path = `${storeCode}/V1/carts/${cartId}/totals`;
      jest.spyOn(magentoCartId, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartId.getCartTotalsByID(storeCode, cartId);
      expect(magentoCartId.get).toBeCalledWith(path, params, init);
    });

    it(`getPaymentInformation should run properly`, async () => {
      const cartId = '1';
      jest.spyOn(magentoCartId, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartId.getPaymentInformation(storeCode, cartId);
      expect(magentoCartId.get).toBeCalled();
    });

    it(`getPaymentInformationOFM should run properly`, async () => {
      const cartId = '1';
      jest.spyOn(magentoCartId, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartId.getPaymentInformationOFM(storeCode, cartId);
      expect(magentoCartId.get).toBeCalled();
    });

    it(`deleteCartMineItem should run properly`, async () => {
      const itemId = '1';
      const path = `/V1/carts/mine/items/${itemId}`;
      jest.spyOn(magentoCartId, 'delete').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartId.deleteCartMineItem(itemId);
      expect(magentoCartId.delete).toBeCalledWith(path);
    });

    it(`editCartItem should run properly`, async () => {
      const itemId = '1';
      const cartItem = [];
      const path = `/V1/carts/mine/items/${itemId}`;
      jest.spyOn(magentoCartId, 'put').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartId.editCartItem(itemId, cartItem);
      expect(magentoCartId.put).toBeCalledWith(path, { cartItem });
    });

    it(`addCartMineItem should run properly`, async () => {
      const cartItem = [];
      const path = `/V1/carts/mine/items/`;
      jest.spyOn(magentoCartId, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartId.addCartMineItem(cartItem);
      expect(magentoCartId.post).toBeCalledWith(path, { cartItem });
    });

    it(`estimateShippingMethods should run properly`, async () => {
      const address = '';
      const cartId = '1';
      const path = `/${storeCode}/V1/carts/${cartId}/estimate-shipping-methods`;
      jest.spyOn(magentoCartId, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartId.estimateShippingMethods(address, cartId, storeCode);
      expect(magentoCartId.post).toBeCalledWith(path, { address });
    });

    it(`getShippingSlotInfoHdl should run properly`, async () => {
      const address = '';
      const cartId = '1';
      const path = `/V1/carts/${cartId}/shipping-slot-hdl/slot-info`;
      jest.spyOn(magentoCartId, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartId.getShippingSlotInfoHdl(address, cartId);
      expect(magentoCartId.post).toBeCalledWith(path, { address });
    });

    it(`setShippingInformation should run properly`, async () => {
      const addressInformation = '';
      const cartId = '1';
      const path = `/V1/carts/${cartId}/shipping-information`;
      jest.spyOn(magentoCartId, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartId.setShippingInformation(addressInformation, cartId);
      expect(magentoCartId.post).toBeCalledWith(path, { addressInformation });
    });

    it(`setShippingSlotHdl should run properly`, async () => {
      const slot = '';
      const cartId = '1';
      const path = `/V1/carts/${cartId}/shipping-slot-hdl/book`;
      jest.spyOn(magentoCartId, 'put').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartId.setShippingSlotHdl(slot, cartId);
      expect(magentoCartId.put).toBeCalledWith(path, { slot });
    });

    it(`setPaymentInformation should run properly`, async () => {
      magentoCartId.initialize({
        context: {
          headers: {},
          client: '1',
        },
      });
      const paymentInfo = {};
      const cartId = '1';
      const path = `/${storeCode}/V1/carts/${cartId}/payment-information`;
      jest.spyOn(magentoCartId, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartId.setPaymentInformation(paymentInfo, cartId, storeCode);
      expect(magentoCartId.post).toBeCalled();
    });

    it(`addCoupon should run properly`, async () => {
      const coupon = '1';
      const path = `/V1/carts/mine/coupons/${coupon}`;
      jest.spyOn(magentoCartId, 'put').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartId.addCoupon(coupon);
      expect(magentoCartId.put).toBeCalledWith(path);
    });

    it(`deleteCoupon should run properly`, async () => {
      const path = `/V1/carts/mine/coupons`;
      jest.spyOn(magentoCartId, 'delete').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartId.deleteCoupon();
      expect(magentoCartId.delete).toBeCalledWith(path, null);
    });

    it(`updatePaymentInformation should run properly`, async () => {
      const paymentInfo = '1';
      const cartId = '1';
      const path = `/${storeCode}/V1/carts/${cartId}/set-payment-information`;
      jest.spyOn(magentoCartId, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartId.updatePaymentInformation(paymentInfo, cartId, storeCode);
      expect(magentoCartId.post).toBeCalledWith(path, paymentInfo);
    });

    it(`updateMultiplePaymentInformation should run properly`, async () => {
      const paymentInfo = '1';
      const path = `/${storeCode}/V1/carts/set-multiple-payment-information`;
      jest.spyOn(magentoCartId, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartId.updateMultiplePaymentInformation(paymentInfo, storeCode);
      expect(magentoCartId.post).toBeCalledWith(path, paymentInfo);
    });
  });
});
