import gql from 'graphql-tag';

export const deletePoint = gql`
  mutation deletePoint($isGuest: Boolean, $cartId: String) {
    deletePoint(isGuest: $isGuest, cartId: $cartId) {
      message
    }
  }
`;
