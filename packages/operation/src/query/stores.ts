import gql from 'graphql-tag';
import { storeFragment } from '../fragment/storeFragment';

export const stores = gql`
  query stores {
    getStores {
      __typename
      ...storeFragment
    }
  }
  ${storeFragment}
`;
