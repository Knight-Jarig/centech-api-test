import gql from 'graphql-tag';

export const setShippingSlotHdl = gql`
  mutation setShippingSlotHdl($cartId: String, $isGuest: Boolean, $input: SetShippingSlotHdlInput!) {
    setShippingSlotHdl(cartId: $cartId, isGuest: $isGuest, input: $input) {
      message
    }
  }
`;
