import gql from 'graphql-tag';

export const newsletter = gql`
  mutation newsletter($email: String!) {
    newsletter(email: $email)
  }
`;
