import gql from 'graphql-tag';

export const districtsByProvinceId = gql`
  query districtsByProvinceId($storeCode: String, $regionId: String) {
    districts(input: { regionId: $regionId }, storeCode: $storeCode) {
      district_id
      country_id
      region_id
      region_code
      code
      default_name
      name
    }
  }
`;
