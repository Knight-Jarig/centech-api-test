import gql from 'graphql-tag';
import { couponFragment } from '../fragment/couponFragment';

export const couponList = gql`
  query couponList($input: CouponInput!) {
    couponList(input: $input) {
      ...couponFragment
    }
  }
  ${couponFragment}
`