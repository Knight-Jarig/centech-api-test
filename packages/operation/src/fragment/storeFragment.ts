import gql from 'graphql-tag';

export const storeFragment = gql`
  fragment storeFragment on StoreInterface {
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
      logo
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
`;
