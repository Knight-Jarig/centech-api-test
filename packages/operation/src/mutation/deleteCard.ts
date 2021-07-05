import gql from 'graphql-tag';

export const deleteCard = gql`
  mutation deleteCard($cardId: String!) {
    deleteCard(cardId: $cardId)
  }
`;
