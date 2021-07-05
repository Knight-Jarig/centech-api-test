import gql from 'graphql-tag';

export const subscribe = gql`
  mutation subscribe($email: String!) {
    subscribe(email: $email) {
      success
      message
    }
  }
`;
