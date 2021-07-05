import gql from 'graphql-tag';

export const assignCouponCampaign = gql`
  mutation assignCouponCampaign($input: AssignCouponCampaignInput!) {
    assignCouponCampaign(input: $input) {
      success
      errors
    }
  }
`;
