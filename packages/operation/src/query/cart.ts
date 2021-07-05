import gql from 'graphql-tag';
import { productFragment } from '../fragment/productFragment';
import { cartFragment } from '../fragment/cartFragment';
import { marketPlaceSellerFragment } from '../fragment/marketPlaceSellerFragment';
import { productBrandFragment } from '../fragment/productBrandFragment';

export const cart = gql`
  query cart($isGuest: Boolean, $cartId: String) {
    cart(isGuest: $isGuest, cartId: $cartId) {
      ...cartFragment
      billing_address {
        id
        region
        region_id
        region_code
        company
        country_id
        street
        telephone
        postcode
        city
        firstname
        lastname
        vat_id
        email
        same_as_billing
        save_in_address_book
        customer_id
        customer_address_id
        extension_attributes {
          full_tax_request
        }
        custom_attributes {
          address_line
          address_name
          branch_id
          building
          customer_address_type
          subdistrict
          subdistrict_id
          district
          district_id
          region
          postcode
          full_tax_request
          full_tax_type
          company_id
          address_line2
          branch_code
        }
      }
      items {
        # from cart item
        item_id
        sku
        qty
        name
        price
        product_type
        quote_id

        # extend from cart totals
        row_total
        row_total_incl_tax
        row_total_with_discount
        tax_amount
        discount_percent
        discount_amount
        price_incl_tax
        # calculated total price of each product
        total_price

        # merged attributes
        extension_attributes {
          free_items {
            sku
            qty
            cart_id
            sales_rule_id
            sales_rule_action_type
            sales_rule_action_apply
            product {
              sku
              name
              image
              price
              special_price
              extension_attributes {
                brand {
                  name
                }
                salable
              }
              marketplace {
                ...marketPlaceSellerFragment
              }
            }
          }
          free_items_added {
            quote_id
            item_id
            sku
            sales_rule_id
            qty
            intent_qty
            for_item_id
            associated_item_id
            product {
              sku
              name
              image
              price
              special_price
              extension_attributes {
                salable
                brand {
                  ...productBrandFragment
                }
              }
              custom_attributes_option
              marketplace {
                ...marketPlaceSellerFragment
              }
            }
          }
          shipping_assignment {
            shipping_method
          }
          salable_quantity
          configurable_product_labels
          parent_sku
        }

        # from cart price
        row_total
        row_total_incl_tax
        row_total_with_discount
        tax_amount
        discount_percent
        discount_amount
        price_incl_tax
        options {
          label
          value
        }
        product {
          ...productFragment
        }
      }
      totals {
        grand_total
        base_grand_total
        subtotal
        discount_amount
        subtotal_with_discount
        shipping_amount
        shipping_discount_amount
        tax_amount
        shipping_tax_amount
        subtotal_incl_tax
        shipping_incl_tax
        extension_attributes {
          surcharge
          t1c_earn_points_estimate
          t1c_maximum_redeemable_points
          cart_summary {
            other_discount
            other_discount_incl_tax
            other_discount_tax
            t1c_discount
            t1c_discount_incl_tax
            t1c_discount_tax
            coupon_discount
            coupon_discount_incl_tax
            coupon_discount_tax
            total_save
            total_save_incl_tax
            tax_amount
            total_shipping_fee
            total_shipping_fee_incl_tax
          }
        }
        coupon_code
        total_segments {
          code
          title
          value
          extension_attributes
        }
      }
      has_gift_wrap
      extension_attributes {
        is_split_quote
        is_pre_order
        pwb_standard_pre_order_message
        free_items {
          sku
          qty
          cart_id
          sales_rule_id
          sales_rule_action_type
          sales_rule_action_apply
          product {
            sku
            name
            image
            price
            special_price
            extension_attributes {
              salable
            }
            marketplace {
              ...marketPlaceSellerFragment
            }
          }
        }
        free_items_added {
          quote_id
          item_id
          sku
          sales_rule_id
          qty
          intent_qty
          for_item_id
          associated_item_id
          product {
            sku
            name
            image
            price
            special_price
            extension_attributes {
              salable
              brand {
                ...productBrandFragment
              }
            }
            marketplace {
              ...marketPlaceSellerFragment
            }
          }
        }
        free_shipping_offer {
          message
        }
        order_id
        children {
          id
          items {
            item_id
            sku
            qty
            name
            price
            product_type
            extension_attributes {
              shipping_assignment {
                shipping_method
              }
              parent_quote_item_id
            }
          }
          items_count
          items_qty
          extension_attributes {
            shipping_assignments {
              shipping {
                method
                address {
                  id
                  region
                  region_id
                  street
                  telephone
                  postcode
                  city
                  firstname
                  lastname
                  email
                }
              }
            }
            retailer {
              id
              name
              is_active
              seller_code
              attribute_set_name
              custom_attributes {
                url_key
                show_contact_form
                inventory_source
                contact_phone
                contact_fax
              }
              extension_attributes {
                address {
                  id
                  retailer_id
                  coordinates {
                    latitude
                    longitude
                  }
                  region
                  region_id
                  country_id
                  street
                  postcode
                  city
                }
                opening_hours {
                  start_time
                  end_time
                }
                special_opening_hours
                ispu_promise_delivery
              }
            }
          }
        }
        shipping_assignments {
          shipping {
            method
            address {
              id
              region
              region_id
              street
              telephone
              postcode
              city
              firstname
              lastname
              email
              custom_attributes {
                address_line
                building
                subdistrict
                district
              }
            }
          }
        }
        retailer {
          id
          name
          is_active
          seller_code
          attribute_set_name
          custom_attributes {
            url_key
            show_contact_form
            inventory_source
            contact_phone
            contact_fax
          }
          extension_attributes {
            address {
              id
              retailer_id
              coordinates {
                latitude
                longitude
              }
              region
              region_id
              country_id
              street
              postcode
              city
            }
            opening_hours {
              start_time
              end_time
            }
            special_opening_hours
            ispu_promise_delivery
          }
        }
      }
    }
  }
  ${productFragment}
  ${cartFragment}
  ${marketPlaceSellerFragment}
  ${productBrandFragment}
`;
