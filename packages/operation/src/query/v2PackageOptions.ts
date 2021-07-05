import gql from 'graphql-tag';
import { packageOptionFragment } from '../fragment/packageOptionFragment';

export const v2PackageOptions = gql`
  query v2PackageOptions($cartId: String, $storeId: String!) {
    v2PackageOptions(cartId: $cartId, storeId: $storeId) {
      ...packageOptionFragment
    }
  }

  ${packageOptionFragment}
`;
