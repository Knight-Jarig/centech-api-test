import gql from 'graphql-tag';
import { productFragment } from '../fragment/productFragment';
import { orderLineItemFragment } from '../fragment/orderLineItemFragment';

export const orders = gql`
  query orders($filter: FiltersQuery!) {
    orders(filter: $filter) {
      items {
        entity_id
        increment_id
        created_at
        shipping_description
        total_due
        order_currency_code
        state
        payment {
          method
        }
        status
        items {
          product_id
          name
          sku
          store_id
          qty_ordered
          qty_canceled
          price
          price_incl_tax
          row_total
          row_total_incl_tax
          tax_amount
          tax_canceled
          base_discount_amount
          base_discount_invoiced
          base_discount_tax_compensation_amount
          base_original_price
          base_price
          base_price_incl_tax
          base_row_invoiced
          base_row_total
          base_row_total_incl_tax
          base_tax_amount
          base_tax_invoiced
          discount_amount
          discount_invoiced
          discount_percent
          discount_tax_compensation_amount
          discount_tax_compensation_canceled
          original_price
          store_code
          url_key
          image
          small_image
          thumbnail
          custom_attributes {
            brand_name
          }
          product {
            ...productFragment
          }
          extension_attributes {
            ...orderLineItemFragment
          }
        }
        billing_address {
          address_type
          company
          firstname
          lastname
          telephone
          email
          prefix
          country_id
          city
          postcode
          region
          region_code
          region_id
          street
          extension_attributes {
            custom_attributes {
              attribute_code
              value
            }
          }
          custom_attributes(filter: ["region", "district", "subdistrict", "soi", "house_no", "building", "address_line"])
        }
        extension_attributes {
          order_children_ids
          t1c_redeem {
            t1_cnumber
            points_redeem
            points_total
            discount_amount
            discount_amount_formatted
          }
          shipping_assignments {
            shipping {
              address {
                address_type
                city
                company
                country_id
                email
                firstname
                lastname
                postcode
                prefix
                region
                region_code
                region_id
                street
                telephone
                custom_attributes(filter: ["region", "district", "subdistrict", "soi", "house_no", "building", "address_line"])
              }
              method
            }
            items {
              store_id
              name
              product_type
              sku
            }
          }
          payment_method_label
          keep_at_store_hours
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
              min_lead_time
              max_lead_time
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
            }
          }
          order_status
          mom_status_reason
          delivery_status_history {
            status
            created_at
            reason
          }
          shipping_slot {
            date_time_from
            date_time_to
          }
          coupon {
            discount_amount
            discount_amount_formatted
            coupon_code
          }
          bts_order_status {
            seller_id
            seller_name
            status
          }
        }
        subtotal_incl_tax
        subtotal
        tax_amount
        grand_total
        discount_amount
        shipping_incl_tax
        promotion_code
      }
      total_count
    }
  }
  ${productFragment}
  ${orderLineItemFragment}
`;
