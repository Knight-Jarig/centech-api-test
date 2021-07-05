import gql from 'graphql-tag';

export const facebookLogin = gql`
  mutation facebookLogin($social_id: String!, $customerToken: String) {
    facebookLogin(social_id: $social_id, customerToken: $customerToken) {
      token
    }
  }
`;
