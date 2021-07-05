import gql from 'graphql-tag';

export const socialLogin = gql`
  mutation socialLogin($input: SocialLoginInput!) {
    socialLogin(input: $input) {
      token
    }
  }
`;
