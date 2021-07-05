import gql from 'graphql-tag';

export const assignCoupon = gql`
  mutation assignCoupon($input: AssignCouponInput!) {
    assignCoupon(input: $input) {
      success
      errors
    }
  }
`

