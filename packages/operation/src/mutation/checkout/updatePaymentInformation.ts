import gql from 'graphql-tag';

export const updatePaymentInformation = gql`
  mutation updatePaymentInformation($input: PaymentInformationInput!, $cartId: String, $isGuest: Boolean) {
    updatePaymentInformation(input: $input, cartId: $cartId, isGuest: $isGuest) {
      message
      order
    }
  }
`;
