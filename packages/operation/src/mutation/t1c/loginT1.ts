import gql from 'graphql-tag';

export const loginT1 = gql`
  mutation loginT1($email: String!, $password: String!, $isGuest: Boolean, $guestToken: String) {
    loginT1(input: { email: $email, password: $password }, isGuest: $isGuest, guestToken: $guestToken) {
      points
      points_used
      card_no
      conversion_rate
      min_allowed_points
      max_allowed_points
    }
  }
`;
