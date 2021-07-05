import gql from 'graphql-tag';

export const deleteCouponResponse = gql`
  mutation deleteCouponResponse($isGuest: Boolean, $cartId: String) {
    deleteCoupon(isGuest: $isGuest, cartId: $cartId) {
      message
    }
  }
`;
