import gql from 'graphql-tag';

export const lazyRegister = gql`
  mutation lazyRegister($input: LazyRegisterInput!) {
    lazyRegister(input: $input) {
      message
    }
  }
`;
