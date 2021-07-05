import gql from 'graphql-tag';
import { storeFragment } from '../fragment/storeFragment';

export const retailerById = gql`
  query retailerById($input: GetRetailerByIdInput!) {
    retailerById(input: $input) {
      ...storeFragment
    }
  }
  ${storeFragment}
`;
