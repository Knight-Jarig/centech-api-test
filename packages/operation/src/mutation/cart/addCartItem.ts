import gql from 'graphql-tag';

export const addCartItem = gql`
  mutation addCartItem($isGuest: Boolean, $cartId: String, $input: AddToCartInput!) {
    addCartItem(isGuest: $isGuest, cartId: $cartId, input: $input) {
      item_id
      sku
      qty
      extension_attributes {
        quote_id_to_update
      }
    }
  }
`;
