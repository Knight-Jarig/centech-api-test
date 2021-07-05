import get from 'lodash/get';

class OrderModel {
  transform(order) {
    return {
      entity_id: get(order, 'entity_id'),
      increment_id: get(order, 'increment_id'),
      order_currency_code: get(order, 'order_currency_code'),
      total_due: get(order, 'total_due'),
      created_at: get(order, 'created_at'),
      shipping_description: get(order, 'shipping_description'),
      state: get(order, 'state'),
      status: get(order, 'status'),
      items: get(order, 'items'),
      payment: get(order, 'payment'),
      status_histories: get(order, 'status_histories'),
      billing_address: get(order, 'billing_address'),
      extension_attributes: get(order, 'extension_attributes'),
      subtotal_incl_tax: get(order, 'subtotal_incl_tax'),
      subtotal: get(order, 'subtotal'),
      tax_amount: get(order, 'tax_amount'),
      grand_total: get(order, 'grand_total'),
      discount_amount: get(order, 'discount_amount'),
      discount_description: get(order, 'discount_description'),
      shipping_incl_tax: get(order, 'shipping_incl_tax'),
      coupon_code: get(order, 'coupon_code'),
      promotion_code: get(order, 'extension_attributes.p2c2p_promotion_code'),
      customer_email: get(order, 'customer_email'),
    };
  }
}

export default new OrderModel();
