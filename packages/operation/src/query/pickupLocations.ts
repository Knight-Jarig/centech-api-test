import gql from 'graphql-tag';

export const pickupLocations = gql`
  query pickupLocations($sku: String!) {
    pickupLocations(sku: $sku) {
      id
      name
      storeCode
      isActive
      address {
        streetNumber
        building
        soi
        street
        district
        districtId
        subDistrict
        subDistrictId
        region
        regionId
        postcode
        contactNumber
        countryCode
        city
        latitude
        longitude
      }
      openingHours {
        day
        openTime
        closeTime
      }
      image
      allowPickAtStore
      isDisplayAsStoreInformation
      salableItems {
        sku
        qty
      }
      storePickup {
        stockId
        allowIspu
        allowSts
      }
      additionalText {
        methodCode
        methodLabelCode
        timeValue
        timeUnit
        datetime
        totalAvailable
        totalOrdered
      }
      cutOffTime
    }
  }
`;
