import gql from 'graphql-tag';

export const pickUpLocationAddressFragment = gql`
  fragment pickUpLocationAddressFragment on PickupStoreLocationAddress {
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
`;
