import gql from 'graphql-tag';

export const vipWithToken = gql`
  query vipWithToken($token: String!) {
    vipWithToken(token: $token) {
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