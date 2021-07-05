import gql from 'graphql-tag';
import { packageOptionFragment } from '../fragment/packageOptionFragment';

export const v2DeliveryPackageOptions = gql`
  query v2DeliveryPackageOptions($cartId: String, $input: V2DeliveryPackageOptionInput!) {
    v2DeliveryPackageOptions(cartId: $cartId, input: $input) {
      ...packageOptionFragment
    }
  }

  ${packageOptionFragment}
`;
