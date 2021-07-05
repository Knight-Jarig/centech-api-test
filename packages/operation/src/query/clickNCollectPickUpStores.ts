import gql from 'graphql-tag';

export const clickNCollectPickUpStores = gql`
  query clickNCollectPickUpStores($cartId: String) {
    getClickNCollectPickUpStores(cartId: $cartId) {
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
  }
`;
