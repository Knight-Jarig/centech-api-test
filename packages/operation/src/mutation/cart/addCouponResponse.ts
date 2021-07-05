import gql from 'graphql-tag';

export const addCouponResponse = gql`
  mutation addCouponResponse($coupon: String, $isGuest: Boolean, $cartId: String) {
    addCoupon(coupon: $coupon, isGuest: $isGuest, cartId: $cartId) {
      message
      valid_coupon
      invalid_coupon
    }
  }
`;
