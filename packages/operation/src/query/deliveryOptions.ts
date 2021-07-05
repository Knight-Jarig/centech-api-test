import gql from 'graphql-tag';

export const deliveryOptions = gql`
  query deliveryOptions($storeCode: String!, $sku: String!, $postcode: String) {
    deliveryOptions(storeCode: $storeCode, sku: $sku, postcode: $postcode) {
      shipping_method
      delivery_lead_time_message
      delivery_free_message
      shipping_method_label
      shipping_fee
    }
  }
`;
