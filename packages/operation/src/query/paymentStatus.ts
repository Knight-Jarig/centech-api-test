import gql from 'graphql-tag';

export const paymentStatus = gql`
  query paymentStatus($incrementId: String!, $key: String!, $paymentMethod: PaymentServiceKey!) {
    paymentStatus(incrementId: $incrementId, key: $key, paymentServiceKey: $paymentMethod) {
      is_success
      response_code
      description
      order_id
      amount
      currency
      key
    }
  }
`;
