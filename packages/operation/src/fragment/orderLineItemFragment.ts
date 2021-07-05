import gql from 'graphql-tag';

export const orderLineItemFragment = gql`
  fragment orderLineItemFragment on OrderItemExtensionAttributes {
    line_items {
      entity_id
      order_id
      line_id
      line_number
      extension_attributes {
        status
        package_id
        carrier
        tracking_number
        tracking_link
      }
    }
    marketplace_info {
      seller_info {
        name
        mirakl_seller_id
        url_key
      }
    }
  }
`;
