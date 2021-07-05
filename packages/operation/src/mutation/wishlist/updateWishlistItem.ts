import gql from 'graphql-tag';

export const updateWishlistItem = gql`
  mutation updateWishlistItem($input: UpdateWishlistItemInput!) {
    updateWishlistItem(input: $input) {
      wishlist_item_id
      product_name
      product_id
      qty
      store_id
      custom_attributes {
        attribute_code
        name
        value
      }
    }
  }
`;
