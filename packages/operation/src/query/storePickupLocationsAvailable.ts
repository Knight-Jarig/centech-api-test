import gql from 'graphql-tag';
import { pickUpLocationAddressFragment } from '../fragment/pickUpLocationAddressFragment';

export const storePickupLocationsAvailable = gql`
  query storePickupLocationsAvailable($sku: String!, $limit: Int, $offset: Int, $filterKeyword: String, $filterLocation: PickupStoreLocationFilterLatLng) {
    storePickupLocationsAvailable(
      sku: $sku,
      limit: $limit,
      offset: $offset
      filter: {
        keyword: $filterKeyword,
        location: $filterLocation,
      }
    ) {
      id
      name
      storeCode
      isActive
      address {
        ...pickUpLocationAddressFragment
      }
      openingHours {
        day
        openTime
        closeTime
      }
      image
      allowPickAtStore
      isDisplayAsStoreInformation
      storePickup {
        stockId
        allowIspu
        allowSts
      }
      stockStatusCode
      stockStatusLabel
      distance {
        text
        value
      }
    }
  }
  ${pickUpLocationAddressFragment}
`;
