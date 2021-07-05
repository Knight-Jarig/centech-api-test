import gql from 'graphql-tag';

export const estimateShippingMethodsV4 = gql`
  query estimateShippingMethodsV4(
    $cartId: String
    $isGuest: Boolean
    $input: EstimateShippingInput!
    $pickupStoresLocationLimit: Int
    $pickupStoresLocationOffset: Int
    $pickupStoresLocationFilterKeyword: String
    $pickupStoresLocationFilterLocation: PickupStoreLocationFilterLatLng
  ) {
    estimateShippingMethodsV4(cartId: $cartId, isGuest: $isGuest, input: $input) {
      method
      method_caption
      method_code
      fastest_method
      fastest_method_caption
      free_method
      free_method_cost
      shipping_method {
        carrier_code
        method_code
        carrier_title
        caption
        method_title
        amount
        base_amount
        available
        error_message
        price_excl_tax
        price_incl_tax
        extension_attributes {
          pickup_locations {
            id
            code
            name
            display_order
            address_line1
            district
            province
            region_id
            postal_code
            lat
            long
            pickup_fee
            pos_handling_fee
            opening_hours
            extension_attributes {
              additional_address_info {
                subdistrict
                subdistrict_id
                district
                district_id
                region_id
                region_name
              }
              available_services
            }
          }
          pickup_stores_location(
            filter: { keyword: $pickupStoresLocationFilterKeyword, location: $pickupStoresLocationFilterLocation, input: $input }
            limit: $pickupStoresLocationLimit
            offset: $pickupStoresLocationOffset
          ) {
            id
            name
            store_code
            is_active
            address {
              street_number
              building
              soi
              street
              district
              district_id
              sub_district
              sub_district_id
              region
              region_id
              post_code
              contact_number
              country_code
              city
              latitude
              longitude
            }
            distance {
              text
              value
            }
            extension_attributes {
              opening_hours {
                day
                open
                close
              }
              store_pickup {
                stock_id
                allow_ispu
                allow_sts
              }
              stock_id
              image
              allow_pick_at_store
              display_as_store_information
              salable_items {
                sku
                qty
              }
              additional_text {
                method_code
                method_label_code
                time_value
                time_unit
                date_time
                extension_attributes {
                  additional_text_variable {
                    total_ordered
                    total_available
                  }
                }
              }
              cut_off_time
            }
          }
          gmap_api_key
          shipping_slot_list {
            id
            date_time_from
            date_time_to
            extension_attributes {
              day_slot_id
            }
          }
          messages {
            message_code
            message
            pre_render_message
          }
          delivery_time_label {
            method_type
            method_label
            min_lead_time
            max_lead_time
            time_label
          }
        }
      }
    }
  }
`;
