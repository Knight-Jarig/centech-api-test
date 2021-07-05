import gql from 'graphql-tag';

export const burnPoint = gql`
  mutation burnPoint($points: Float!, $isGuest: Boolean, $cartId: String) {
    burnPoint(points: $points, isGuest: $isGuest, cartId: $cartId) {
      message
    }
  }
`;
