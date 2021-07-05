import gql from 'graphql-tag';

export const shippingSlotInfoHdl = gql`
  query shippingSlotInfoHdl($cartId: String!, $address: ShippingSlotHdlInput!) {
    shippingSlotInfoHdl(cartId: $cartId, address: $address) {
      id
      date_time_from
      date_time_to
      extension_attributes {
        day_slot_id
      }
    }  
  }
`;




