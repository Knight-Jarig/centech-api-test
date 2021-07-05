import gql from 'graphql-tag';

export const multi2hrsPickUpStores = gql`
  query multi2hrsPickUpStores($skus: [String]) {
    getMulti2hrsPickUpStores(skus: $skus) {
      sku
      data {
        source_item {
          sku
          quantity
          source_code
          status
        }
        store {
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
              region_id
              region
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
            stock_low_indicator_threshold
          }
        }
      }
    }
  }
`;
