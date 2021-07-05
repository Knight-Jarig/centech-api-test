import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import axios from 'axios';
import config from '../../../configs/vars';
import { get } from 'lodash';

interface MDCShipingSlotHDLResponseExtension {
  day_slot_id: number;
}

interface MDCShipingSlotHDLResponse {
  id: string;
  date_time_from: string;
  date_time_to: string;
  extension_attributes: MDCShipingSlotHDLResponseExtension;
}
export class MagentoCartIdDataSource extends BaseRESTDataSource {
  createCartMine(storeCode) {
    return this.post(`/${storeCode}/V1/carts/mine`);
  }

  getCartByID(storeCode, cartId) {
    return this.get(`${storeCode}/V1/carts/${cartId}`, null, {
      cacheOptions: { ttl: 0 },
    });
  }

  getCartTotalsByID(storeCode, cartId) {
    return this.get(`${storeCode}/V1/carts/${cartId}/totals`, null, {
      cacheOptions: { ttl: 0 },
    });
  }

  getPaymentInformation(cartId, storeCode) {
    return this.get(`/${storeCode}/V1/carts/${cartId}/payment-information`, null, {
      cacheOptions: { ttl: 0 },
    });
  }

  getPaymentInformationOFM(cartId, storeCode, company_id = 0) {
    return this.get(`/${storeCode}/V1/carts/${cartId}/payment-information?company_id=${company_id}`, null, {
      cacheOptions: { ttl: 0 },
    });
  }

  deleteCartMineItem(itemId) {
    return this.delete(`/V1/carts/mine/items/${itemId}`);
  }

  editCartItem(itemId, cartItem) {
    return this.put(`/V1/carts/mine/items/${itemId}`, { cartItem });
  }

  addCartMineItem(cartItem) {
    return this.post(`/V1/carts/mine/items/`, { cartItem });
  }

  estimateShippingMethods(address, cartId, storeCode) {
    return this.post(`/${storeCode}/V1/carts/${cartId}/estimate-shipping-methods`, {
      address,
    });
  }

  getShippingSlotInfoHdl(address, cartId): Promise<MDCShipingSlotHDLResponse[]> {
    return this.post(`/V1/carts/${cartId}/shipping-slot-hdl/slot-info`, {
      address,
    });
  }

  setShippingInformation(addressInformation, cartId) {
    return this.post(`/V1/carts/${cartId}/shipping-information`, { addressInformation });
  }

  setShippingSlotHdl(slot, cartId) {
    return this.put(`/V1/carts/${cartId}/shipping-slot-hdl/book`, { slot });
  }

  async setPaymentInformation(paymentInfo, cartId, storeCode) {
    const headers = this.getRequestHeaders(this.context, false);
    const body = new Object({ ...paymentInfo });
    const response = await this.post(`/${storeCode}/V1/carts/${cartId}/payment-information`, body, { headers });
    return { data: response };
  }

  addCoupon(coupon) {
    return this.put(`/V1/carts/mine/coupons/${coupon}`);
  }

  deleteCoupon() {
    return this.delete(`/V1/carts/mine/coupons`, null);
  }

  updatePaymentInformation(paymentInfo, cartId, storeCode) {
    return this.post(`/${storeCode}/V1/carts/${cartId}/set-payment-information`, paymentInfo);
  }

  updateMultiplePaymentInformation(paymentInfo, storeCode) {
    return this.post(`/${storeCode}/V1/carts/set-multiple-payment-information`, paymentInfo);
  }
}
