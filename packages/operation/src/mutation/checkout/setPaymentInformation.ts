import gql from 'graphql-tag';

export const setPaymentInformation = gql`
  mutation setPaymentInformation($input: PaymentInformationInput!, $cartId: String, $isGuest: Boolean) {
    setPaymentInformation(input: $input, cartId: $cartId, isGuest: $isGuest) {
      message
      order
      redirect_url
      payment_offline {
        detail {
          orderId
        }
        key
      }
      request_form {
        url
        payload {
          paymentRequest
        }
      }
    }
  }
`;
