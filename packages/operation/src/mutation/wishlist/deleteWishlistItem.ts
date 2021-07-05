import gql from 'graphql-tag';

export const deleteWishlistItem = gql`
  mutation deleteWishlistItem($id: Int!) {
    deleteWishlistItem(id: $id)
  }
`;
