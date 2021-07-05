import { MagentoCartGuestDataSource } from './MagentoCartGuestDataSource';
import { IPayloadGetStoreListFilter } from '../../../schema/cart/cartResolverType';
import { Headers } from 'apollo-server-env';
import config from '../../../../src/configs/vars';
import axios from 'axios';

jest.mock('../../../../src/configs/vars');
jest.mock('axios');


afterEach(() => {
  jest.clearAllMocks();
});

class MagentoCartGuestDataSourceTest extends MagentoCartGuestDataSource {
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

describe('MagentoCartGuestDataSource', () => {
  const magentoCartGuest = new MagentoCartGuestDataSourceTest();

  describe(`estimateShippingMethodsV4`, () => {
    const storeCode = 'cds_th';

    it(`should call estimateShippingMethodsV4 with expect params`, async () => {
      const cartId = '1234';
      const path = `/${storeCode}/V4/guest-carts/${cartId}/estimate-shipping-methods`;
      const address = {};

      jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve([]) as any);

      await magentoCartGuest.estimateShippingMethodsV4(address, cartId, storeCode);
      expect(magentoCartGuest.post).toBeCalledWith(path, { address });
    });
  });

  describe(`setValidatePin`, () => {
    const storeCode = 'cds_th';
    const cartId = '1234';

    it(`should call setValidatePin with expect params`, async () => {
      const path = `${storeCode}/V1/guest-carts/${cartId}/validate-pin`;
      const pinInfo = {};

      jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve([]) as any);

      await magentoCartGuest.setValidatePin(storeCode, cartId, pinInfo);
      expect(magentoCartGuest.post).toBeCalledWith(path, { ...pinInfo });
    });
  });

  describe(`getStoreList`, () => {
    const cartId = '1234';

    it(`should call getStoreList with expect params`, async () => {
      const storeCode = 'cds_th';
      const path = `/${storeCode}/V1/guest-carts/${cartId}/get-pickup-locations`;

      jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve([]) as any);

      const response = await magentoCartGuest.getStoreList(cartId, {} as IPayloadGetStoreListFilter, storeCode);
      expect(magentoCartGuest.post).toBeCalledWith(path, {} as IPayloadGetStoreListFilter, {
        cacheOptions: { ttl: 0 },
      });
      expect(response).toEqual([]);
    });
  });

  describe(`deleteGiftWrapMessage`, () => {
    it('deleteGiftWrapMessage guest', async () => {
      const cartId = '123';
      const path = `/V1/guest-carts/${cartId}/gift-message`;
      const body = {
        gift_message: {
          extension_attributes: {
            wrapping_id: null,
          },
        },
        message: null,
      };
      jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve(true) as any);
      const response = await magentoCartGuest.deleteGiftWrapMessage(cartId);
      expect(magentoCartGuest.post).toBeCalledWith(path, body);
      expect(response).toEqual(true);
    });
  });

  describe(`addGiftWrapMessage`, () => {
    it('addGiftWrapMessage guest', async () => {
      const cartId = '123';
      const path = `/V1/guest-carts/${cartId}/gift-message`;

      jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve(true) as any);
      const response = await magentoCartGuest.addGiftWrapMessage(cartId, 'test');
      expect(magentoCartGuest.post).toBeCalledWith(path, {
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

  describe(`cartGuestDataSource`, () => {
    const storeCode = 'cds_th';
    const params = null;
    const init = { cacheOptions: { ttl: 0 } };

    it('willSendRequest should run properly', async () => {
      magentoCartGuest.initialize({
        context: {
          customerToken: '1',
        },
      });
      const request = {
        headers: {
          set: jest.fn((name, value) => (request.headers[name] = value)),
          has: jest.fn((name, value) => (request.headers[name] = value)),
          delete: jest.fn((name, value) => (request.headers[name] = value)),
        },
      };
      magentoCartGuest.willSendRequest(request);
      expect(request.headers.set).toBeCalled();
    });

    it(`getCartGuestMini should run properly`, async () => {
      const guestId = '1';
      const path = `/V1/guest-carts/${guestId}/mini`;
      jest.spyOn(magentoCartGuest, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.getCartGuestMini(guestId);
      expect(magentoCartGuest.get).toBeCalledWith(path, params, init);
    });

    it(`createCartGuest should run properly`, async () => {
      const path = `${storeCode}/V1/guest-carts`;
      jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.createCartGuest(storeCode);
      expect(magentoCartGuest.post).toBeCalledWith(path);
    });

    it(`restoreCartGuest should run properly`, async () => {
      const cartId = '1';
      const path = `/${storeCode}/V1/carts/${cartId}/getNext`;
      jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.restoreCartGuest(storeCode, cartId);
      expect(magentoCartGuest.post).toBeCalledWith(path);
    });

    it(`getCartGuest should run properly`, async () => {
      const guestId = '1';
      const path = `${storeCode}/V1/guest-carts/${guestId}`;
      jest.spyOn(magentoCartGuest, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.getCartGuest(guestId, storeCode);
      expect(magentoCartGuest.get).toBeCalledWith(path, params, init);
    });

    it(`getCartGuestTotals should run properly`, async () => {
      const guestId = '1';
      const path = `${storeCode}/V1/guest-carts/${guestId}/totals`;
      jest.spyOn(magentoCartGuest, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.getCartGuestTotals(guestId, storeCode);
      expect(magentoCartGuest.get).toBeCalledWith(path, params, init);
    });

    it(`getGiftMessage should run properly`, async () => {
      const guestId = '1';
      const path = `${storeCode}/V1/guest-carts/${guestId}/gift-message`;
      jest.spyOn(magentoCartGuest, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.getGiftMessage(guestId, storeCode);
      expect(magentoCartGuest.get).toBeCalledWith(path, params, init);
    });

    it(`getPaymentInformation should run properly`, async () => {
      const guestId = '1';
      const path = `/${storeCode}/V1/guest-carts/${guestId}/payment-information`;
      jest.spyOn(magentoCartGuest, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.getPaymentInformation(guestId, storeCode);
      expect(magentoCartGuest.get).toBeCalledWith(path, params, init);
    });

    it(`getPaymentInformationOFM should run properly`, async () => {
      const guestId = '1';
      const company_id = 1;
      const path = `/${storeCode}/V1/guest-carts/${guestId}/payment-information?company_id=${company_id}`;
      jest.spyOn(magentoCartGuest, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.getPaymentInformationOFM(guestId, storeCode, company_id);
      expect(magentoCartGuest.get).toBeCalledWith(path, params, init);
    });

    it(`getPackageOptions should run properly`, async () => {
      const storeId = '1';
      const cartId = '1';
      const path = `/${storeCode}/V1/guest-carts/${cartId}/package-options`;
      jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.getPackageOptions(storeCode, storeId, cartId);
      expect(magentoCartGuest.post).toBeCalled();
    });

    it(`getDeliveryPackageOptions should run properly`, async () => {
      const input = {};
      const cartId = '1';
      const path = `/${storeCode}/V1/guest-carts/${cartId}/delivery-package-options`;
      jest.spyOn(magentoCartGuest, 'get').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.getDeliveryPackageOptions(storeCode, input, cartId);
      expect(magentoCartGuest.post).toBeCalledWith(path, input);
    });

    it(`deleteCartGuestItem should run properly`, async () => {
      const guestId = '1';
      const itemId = '1';
      const path = `/V1/guest-carts/${guestId}/items/${itemId}`;
      jest.spyOn(magentoCartGuest, 'delete').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.deleteCartGuestItem(guestId, itemId);
      expect(magentoCartGuest.delete).toBeCalledWith(path);
    });

    it(`editCartItem should run properly`, async () => {
      const guestId = '1';
      const itemId = '1';
      const cartItem = {};
      const path = `/V1/guest-carts/${guestId}/items/${itemId}`;
      jest.spyOn(magentoCartGuest, 'put').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.editCartItem(guestId, itemId, cartItem);
      expect(magentoCartGuest.put).toBeCalledWith(path, { cartItem });
    });

    it(`addCartGuestItem should run properly`, async () => {
      const guestId = '1';
      const cartItem = {};
      const path = `/V1/guest-carts/${guestId}/items/`;
      jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.addCartGuestItem(guestId, cartItem);
      expect(magentoCartGuest.post).toBeCalled();
    });

    it(`deleteGiftWrapMessage should run properly`, async () => {
      const cartId = '1';
      const params = {
        message: null,
        gift_message: {
          extension_attributes: {
            wrapping_id: null,
          },
        },
      };
      const path = `/V1/guest-carts/${cartId}/gift-message`;
      jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.deleteGiftWrapMessage(cartId);
      expect(magentoCartGuest.post).toBeCalledWith(path, params);
    });

    it(`estimateShippingMethods should run properly`, async () => {
      const address = '';
      const guestId = '1';
      const path = `/${storeCode}/V1/guest-carts/${guestId}/estimate-shipping-methods`;
      jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.estimateShippingMethods(address, guestId, storeCode);
      expect(magentoCartGuest.post).toBeCalledWith(path, { address });
    });

    it(`estimateShippingMethodsV3 should run properly`, async () => {
      const address = '';
      const guestId = '1';
      const path = `/${storeCode}/V3/guest-carts/${guestId}/estimate-shipping-methods`;
      jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.estimateShippingMethodsV3(address, guestId, storeCode);
      expect(magentoCartGuest.post).toBeCalledWith(path, { address });
    });

    it(`setShippingInformation should run properly`, async () => {
      const addressInformation = '';
      const guestId = '1';
      const path = `/V1/guest-carts/${guestId}/shipping-information`;
      jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.setShippingInformation(addressInformation, guestId);
      expect(magentoCartGuest.post).toBeCalledWith(path, { addressInformation });
    });

    it(`setShippingSlotHdl should run properly`, async () => {
      const slot = '';
      const guestId = '1';
      const path = `/V1/guest-carts/${guestId}/shipping-slot-hdl/book`;
      jest.spyOn(magentoCartGuest, 'put').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.setShippingSlotHdl(slot, guestId);
      expect(magentoCartGuest.put).toBeCalledWith(path, { slot });
    });

    it(`addCoupon should run properly`, async () => {
      const cartId = '1';
      const coupon = {};
      const path = `/V1/guest-carts/mine/coupons/${coupon}`;
      jest.spyOn(magentoCartGuest, 'put').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.addCoupon(cartId, coupon);
      expect(magentoCartGuest.put).toBeCalled();
    });

    it(`deleteCoupon should run properly`, async () => {
      const cartId = '1';
      const path = `/V1/guest-carts/mine/coupons`;
      jest.spyOn(magentoCartGuest, 'delete').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.deleteCoupon(cartId);
      expect(magentoCartGuest.delete).toBeCalled();
    });

    it(`updatePaymentInformation should run properly`, async () => {
      const cartId = '1';
      const paymentInfo = {};
      const path = `/${storeCode}/V1/guest-carts/mine/set-payment-information`;
      jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.updatePaymentInformation(paymentInfo, cartId, storeCode);
      expect(magentoCartGuest.post).toBeCalled();
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
      const { cart_id, quote_item_group } = updateData;
      const path = `/${storeCode}/V1/guest-carts/${cart_id}/item-group/${quote_item_group}`;
      jest.spyOn(magentoCartGuest, 'put').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.updateStore(input, storeCode);
      expect(magentoCartGuest.put).toBeCalledWith(path, { updateData });
    });

    it(`loginT1GuestCart should run properly`, async () => {
      const guestToken = '1';
      const body = '';
      const path = `/V1/guest-carts/${guestToken}/t1c/balance`;
      jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.loginT1GuestCart(guestToken, body);
      expect(magentoCartGuest.post).toBeCalledWith(path, body);
    });

    it(`burnPoint should run properly`, async () => {
      const points = 40;
      const guestToken = '1';
      const path = `${storeCode}/V1/guest-carts/${guestToken}/t1c`;
      jest.spyOn(magentoCartGuest, 'put').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.burnPoint(points, guestToken, storeCode);
      expect(magentoCartGuest.put).toBeCalledWith(path, { points });
    });

    it(`burnPoint should run with t1 token`, async () => {
      const points = 40;
      const guestToken = '1';
      const path = `${storeCode}/V1/guest-carts/${guestToken}/t1c`;
      const t1Token = `MOCK TOKEN`;
      const init = {
        headers: {
          'x-authorization-key': t1Token,
        },
      };
      jest.spyOn(magentoCartGuest, 'put').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.burnPoint(points, guestToken, storeCode, t1Token);
      expect(magentoCartGuest.put).toBeCalledWith(path, { points }, init);
    });

    it(`deletePoint should run properly`, async () => {
      const guestToken = '1';
      const path = `/V1/guest-carts/${guestToken}/t1c`;
      jest.spyOn(magentoCartGuest, 'delete').mockReturnValue(Promise.resolve({}) as any);
      await magentoCartGuest.deletePoint(guestToken);
      expect(magentoCartGuest.delete).toBeCalledWith(path);
    });
  });

  it(`setPaymentInformation with headers should run properly`, async () => {
    magentoCartGuest.initialize({
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
      guestId = 'cart-id',
      storeCode = 'th';
    jest.spyOn(axios, 'default' as any).mockResolvedValue(mockResponse);

    const path = `/${storeCode}/V1/guest-carts/${guestId}/payment-information`;
    const fullPath = `${config.magento.base_url}` + path;
    const mockRequest = {
      url: fullPath,
      method: 'POST',
      headers: new Headers({}),
      body: paymentInfo,
    };
    jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve({}) as any);
    await magentoCartGuest.setPaymentInformation(paymentInfo, guestId, storeCode);
    expect(function () {
      magentoCartGuest.addRequestUsage(mockRequest, mockResponse);
    }).not.toThrow();
  });

  it(`setPaymentInformation without headers should run properly`, async () => {
    magentoCartGuest.initialize({
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
      guestId = 'cart-id',
      storeCode = 'th';
    jest.spyOn(axios, 'default' as any).mockResolvedValue(mockResponse);

    const path = `/${storeCode}/V1/guest-carts/${guestId}/payment-information`;
    const fullPath = `${config.magento.base_url}` + path;
    const mockRequest = {
      url: fullPath,
      method: 'POST',
      headers: new Headers({}),
      body: paymentInfo,
    };
    jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve({}) as any);
    await magentoCartGuest.setPaymentInformation(paymentInfo, guestId, storeCode);
    expect(function () {
      magentoCartGuest.addRequestUsage(mockRequest, mockResponse);
    }).not.toThrow();
  });

  it('t1RedeemInitiate', async () => {
    const guestId = '123';
    const token = '123';
    const points = 400;
    const path = `/V1/t1p2/guest-carts/${guestId}/point/redemption/initiate`;
    const body = {
      points
    };
    const headers = { ["x-authorization-key"]: token };

    jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve(true) as any);
    const response = await magentoCartGuest.t1RedeemInitiate(guestId, token, points);
    expect(magentoCartGuest.post).toBeCalledWith(path, body, { headers });
    expect(response).toEqual(true);
  });

  it('t1RedeemVerify', async () => {
    const guestId = '123';
    const token = '1234';
    const value = '12345';
    const points = 40;
    const requestID = 'REQUEST_MOCK';
    const path = `/V1/t1p2/guest-carts/${guestId}/point/redemption/verify`;
    const body = {
      value,
      requestID,
      points,
    };
    const headers = { ["x-authorization-key"]: token };

    jest.spyOn(magentoCartGuest, 'post').mockReturnValue(Promise.resolve(true) as any);
    const response = await magentoCartGuest.t1RedeemVerify(points, guestId, token, value, requestID);
    expect(magentoCartGuest.post).toBeCalledWith(path, body, { headers });
    expect(response).toEqual(true);
  });
});
