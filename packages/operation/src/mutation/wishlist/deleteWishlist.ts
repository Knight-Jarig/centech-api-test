import gql from 'graphql-tag';

export const deleteWishlist = gql`
  mutation deleteWishlist($id: Int!) {
    deleteWishlist(id: $id)
  }
`;
