import gql from 'graphql-tag';

export const register = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      message
    }
  }
`;
