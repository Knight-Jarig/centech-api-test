import { setModel } from '../utils/setModel';
import StoreModel from './store.model';
import { getCustomAttribute } from '../utils/attribute.utils';

class CartModel {
  transform(cart) {
    const { number, array, string, object, bool } = setModel(cart);
    const cartSchema = {
      id: string('id'),
      items: array('items').map((item, key) => {
        return {
          item_id: number(`items[${key}].item_id`),
          sku: string(`items.${key}.sku`),
          qty: number(`items.${key}.qty`),
          price: number(`items.${key}.price`),
          product_type: string(`items.${key}.product_type`),
          quote_id: string(`items.${key}.quote_id`),
          // FROM CART TOTALS
          row_total: number(`items.${key}.row_total`),
          row_total_incl_tax: number(`items.${key}.row_total_incl_tax`),
          row_total_with_discount: number(`items.${key}.row_total_with_discount`),
          tax_amount: number(`items.${key}.tax_amount`),
          discount_percent: number(`items.${key}.discount_percent`),
          discount_amount: number(`items.${key}.discount_amount`),
          price_incl_tax: number(`items.${key}.price_incl_tax`),
          base_price_incl_tax: number(`items.${key}.base_price_incl_tax`),
          extension_attributes: object(`items.${key}.extension_attributes`),
          options: JSON.parse(string(`items.${key}.options`) || '[]'),
        };
      }),
      items_count: number('items_count'),
      items_qty: number('items_qty'),
      billing_address: {
        ...object('billing_address'),
        extension_attributes: {
          full_tax_request: getCustomAttribute(cart?.billing_address?.custom_attributes, 'full_tax_request'),
        },
        custom_attributes: [
          'address_line',
          'address_name',
          'branch_id',
          'building',
          'customer_address_type',
          'subdistrict',
          'subdistrict_id',
          'district',
          'district_id',
          'region',
          'postcode',
          'full_tax_request',
          'full_tax_type',
          'company_id',
          'address_line2',
          'branch_code',
        ].reduce((result, item) => {
          return {
            ...result,
            [item]: getCustomAttribute(cart?.billing_address?.custom_attributes, item),
          };
        }, {}),
      },
      extension_attributes: {
        free_items: array('extension_attributes.free_items'),
        free_items_added: array('extension_attributes.free_items_added'),
        shipping_assignments: array('extension_attributes.shipping_assignments').map(elem => {
          return {
            ...elem,
            shipping: {
              ...elem?.shipping,
              address: {
                ...elem?.shipping?.address,
                custom_attributes: {
                  address_line: getCustomAttribute(elem?.shipping?.address?.custom_attributes, 'address_line'),
                  building: getCustomAttribute(elem?.shipping?.address?.custom_attributes, 'building'),
                  subdistrict: getCustomAttribute(elem?.shipping?.address?.custom_attributes, 'subdistrict'),
                  district: getCustomAttribute(elem?.shipping?.address?.custom_attributes, 'district'),
                  region: getCustomAttribute(elem?.shipping?.address?.custom_attributes, 'region'),
                  postcode: getCustomAttribute(elem?.shipping?.address?.custom_attributes, 'postcode'),
                  full_tax_request: getCustomAttribute(elem?.shipping?.address?.custom_attributes, 'full_tax_request'),
                },
              },
            },
          };
        }),
        order_id: string('extension_attributes.order_id'),
        children: array('extension_attributes.children'),
        retailer: StoreModel.transform(object('extension_attributes.retailer')),
        free_items_qty: cart?.extension_attributes?.free_items_qty || 0,
        free_shipping_offer: cart?.extension_attributes?.free_shipping_offer,
        is_split_quote: number('extension_attributes.is_split_quote'),
        is_pre_order: bool('extension_attributes.is_pre_order'),
        pwb_standard_pre_order_message: string('extension_attributes.pwb_standard_pre_order_message'),
      },
      totals: {
        grand_total: number('totals.grand_total'),
        base_grand_total: number('totals.base_grand_total'),
        subtotal: number('totals.subtotal'),
        discount_amount: number('totals.discount_amount'),
        subtotal_with_discount: number('totals.subtotal_with_discount'),
        shipping_amount: number('totals.shipping_amount'),
        shipping_discount_amount: number('totals.shipping_discount_amount'),
        tax_amount: number('totals.tax_amount'),
        shipping_tax_amount: number('totals.shipping_tax_amount'),
        subtotal_incl_tax: number('totals.subtotal_incl_tax'),
        shipping_incl_tax: number('totals.shipping_incl_tax'),
        extension_attributes: object('totals.extension_attributes'),
        coupon_code: string('totals.coupon_code'),
        total_segments: array('totals.total_segments'),
        cart_summary: object('totals.extension_attributes.cart_summary'),
      },
      guest_id: string('guest_id'),
      has_gift_wrap: Boolean(
        array('totals.total_segments').find(item => item.code === 'giftwrapping')?.extension_attributes?.gw_order_id,
      ),
    };

    return cartSchema;
  }
}

export default new CartModel();
