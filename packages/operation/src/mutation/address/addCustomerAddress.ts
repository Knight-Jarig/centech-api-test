import gql from 'graphql-tag';
import { addressFragment } from '../../fragment';

export const addCustomerAddress = gql`
  mutation addCustomerAddress($input: CreateCustomerAddress) {
    addCustomerAddress(input: $input) {
      ...addressFragment
    }
  }

  ${addressFragment}
`;
