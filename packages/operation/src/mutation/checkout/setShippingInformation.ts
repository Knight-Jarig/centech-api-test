import gql from 'graphql-tag';

export const setShippingInformation = gql`
  mutation setShippingInformation($cartId: String, $isGuest: Boolean, $input: SetShippingInformationInput!) {
    setShippingInformation(cartId: $cartId, isGuest: $isGuest, input: $input) {
      message
    }
  }
`;
