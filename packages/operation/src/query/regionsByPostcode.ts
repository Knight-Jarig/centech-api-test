import gql from 'graphql-tag';

export const regionsByPostcode = gql`
  query regionsByPostcode($postcode: String) {
    regionByPostCode(input: { postcode: $postcode }) {
      region_id
      code
      country_id
      name
      district {
        district_id
        country_id
        region_id
        region_code
        code
        name
        subdistrict {
          subdistrict_id
          code
          country_id
          district_id
          district_code
          name
        }
      }
    }
  }
`;
