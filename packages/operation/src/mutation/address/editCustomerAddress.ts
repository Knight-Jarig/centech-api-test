import gql from 'graphql-tag';
import { addressFragment } from '../../fragment';

export const editCustomerAddress = gql`
  mutation editCustomerAddress($input: EditCustomerAddress) {
    editCustomerAddress(input: $input) {
      ...addressFragment
    }
  }

  ${addressFragment}
`;
