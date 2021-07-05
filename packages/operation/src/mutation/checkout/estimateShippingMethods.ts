import gql from 'graphql-tag';

export const estimateShippingMethods = gql`
  mutation estimateShippingMethods($cartId: String, $isGuest: Boolean, $input: EstimateShippingInput!) {
    estimateShippingMethods(cartId: $cartId, isGuest: $isGuest, input: $input) {
      carrier_code
      method_code
      carrier_title
      method_title
      available
      price_excl_tax
      price_incl_tax
      amount
      base_amount
      extension_attributes {
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
        is_pre_order
      }
    }
  }
`;
