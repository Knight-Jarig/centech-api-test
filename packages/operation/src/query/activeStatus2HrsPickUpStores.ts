import gql from 'graphql-tag';

export const activeStatus2HrsPickUpStores = gql`
  query activeStatus2HrsPickUpStores($sku: String) {
    getStatusActivePickupStore(sku: $sku) {
      status
    }
  }
`;
