import gql from 'graphql-tag';
import { couponFragment } from '../fragment/couponFragment';

export const customerCouponList = gql`
  query customerCouponList($input: CustomerCouponInput!) {
    customerCouponList(input: $input) {
      ...couponFragment
      total_page
      total_count
      current_page
    }
  }
  ${couponFragment}
`