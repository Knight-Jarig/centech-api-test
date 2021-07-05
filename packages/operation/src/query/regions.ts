import gql from 'graphql-tag';

export const regions = gql`
  query regions($storeCode: String) {
    regions(storeCode: $storeCode) {
      region_id
      country_id
      code
      default_name
      name
      sort_order
    }
  }
`;
