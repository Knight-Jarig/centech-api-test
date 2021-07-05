import gql from 'graphql-tag';
import { storeFragment } from '../fragment/storeFragment';

export const storeWithStockLevel = gql`
  query storeWithStockLevel($sku: String!) {
    storeWithStockLevel(sku: $sku) {
      __typename
      ...storeFragment
      stock_level
    }
  }
  ${storeFragment}
`;
