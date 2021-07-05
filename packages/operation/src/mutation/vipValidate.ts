import gql from 'graphql-tag';

export const vipValidate = gql`
  mutation vipValidate($input: VipValidateInput!) {
    vipValidate(input: $input) {
      status
      url
      email
      phone
      name
      ids
      need_assistance
      token
      t1No
    }
  }
`