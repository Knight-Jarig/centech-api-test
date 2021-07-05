import gql from 'graphql-tag';

export const v2SetShippingInformation = gql`
  mutation v2SetShippingInformation($cartId: String, $input: V2SetShippingInformationInput!) {
    v2SetShippingInformation(cartId: $cartId, input: $input) {
      status
    }
  }
`;
