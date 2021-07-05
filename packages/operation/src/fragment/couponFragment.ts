import gql from 'graphql-tag';
import { couponRuleFragment } from '../fragment/couponRuleFragment';

export const couponFragment = gql`
  fragment couponFragment on CouponResponse {
    rules {
      rule {
        ...couponRuleFragment
      }
      current_coupon
      remaining_count
      coupon_expiration_date
      time_used
    }
  }
  ${couponRuleFragment}
`;
