import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import { IListStorePickUp } from '../../../types/graphql';
import { UpdateStoreInterface } from '../../../types';
import { RequestOptions } from 'apollo-datasource-rest';
import { Headers } from 'apollo-server-env';
import config from '../../../configs/vars';
import {
  MDCCart,
  MDCCartTotal,
  MDCEstimateShippingMethods,
  MDCPackageOption,
  MDCShippingInfomation,
  MDCAddCartItemResponse,
  T1InitiateResponse,
  T1VerifyResponse,
} from './MagentoCartResponse';
import { MDCGiftMessage } from '../../../extensions/schemaV2/types/mdc-type';
import { MagentoCartRequestMultiCartItem } from './MagentoCartRequest';
import { IPayloadGetStoreListFilter } from '../../../schema/cart/cartResolverType';
import axios from 'axios';
import { get } from 'lodash';

export class MagentoCartDataSource extends BaseRESTDataSource {
  createCartMine(userToken, storeCode): Promise<any> {
    if (userToken) {
      this.context.customerToken = `Bearer ${userToken}`;
    }

    const path = `/${storeCode}/V1/carts/mine`;

    return this.post(path);
  }

  getCartMineMini() {
    return this.get('/V1/cart/mine/mini', null, {
      cacheOptions: { ttl: 0 },
    });
  }

  getCartMine(storeCode): Promise<MDCCart> {
    const path = `${storeCode}/V1/carts/mine`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    return this.get(path, params, init);
  }

  getCartMineTotals(storeCode): Promise<MDCCartTotal> {
    const path = `${storeCode}/V1/carts/mine/totals`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    return this.get(path, params, init);
  }

  getGiftMessage(storeCode): Promise<MDCGiftMessage | []> {
    const path = `${storeCode}/V1/carts/mine/gift-message`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    return this.get(path, params, init);
  }

  getPaymentInformation(storeCode): Promise<any> {
    const path = `/${storeCode}/V1/carts/mine/payment-information`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    return this.get(path, params, init);
  }

  getPaymentInformationOFM(storeCode, company_id = 0): Promise<any> {
    const path = `/${storeCode}/V1/carts/mine/payment-information?company_id=${company_id}`;
    const params = null;
    const init = {
      cacheOptions: { ttl: 0 },
    };

    return this.get(path, params, init);
  }

  getPackageOptions(storeCode: string, storeId: string): Promise<MDCPackageOption[]> {
    const path = `/${storeCode}/V1/carts/mine/package-options`;
    const params = {
      storeId,
    };

    return this.post(path, params);
  }

  getDeliveryPackageOptions(storeCode: string, input): Promise<MDCPackageOption[]> {
    const path = `/${storeCode}/V1/carts/mine/delivery-package-options`;
    const params = { ...input };

    return this.post(path, params);
  }

  deleteCartMineItem(itemId): Promise<any> {
    const path = `/V1/carts/mine/items/${itemId}`;

    return this.delete(path);
  }

  editCartItem(itemId, cartItem): Promise<any> {
    const path = `/V1/carts/mine/items/${itemId}`;
    const params = { cartItem };

    return this.put(path, params);
  }

  addCartMineItem(cartItem): Promise<MDCAddCartItemResponse> {
    const path = `/V1/carts/mine/items/`;
    const params = { cartItem };

    return this.post(path, params);
  }

  addGiftWrapMessage(message: string): Promise<boolean> {
    const path = `/V1/carts/mine/gift-message`;
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

  deleteGiftWrapMessage(): Promise<boolean> {
    const path = `/V1/carts/mine/gift-message`;
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

  estimateShippingMethods(address, storeCode): Promise<any> {
    const path = `/${storeCode}/V1/carts/mine/estimate-shipping-methods`;
    const params = { address };

    return this.post(path, params);
  }

  estimateShippingMethodsV3(address, storeCode): Promise<MDCEstimateShippingMethods[]> {
    const path = `/${storeCode}/V3/carts/mine/estimate-shipping-methods`;
    const params = { address };

    return this.post(path, params);
  }

  estimateShippingMethodsV4(address, storeCode): Promise<MDCEstimateShippingMethods[]> {
    const path = `/${storeCode}/V4/carts/mine/estimate-shipping-methods`;
    const params = { address };

    return this.post(path, params);
  }

  setShippingInformation(addressInformation): Promise<MDCShippingInfomation | []> {
    const path = '/V1/carts/mine/shipping-information';
    const params = { addressInformation };

    return this.post(path, params);
  }

  setShippingSlotHdl(slot): Promise<any> {
    const path = '/V1/carts/mine/shipping-slot-hdl/book';
    const params = { slot };

    return this.put(path, params);
  }

  async setPaymentInformation(paymentInfo, storeCode): Promise<any> {
    if (this.context.bu === 'pwb') {
      const headers = this.getRequestHeaders(this.context, false);
      const body = new Object({ ...paymentInfo });
      const requestHeader = new Headers(headers);
      try {
        const response = await axios({
          method: 'post',
          baseURL: config.magento.base_url,
          url: `/${storeCode}/V1/carts/mine/payment-information`,
          data: body,
          headers,
        });

        try {
          this.addRequestUsage(
            {
              url: `${config.magento.base_url}/${storeCode}/V1/carts/mine/payment-information`,
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
              url: `${config.magento.base_url}/${storeCode}/V1/carts/mine/payment-information`,
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
        throw new Error(error?.response?.data?.message || error);
      }
    } else {
      const headers = this.getRequestHeaders(this.context, false);
      const body = new Object({ ...paymentInfo });
      const response = await this.post(`/${storeCode}/V1/carts/mine/payment-information`, body, { headers });
      return { data: response };
    }
  }

  addCoupon(coupon): Promise<any> {
    const path = `/V1/carts/mine/coupons/${coupon}`;

    return this.put(path);
  }

  deleteCoupon(): Promise<any> {
    const path = `/V1/carts/mine/coupons`;
    const params = null;

    return this.delete(path, params);
  }

  updatePaymentInformation(paymentInfo, storeCode): Promise<any> {
    const path = `/${storeCode}/V1/carts/mine/set-payment-information`;
    const params = paymentInfo;

    return this.post(path, params);
  }

  updateStore(input: UpdateStoreInterface, storeCode) {
    const { updateData } = input;
    const { quote_item_group } = updateData;
    const path = `/${storeCode}/V1/carts/mine/item-group/${quote_item_group}`;

    return this.put(path, { updateData });
  }

  mergeGuestCart(customerToken, maskedQuoteId): Promise<any> {
    this.context.customerToken = `Bearer ${customerToken}`;

    const path = '/V1/carts/merge';
    const params = { masked_quote_id: maskedQuoteId };

    return this.post(path, params);
  }

  loginT1(body): Promise<any> {
    const path = `/V1/carts/mine/t1c/balance`;

    return this.post(path, body);
  }

  burnPoint(points, storeCode, token?): Promise<any> {
    const path = `${storeCode}/V1/carts/mine/t1c`;
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

  deletePoint(): Promise<any> {
    const path = `/V1/carts/mine/t1c`;

    return this.delete(path);
  }

  willSendRequest(request: RequestOptions): void {
    super.willSendRequest(request);

    request.headers.set('Authorization', this.context.customerToken);
  }

  setValidatePin(storeCode, pinInfo): Promise<boolean> {
    const path = `${storeCode}/V1/carts/mine/validate-pin`;
    const params = { ...pinInfo };

    return this.post(path, params);
  }
  replaceCartItem(cartItems: MagentoCartRequestMultiCartItem[]) {
    return this.post('/V1/carts/mine/replaceMulti', { cartItems: cartItems });
  }

  clearBillingAddress(cartId: number) {
    return this.post('/V1/carts/mine/billing-address', {
      address: {},
      cartId,
    });
  }

  async getStoreList(payload: IPayloadGetStoreListFilter, storeCode: string): Promise<IListStorePickUp> {
    const path = `/${storeCode}/V1/carts/mine/get-pickup-locations`;
    return await this.post(path, payload, {
      cacheOptions: { ttl: 0 },
    });
  }

  t1RedeemInitiate(token: string, points: number): Promise<T1InitiateResponse> {
    const path = `/V1/t1p2/point/redemption/initiate`;
    const init = {
      headers: {
        Authorization: this.context.customerToken,
        'x-authorization-key': token,
      },
    };
    const params = { points };

    return this.post(path, params, init);
  }

  t1RedeemVerify(points: number, token: string, value: string, requestID: string): Promise<T1VerifyResponse> {
    const path = `/V1/t1p2/point/redemption/verify`;
    const init = {
      headers: {
        Authorization: this.context.customerToken,
        'x-authorization-key': token,
      },
    };
    const params = { value, requestID, points };

    return this.post(path, params, init);
  }
}
