import gql from 'graphql-tag';

export const deleteCartItem = gql`
  mutation deleteCartItem($item_id: String!, $guest: String) {
    deleteCartItem(guest: $guest, item_id: $item_id) {
      success
      message
    }
  }
`;
