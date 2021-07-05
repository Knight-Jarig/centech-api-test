import gql from 'graphql-tag';

export const editCartItem = gql`
  mutation editCartItem($id: String, $isGuest: Boolean, $item_id: String!, $input: EditCartItemInput!) {
    editCartItem(id: $id, isGuest: $isGuest, item_id: $item_id, input: $input) {
      item_id
      sku
      qty
      name
      price
      product_type
      quote_id
    }
  }
`;
