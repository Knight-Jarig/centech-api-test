import gql from 'graphql-tag';

export const forgotPassword = gql`
  mutation forgotPassword($storeCode: String, $email: String!) {
    forgotPassword(storeCode: $storeCode, email: $email) {
      message
    }
  }
`;
