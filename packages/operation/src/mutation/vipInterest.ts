import gql from 'graphql-tag';

export const vipInterest = gql`
  mutation vipInterest($input: VipInterestInput!) {
    vipInterest(input: $input) {
      status
      email
      phone
      name
      ids
      need_assistance
    }
  }
`