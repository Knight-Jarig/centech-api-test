import gql from 'graphql-tag';

export const subDistrictsByProvinceId = gql`
  query subDistrictsByProvinceId($storeCode: String, $regionId: String, $districtId: String) {
    subDistricts(input: { regionId: $regionId, districtId: $districtId }, storeCode: $storeCode) {
      subdistrict_id
      country_id
      district_id
      district_code
      zip_code
      code
      default_name
      name
    }
  }
`;
