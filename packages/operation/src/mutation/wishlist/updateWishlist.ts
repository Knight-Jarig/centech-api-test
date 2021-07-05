import gql from 'graphql-tag';

export const updateWishlist = gql`
  mutation updateWishlist($input: UpdateWishlistInput!) {
    updateWishlist(input: $input) {
      wishlist_id
      customer_id
      items {
        wishlist_item_id
        product_name
        product_id
        qty
        store_id
        description
      }
    }
  }
`;
