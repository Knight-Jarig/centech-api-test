import gql from 'graphql-tag';

export const brands = gql`
  query brands($filter: FilterGroups, $page: Int, $size: Int) {
    brands(input: { filterGroups: [$filter], page: $page, size: $size }) {
      brand_id
      name
      url_key
      logo
      meta_description
      meta_title
      extension_attributes {
        only_central
        position
        product_count
      }
    }
  }
`;
