import gql from 'graphql-tag';
import { productStorePriceFragment } from '../fragment/productStorePriceFragment';

export const pricePerStore = gql`
  query pricePerStore($input: PricePerStoreInput!) {
    pricePerStore(input: $input) {
      ...productStorePriceFragment
    }
  }
  ${productStorePriceFragment}
`;
