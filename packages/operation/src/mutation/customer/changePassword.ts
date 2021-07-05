import gql from 'graphql-tag';

export const changePassword = gql`
  mutation changePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(input: { currentPassword: $currentPassword, newPassword: $newPassword }) {
      message
    }
  }
`;
