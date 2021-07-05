import { MagentoCartDataSource } from './MagentoCartDataSource';
import { IPayloadGetStoreListFilter } from '../../../schema/cart/cartResolverType';
import { Headers } from 'apollo-server-env';
import config from '../../../../src/configs/vars';
import axios from 'axios';

jest.mock('../../../../src/configs/vars');
jest.mock('axios');

class MagentoCartDataSourceTest extends MagentoCartDataSource {
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
  addRequestUsage(request, response, responseBody = null) {
    return jest.fn() as any;
  }
}

afterEach(() => {
  jest.clearAllMocks();
});

describe('MagentoCartDataSource', () => {
  const magentoCart = new MagentoCartDataSourceTest();

  describe(`estimateShippingMethodsV4`, () => {
    const storeCode = 'cds_th';

    it(`should call estimateShippingMethodsV4 with expect params`, async () => {
      const path = `/${storeCode}/V4/carts/mine/estimate-shipping-methods`;
      const address = {};

      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve([]) as any);

      await magentoCart.estimateShippingMethodsV4(address, storeCode);
      expect(magentoCart.post).toBeCalledWith(path, { address });
    });
  });

  describe(`setValidatePin`, () => {
    const storeCode = 'cds_th';

    it(`should call setValidatePin with expect params`, async () => {
      const path = `${storeCode}/V1/carts/mine/validate-pin`;
      const pinInfo = {};

      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve([]) as any);

      await magentoCart.setValidatePin(storeCode, pinInfo);
      expect(magentoCart.post).toBeCalledWith(path, { ...pinInfo });
    });
  });

  describe(`Replace Multi`, () => {
    const storeCode = '';
    it('replaceMulti', async () => {
      const path = `${storeCode}/V1/carts/mine/replaceMulti`;
      const replaceCartArg = [
        { sku: 'CDS1', qty: 2 },
        { sku: 'CDS2', qty: 1 },
        { sku: 'CDS3', qty: 1 },
      ];
      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve([]) as any);
      await magentoCart.replaceCartItem(replaceCartArg);
      expect(magentoCart.post).toBeCalledWith(path, {
        cartItems: replaceCartArg,
      });
    });
  });

  describe(`Clear Address`, () => {
    const storeCode = '';
    it('clear billing address', async () => {
      const path = `${storeCode}/V1/carts/mine/billing-address`;

      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve([]) as any);
      await magentoCart.clearBillingAddress(1);
      expect(magentoCart.post).toBeCalledWith(path, { address: {}, cartId: 1 });
    });
  });

  describe(`getStoreList`, () => {
    it('get store list customer', async () => {
      const storeCode = 'cds_th';
      const path = `/${storeCode}/V1/carts/mine/get-pickup-locations`;

      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve([]) as any);
      const response = await magentoCart.getStoreList({} as IPayloadGetStoreListFilter, storeCode);
      expect(magentoCart.post).toBeCalledWith(path, {} as IPayloadGetStoreListFilter, { cacheOptions: { ttl: 0 } });
      expect(response).toEqual([]);
    });
  });

  describe(`deleteGiftWrapMessage`, () => {
    it('deleteGiftWrapMessage customer', async () => {
      const path = `/V1/carts/mine/gift-message`;
      const body = {
        gift_message: {
          extension_attributes: {
            wrapping_id: null,
          },
        },
        message: null,
      };
      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve(true) as any);
      const response = await magentoCart.deleteGiftWrapMessage();
      expect(magentoCart.post).toBeCalledWith(path, body);
      expect(response).toEqual(true);
    });
  });

  describe(`addGiftWrapMessage`, () => {
    it('addGiftWrapMessage customer', async () => {
      const path = `/V1/carts/mine/gift-message`;

      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve(true) as any);
      const response = await magentoCart.addGiftWrapMessage('test');
      expect(magentoCart.post).toBeCalledWith(path, {
        gift_message: {
          message: 'test',
          extension_attributes: {
            wrapping_id: 1,
          },
        },
      });
      expect(response).toEqual(true);
    });
  });

  describe(`cartDataSource`, () => {
    const storeCode = 'cds_th';
    const params = null;
    const init = { cacheOptions: { ttl: 0 } };

    it('willSendRequest should run properly', async () => {
      magentoCart.initialize({
        context: {
          customerToken: '1',
        },
      });
      const request = {
        headers: {
          set: jest.fn((name, value) => (request.headers[name] = value)),
          has: jest.fn((name, value) => (request.headers[name] = value)),
        },
      };
      magentoCart.willSendRequest(request);
      expect(request.headers.set).toBeCalled();
    });

    it(`createCartMine should run properly`, async () => {
      const userToken = null;
      const path = `/${storeCode}/V1/carts/mine`;
      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.createCartMine(userToken, storeCode);
      expect(magentoCart.post).toBeCalledWith(path);
    });

    it(`createCartMine should run properly with userToken`, async () => {
      magentoCart.initialize({
        context: {
          customerToken: '',
        },
      });
      const userToken = '1';
      const path = `/${storeCode}/V1/carts/mine`;
      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.createCartMine(userToken, storeCode);
      expect(magentoCart.post).toBeCalledWith(path);
    });

    it(`getCartMine should run properly`, async () => {
      const path = `${storeCode}/V1/carts/mine`;
      jest.spyOn(magentoCart, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.getCartMine(storeCode);
      expect(magentoCart.get).toBeCalledWith(path, params, init);
    });

    it(`getCartMineMini should run properly`, async () => {
      const path = `/V1/cart/mine/mini`;
      jest.spyOn(magentoCart, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.getCartMineMini();
      expect(magentoCart.get).toBeCalledWith(path, params, init);
    });

    it(`getCartMineTotals should run properly`, async () => {
      const path = `${storeCode}/V1/carts/mine/totals`;
      jest.spyOn(magentoCart, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.getCartMineTotals(storeCode);
      expect(magentoCart.get).toBeCalledWith(path, params, init);
    });

    it(`getGiftMessage should run properly`, async () => {
      const path = `${storeCode}/V1/carts/mine/gift-message`;
      jest.spyOn(magentoCart, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.getGiftMessage(storeCode);
      expect(magentoCart.get).toBeCalledWith(path, params, init);
    });

    it(`getPaymentInformation should run properly`, async () => {
      const path = `/${storeCode}/V1/carts/mine/payment-information`;
      jest.spyOn(magentoCart, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.getPaymentInformation(storeCode);
      expect(magentoCart.get).toBeCalledWith(path, params, init);
    });

    it(`getPaymentInformationOFM should run properly`, async () => {
      const company_id = 1;
      const path = `/${storeCode}/V1/carts/mine/payment-information?company_id=${company_id}`;
      jest.spyOn(magentoCart, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.getPaymentInformationOFM(storeCode, company_id);
      expect(magentoCart.get).toBeCalledWith(path, params, init);
    });

    it(`getPackageOptions should run properly`, async () => {
      const storeId = '1';
      const path = `/${storeCode}/V1/carts/mine/package-options`;
      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.getPackageOptions(storeCode, storeId);
      expect(magentoCart.post).toBeCalledWith(path, { storeId });
    });

    it(`getDeliveryPackageOptions should run properly`, async () => {
      const input = {};
      const path = `/${storeCode}/V1/carts/mine/delivery-package-options`;
      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.getDeliveryPackageOptions(storeCode, input);
      expect(magentoCart.post).toBeCalledWith(path, input);
    });

    it(`deleteCartMineItem should run properly`, async () => {
      const itemId = '1';
      const path = `/V1/carts/mine/items/${itemId}`;
      jest.spyOn(magentoCart, 'delete').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.deleteCartMineItem(itemId);
      expect(magentoCart.delete).toBeCalledWith(path);
    });

    it(`editCartItem should run properly`, async () => {
      const itemId = '1';
      const cartItem = {};
      const path = `/V1/carts/mine/items/${itemId}`;
      jest.spyOn(magentoCart, 'put').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.editCartItem(itemId, cartItem);
      expect(magentoCart.put).toBeCalledWith(path, { cartItem });
    });

    it(`addCartMineItem should run properly`, async () => {
      const cartItem = {};
      const path = `/V1/carts/mine/items/`;
      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.addCartMineItem(cartItem);
      expect(magentoCart.post).toBeCalledWith(path, { cartItem });
    });

    it(`deleteGiftWrapMessage should run properly`, async () => {
      const path = `/V1/carts/mine/gift-message`;
      const params = {
        message: null,
        gift_message: {
          extension_attributes: {
            wrapping_id: null,
          },
        },
      };
      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.deleteGiftWrapMessage();
      expect(magentoCart.post).toBeCalledWith(path, params);
    });

    it(`estimateShippingMethods should run properly`, async () => {
      const address = {};
      const path = `/${storeCode}/V1/carts/mine/estimate-shipping-methods`;
      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.estimateShippingMethods(address, storeCode);
      expect(magentoCart.post).toBeCalledWith(path, { address });
    });

    it(`estimateShippingMethodsV3 should run properly`, async () => {
      const address = {};
      const path = `/${storeCode}/V3/carts/mine/estimate-shipping-methods`;
      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.estimateShippingMethodsV3(address, storeCode);
      expect(magentoCart.post).toBeCalledWith(path, { address });
    });

    it(`setShippingInformation should run properly`, async () => {
      const addressInformation = {};
      const path = `/V1/carts/mine/shipping-information`;
      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.setShippingInformation(addressInformation);
      expect(magentoCart.post).toBeCalledWith(path, { addressInformation });
    });

    it(`setShippingSlotHdl should run properly`, async () => {
      const slot = {};
      const path = `/V1/carts/mine/shipping-slot-hdl/book`;
      jest.spyOn(magentoCart, 'put').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.setShippingSlotHdl(slot);
      expect(magentoCart.put).toBeCalledWith(path, { slot });
    });

    it(`addCoupon should run properly`, async () => {
      const coupon = {};
      const path = `/V1/carts/mine/coupons/${coupon}`;
      jest.spyOn(magentoCart, 'put').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.addCoupon(coupon);
      expect(magentoCart.put).toBeCalledWith(path);
    });

    it(`deleteCoupon should run properly`, async () => {
      const path = `/V1/carts/mine/coupons`;
      jest.spyOn(magentoCart, 'delete').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.deleteCoupon();
      expect(magentoCart.delete).toBeCalledWith(path, params);
    });

    it(`updatePaymentInformation should run properly`, async () => {
      const paymentInfo = {};
      const path = `/${storeCode}/V1/carts/mine/set-payment-information`;
      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.updatePaymentInformation(paymentInfo, storeCode);
      expect(magentoCart.post).toBeCalledWith(path, paymentInfo);
    });

    it(`updateStore should run properly`, async () => {
      const input = {
        updateData: {
          cart_id: '',
          quote_item_group: '',
          extension_attributes: {
            allocated_store_id: null,
          },
        },
      };
      const { updateData } = input;
      const { quote_item_group } = updateData;
      const path = `/${storeCode}/V1/carts/mine/item-group/${quote_item_group}`;
      jest.spyOn(magentoCart, 'put').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.updateStore(input, storeCode);
      expect(magentoCart.put).toBeCalledWith(path, { updateData: input.updateData });
    });

    it(`mergeGuestCart should run properly`, async () => {
      magentoCart.initialize({
        context: {
          customerToken: '',
        },
      });
      const customerToken = '1';
      const maskedQuoteId = '2';
      const path = `/V1/carts/merge`;
      const params = { masked_quote_id: maskedQuoteId };
      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.mergeGuestCart(customerToken, maskedQuoteId);
      expect(magentoCart.post).toBeCalledWith(path, params);
    });

    it(`loginT1 should run properly`, async () => {
      const body = {};
      const path = `/V1/carts/mine/t1c/balance`;
      jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.loginT1(body);
      expect(magentoCart.post).toBeCalledWith(path, body);
    });

    it(`burnPoint should run properly`, async () => {
      const points = 40;
      const path = `${storeCode}/V1/carts/mine/t1c`;
      jest.spyOn(magentoCart, 'put').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.burnPoint(points, storeCode);
      expect(magentoCart.put).toBeCalledWith(path, { points });
    });


    it(`burnPoint should run with t1 token`, async () => {
      const points = 40;
      const path = `${storeCode}/V1/carts/mine/t1c`;
      const t1Token = `MOCK TOKEN`;
      const init = {
        headers: {
          'x-authorization-key': t1Token,
        },
      };

      jest.spyOn(magentoCart, 'put').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.burnPoint(points, storeCode, t1Token);
      expect(magentoCart.put).toBeCalledWith(path, { points }, init);
    });

    it(`deletePoint should run properly`, async () => {
      const path = `/V1/carts/mine/t1c`;
      jest.spyOn(magentoCart, 'delete').mockReturnValue(Promise.resolve({}) as any);
      await magentoCart.deletePoint();
      expect(magentoCart.delete).toBeCalledWith(path);
    });
  });

  it(`setPaymentInformation with headers should run properly`, async () => {
    magentoCart.initialize({
      context: {
        client: 'client',
        requestId: 'request-id',
        deviceId: 'device-id',
        headers: {
          'user-agent': 'user-agent',
          'app-version': 'app-version',
          os: 'os',
          'os-version': 'os-verion',
          'track-sku': 'sku1,sku2',
        },
        requestUsage: [],
        requestUsageResponseEnable: true,
      },
    });
    const mockResponse = {
      statusText: 'success',
      status: 200,
      data: 'result',
    };

    const paymentInfo = {},
      storeCode = 'th';
    jest.spyOn(axios, 'default' as any).mockResolvedValue(mockResponse);

    const path = `/${storeCode}/V1/guest-carts/mine/payment-information`;
    const fullPath = `${config.magento.base_url}` + path;
    const mockRequest = {
      url: fullPath,
      method: 'POST',
      headers: new Headers({}),
      body: paymentInfo,
    };
    jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve({}) as any);
    await magentoCart.setPaymentInformation(paymentInfo, storeCode);
    expect(function () {
      magentoCart.addRequestUsage(mockRequest, mockResponse);
    }).not.toThrow();
  });

  it(`setPaymentInformation without headers should run properly`, async () => {
    magentoCart.initialize({
      context: {
        client: 'client',
        requestId: 'request-id',
        deviceId: 'device-id',
        headers: {},
        requestUsage: [],
        requestUsageResponseEnable: true,
      },
    });
    const mockResponse = {
      statusText: 'success',
      status: 200,
      data: 'result',
    };

    const paymentInfo = {},
      storeCode = 'th';
    jest.spyOn(axios, 'default' as any).mockResolvedValue(mockResponse);

    const path = `/${storeCode}/V1/guest-carts/mine/payment-information`;
    const fullPath = `${config.magento.base_url}` + path;
    const mockRequest = {
      url: fullPath,
      method: 'POST',
      headers: new Headers({}),
      body: paymentInfo,
    };
    jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve({}) as any);
    await magentoCart.setPaymentInformation(paymentInfo, storeCode);
    expect(function () {
      magentoCart.addRequestUsage(mockRequest, mockResponse);
    }).not.toThrow();
  });


  it('t1RedeemInitiate', async () => {
    const token = '123';
    const points = 400;
    const path = `/V1/t1p2/point/redemption/initiate`;
    const body = {
      points
    };
    const headers = { ["x-authorization-key"]: token };

    jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve(true) as any);
    const response = await magentoCart.t1RedeemInitiate(token, points);
    expect(magentoCart.post).toBeCalledWith(path, body, { headers });
    expect(response).toEqual(true);
  });

  it('t1RedeemVerify', async () => {
    const token = '1234';
    const value = '12345';
    const points = 40;
    const requestID = 'REQUEST_MOCK';
    const path = `/V1/t1p2/point/redemption/verify`;
    const body = {
      value,
      requestID,
      points
    };
    const headers = { ["x-authorization-key"]: token };

    jest.spyOn(magentoCart, 'post').mockReturnValue(Promise.resolve(true) as any);
    const response = await magentoCart.t1RedeemVerify(points, token, value, requestID);
    expect(magentoCart.post).toBeCalledWith(path, body, { headers });
    expect(response).toEqual(true);
  });

});
