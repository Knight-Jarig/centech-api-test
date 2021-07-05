import gql from 'graphql-tag';
import { storeFragment } from '../fragment/storeFragment';

export const retailerByPostcode = gql`
  query retailerByPostcode($input: GetRetailerByPostcodeInput!) {
    retailerByPostcode(input: $input) {
      ...storeFragment
    }
  }
  ${storeFragment}
`;
