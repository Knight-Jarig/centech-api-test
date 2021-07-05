import gql from 'graphql-tag';

export const repayment = gql`
  mutation repayment($card: CardInput, $saved_card: SavedCardInput, $incrementId: String!) {
    repayment(card: $card, saved_card: $saved_card, incrementId: $incrementId) {
      order
      message
      request_form {
        url
        payload {
          paymentRequest
        }
      }
    }
  }
`;
