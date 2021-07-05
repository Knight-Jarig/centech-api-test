import gql from 'graphql-tag';

export const resetPassword = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      message
    }
  }
`;
