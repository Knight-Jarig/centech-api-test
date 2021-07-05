import gql from 'graphql-tag';

export const v2SetValidatePin = gql`
  mutation v2SetValidatePin($cartId: String, $input: V2SetValidatePinInput!) {
    v2SetValidatePin(cartId: $cartId, input: $input) {
      status
    }
  }
`;
