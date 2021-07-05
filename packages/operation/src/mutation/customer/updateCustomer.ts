import gql from 'graphql-tag';

export const updateCustomer = gql`
  mutation updateCustomer($input: UpdateInputCustomer) {
    updateCustomer(input: $input) {
      id
    }
  }
`;
