import gql from 'graphql-tag';

export const vipNeedAssistance = gql`
  mutation vipNeedAssistance($input: VipNeedAssistanceInput!) {
    vipNeedAssistance(input: $input) {
      status
      urls
    }
  }
`