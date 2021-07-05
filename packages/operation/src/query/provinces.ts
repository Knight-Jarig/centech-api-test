import gql from 'graphql-tag';

export const provinces = gql`
  query provinces($storeCode: String) {
    regions(storeCode: $storeCode) {
      region_id
      country_id
      code
      default_name
      sort_order
      name
    }
  }
`;
