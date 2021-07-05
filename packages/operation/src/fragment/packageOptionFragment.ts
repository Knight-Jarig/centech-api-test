import gql from 'graphql-tag';

export const packageOptionFragment = gql`
  fragment packageOptionFragment on V2PackageOption {
    product {
      detail {
        id
        sku
        name
        thumbnailUrl
        brand {
          name
          urlKey
        }
        urlKey
      }
      item_id
      qty_available_current_sku
    }
    line_items {
      line_id
      line_number
    } 
    delivery_method
    stock_id
    is_package_available
    has_sub_package
    qty_data {
      total_qty_available_in_package
      total_qty_for_current_package
      total_qty_ordered_in_cart
    } 
    method_data {
      carrier_title
      method_title
      carrier_code
      method_code
      method_labels {
        label
        date_time
        time_label
      }
    } 
    sub_package {
      product {
        detail {
          id
          sku
          name
          thumbnailUrl
          brand {
            name
            urlKey
          }
          urlKey
        }
        item_id
        qty_available_current_sku
      }
      line_items {
        line_id
        line_number
      }
      delivery_method
      stock_id
      is_package_available
      has_sub_package
      qty_data {
        total_qty_available_in_package
        total_qty_for_current_package
        total_qty_ordered_in_cart
      }
      method_data {
        carrier_title
        method_title
        carrier_code
        method_code
        method_labels {
          label
          date_time
          time_label
        }
      }
    }
  }
`;
