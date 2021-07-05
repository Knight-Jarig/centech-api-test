import gql from 'graphql-tag';
import { couponRuleFragment } from '../fragment/couponRuleFragment';

export const couponCampaignList = gql`
  query couponCampaignList($campaignName: String!) {
    couponCampaignList(campaignName: $campaignName) {
      rule {
        ...couponRuleFragment
      }
      remaining_count
      coupon_image
    }
  }
  ${couponRuleFragment}
`;
