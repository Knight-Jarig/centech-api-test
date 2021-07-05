import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import config from '../../../configs/vars';
import { IListStorePickUp } from '../../../types/graphql';
import { UpdateStoreInterface } from '../../../types';
import { RequestOptions } from 'apollo-datasource-rest';
import { Headers } from 'apollo-server-env';
import {
  MDCCart,
  MDCCartTotal,
  MDCEstimateShippingMethods,
  MDCPackageOption,
  MDCShippingInfomation,
  T1InitiateResponse,
  T1VerifyResponse,
} from '../cart/MagentoCartResponse';
import { MDCGiftMessage } from '../../../extensions/schemaV2/types/mdc-type';
import { IPayloadGetStoreListFilter } from '../../../schema/cart/cartResolverType';
import * as Sentry from '@sentry/node';
import axios from 'axios';
import { get } from 'lodash';

export class MagentoCartGuestDataSource extends BaseRESTDataSource {
  getCartGuestMini(guestId) {
    this.sentryConfigureUser(guestId);
    return this.get(`/V1/guest-carts/${guestId}/mini`, null, {
      cacheOptions: { ttl: 0 },
    });
  }

  createCartGuest(storeCode) {
    const path = `${storeCode}/V1/guest-carts`;

    return this.post(path);
  }

  restoreCartGuest(storeCode, cartId: string | undefined) {
    // if cartId === undefined create new cartId
    if (cartId) {
      this.sentryConfigureUser(cartId);
    }
    const path = `/${storeCode}/V1/carts/${cartId}/getNext`;

    return this.post(path);
  }

  getCartGuest(guestId, storeCode): Promise<MDCCart> {
    this.sentryConfigureUser(guestId);
    const path = `${storeCode}/V1/guest-carts/${guestId}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    return this.get(path, params, init);
  }

  getCartGuestTotals(guestId, storeCode): Promise<MDCCartTotal> {
    this.sentryConfigureUser(guestId);
    const path = `${storeCode}/V1/guest-carts/${guestId}/totals`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    return this.get(path, params, init);
  }

  getGiftMessage(guestId, storeCode): Promise<MDCGiftMessage | []> {
    this.sentryConfigureUser(guestId);
    const path = `${storeCode}/V1/guest-carts/${guestId}/gift-message`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    return this.get(path, params, init);
  }

  getPaymentInformation(guestId, storeCode) {
    this.sentryConfigureUser(guestId);
    const path = `/${storeCode}/V1/guest-carts/${guestId}/payment-information`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    return this.get(path, params, init);
  }

  getPaymentInformationOFM(guestId, storeCode, company_id = 0) {
    this.sentryConfigureUser(guestId);
    const path = `/${storeCode}/V1/guest-carts/${guestId}/payment-information?company_id=${company_id}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    return this.get(path, params, init);
  }

  getPackageOptions(storeCode: string, storeId: string, cartId: string): Promise<MDCPackageOption[]> {
    this.sentryConfigureUser(cartId);
    const path = `/${storeCode}/V1/guest-carts/${cartId}/package-options`;
    const params = {
      storeId,
    };

    return this.post(path, params);
  }

  getDeliveryPackageOptions(storeCode: string, input, cartId: string): Promise<MDCPackageOption[]> {
    this.sentryConfigureUser(cartId);
    const path = `/${storeCode}/V1/guest-carts/${cartId}/delivery-package-options`;
    const params = { ...input };

    return this.post(path, params);
  }

  deleteCartGuestItem(guestId, itemId) {
    this.sentryConfigureUser(guestId);
    const path = `/V1/guest-carts/${guestId}/items/${itemId}`;

    return this.delete(path);
  }

  editCartItem(guestId, itemId, cartItem) {
    this.sentryConfigureUser(guestId);
    const path = `/V1/guest-carts/${guestId}/items/${itemId}`;
    const params = { cartItem };

    return this.put(path, params);
  }

  addCartGuestItem(guestId, cartItem) {
    this.sentryConfigureUser(guestId);
    const path = `/V1/guest-carts/${guestId}/items/`;
    const params = { cartItem };

    return this.post(path, params);
  }

  addGiftWrapMessage(cartId: string, message: string) {
    this.sentryConfigureUser(cartId);
    const path = `/V1/guest-carts/${cartId}/gift-message`;
    const params = {
      gift_message: {
        message: message,
        extension_attributes: {
          wrapping_id: 1,
        },
      },
    };

    return this.post(path, params);
  }

  deleteGiftWrapMessage(cartId: string) {
    this.sentryConfigureUser(cartId);
    const path = `/V1/guest-carts/${cartId}/gift-message`;
    const params = {
      message: null,
      gift_message: {
        extension_attributes: {
          wrapping_id: null,
        },
      },
    };

    return this.post(path, params);
  }

  estimateShippingMethods(address, guestId, storeCode) {
    this.sentryConfigureUser(guestId);
    const path = `/${storeCode}/V1/guest-carts/${guestId}/estimate-shipping-methods`;
    const params = {
      address,
    };

    return this.post(path, params);
  }

  estimateShippingMethodsV3(address, guestId, storeCode): Promise<MDCEstimateShippingMethods[]> {
    this.sentryConfigureUser(guestId);
    const path = `/${storeCode}/V3/guest-carts/${guestId}/estimate-shipping-methods`;
    const params = {
      address,
    };

    return this.post(path, params);
  }

  estimateShippingMethodsV4(address, guestId, storeCode): Promise<MDCEstimateShippingMethods[]> {
    this.sentryConfigureUser(guestId);
    const path = `/${storeCode}/V4/guest-carts/${guestId}/estimate-shipping-methods`;
    const params = {
      address,
    };

    return this.post(path, params);
  }

  setShippingInformation(addressInformation, guestId): Promise<MDCShippingInfomation | []> {
    this.sentryConfigureUser(guestId);
    const path = `/V1/guest-carts/${guestId}/shipping-information`;
    const params = {
      addressInformation,
    };

    return this.post(path, params);
  }

  setShippingSlotHdl(slot, guestId) {
    this.sentryConfigureUser(guestId);
    const path = `/V1/guest-carts/${guestId}/shipping-slot-hdl/book`;
    const params = { slot };

    return this.put(path, params);
  }

  async setPaymentInformation(paymentInfo, guestId, storeCode) {
    if (this.context.bu === 'pwb') {
      const headers = this.getRequestHeaders(this.context, true);

      const body = new Object({ ...paymentInfo });

      const requestHeader = new Headers(headers);

      try {
        const response = await axios({
          method: 'post',
          baseURL: config.magento.base_url,
          headers,
          url: `/${storeCode}/V1/guest-carts/${guestId}/payment-information`,
          data: body,
        });

        try {
          this.addRequestUsage(
            {
              url: `${config.magento.base_url}/${storeCode}/V1/guest-carts/${guestId}/payment-information`,
              method: 'POST',
              headers: requestHeader,
              body: JSON.stringify(body),
            } as any,
            {
              status: response.status,
              statusText: response.statusText,
            } as any,
          );
        } catch (e) {}

        return {
          redirect_url: get(response, 'request.res.responseUrl'),
          data: response.data,
        };
      } catch (error) {
        const message = error?.response?.data?.message || error?.message || error?.response?.statusText;
        try {
          this.addRequestUsage(
            {
              url: `${config.magento.base_url}/${storeCode}/V1/guest-carts/${guestId}/payment-information`,
              method: 'POST',
              headers: requestHeader,
              body: JSON.stringify(body),
            } as any,
            {
              status: error?.response?.status,
              statusText: message,
            } as any,
          );
        } catch (e) {
          console.log(e);
        }

        throw new Error(message);
      }
    } else {
      this.sentryConfigureUser(guestId);
      const headers = this.getRequestHeaders(this.context, true);
      const body = new Object({ ...paymentInfo });
      const response = await this.post(`/${storeCode}/V1/guest-carts/${guestId}/payment-information`, body, {
        headers,
      });
      return { data: response };
    }
  }

  addCoupon(cartId, coupon) {
    this.sentryConfigureUser(cartId);
    const path = `/V1/guest-carts/${cartId}/coupons/${coupon}`;

    return this.put(path);
  }

  deleteCoupon(cartId) {
    this.sentryConfigureUser(cartId);
    const path = `/V1/guest-carts/${cartId}/coupons`;
    const params = null;

    return this.delete(path, params);
  }

  updatePaymentInformation(paymentInfo, cartId, storeCode) {
    this.sentryConfigureUser(cartId);
    const path = `/${storeCode}/V1/guest-carts/${cartId}/set-payment-information`;
    const params = paymentInfo;

    return this.post(path, params);
  }

  updateStore(input: UpdateStoreInterface, storeCode) {
    const { updateData } = input;
    const { cart_id, quote_item_group } = updateData;
    this.sentryConfigureUser(cart_id);
    const path = `/${storeCode}/V1/guest-carts/${cart_id}/item-group/${quote_item_group}`;

    return this.put(path, { updateData });
  }

  loginT1GuestCart(guestToken, body) {
    this.sentryConfigureUser(guestToken);
    const path = `/V1/guest-carts/${guestToken}/t1c/balance`;

    return this.post(path, body);
  }

  burnPoint(points, guestToken, storeCode, token?) {
    this.sentryConfigureUser(guestToken);
    const path = `${storeCode}/V1/guest-carts/${guestToken}/t1c`;
    const params = { points };

    if (token) {
      const init = {
        headers: {
          'x-authorization-key': token,
        },
      };

      return this.put(path, params, init);
    }

    return this.put(path, params);
  }

  deletePoint(guestToken) {
    this.sentryConfigureUser(guestToken);
    const path = `/V1/guest-carts/${guestToken}/t1c`;

    return this.delete(path);
  }

  willSendRequest(request: RequestOptions): void {
    super.willSendRequest(request);

    request.headers.delete('Authorization');
  }

  async setValidatePin(storeCode, cartId, pinInfo): Promise<boolean> {
    this.sentryConfigureUser(cartId);
    const path = `${storeCode}/V1/guest-carts/${cartId}/validate-pin`;
    const params = { ...pinInfo };

    return this.post(path, params);
  }

  async getStoreList(
    guestId: string,
    payload: IPayloadGetStoreListFilter,
    storeCode: string,
  ): Promise<IListStorePickUp> {
    this.sentryConfigureUser(guestId);
    const path = `/${storeCode}/V1/guest-carts/${guestId}/get-pickup-locations`;
    return await this.post(path, payload, {
      cacheOptions: { ttl: 0 },
    });
  }

  sentryConfigureUser(guestId) {
    if (config.sentry.dsn) {
      Sentry.configureScope(function (scope) {
        scope.setTag('guest-id', guestId);
        scope.setUser({
          id: guestId,
        });
      });
    }
  }

  t1RedeemInitiate(guestId: string, token: string, points: number): Promise<T1InitiateResponse> {
    const path = `/V1/t1p2/guest-carts/${guestId}/point/redemption/initiate`;
    const init = {
      headers: {
        'x-authorization-key': token,
      },
    };
    const params = { points };

    return this.post(path, params, init);
  }

  t1RedeemVerify(
    points: number,
    guestId: string,
    token: string,
    value: string,
    requestID: string,
  ): Promise<T1VerifyResponse> {
    const path = `/V1/t1p2/guest-carts/${guestId}/point/redemption/verify`;
    const init = {
      headers: {
        'x-authorization-key': token,
      },
    };
    const params = { value, requestID, points };

    return this.post(path, params, init);
  }
}
