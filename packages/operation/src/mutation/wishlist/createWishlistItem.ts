import gql from 'graphql-tag';

export const createWishlistItem = gql`
  mutation createWishlistItem($input: CreateWishlistItemInput!, $customerId: Int) {
    createWishlistItem(input: $input, customer_id: $customerId) {
      wishlist_item_id
      product_name
      product_id
#      sku
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
