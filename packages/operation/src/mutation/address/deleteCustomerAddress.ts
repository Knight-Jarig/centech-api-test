import gql from 'graphql-tag';

export const deleteCustomerAddress = gql`
  mutation deleteCustomerAddress($addressId: Int) {
    deleteCustomerAddress(input: { address_id: $addressId }) {
      is_success
    }
  }
`;
