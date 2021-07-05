import gql from 'graphql-tag';
import { cardFragment } from '../fragment/cardFragment';

export const createCard = gql`
  mutation createCard($cardInput: CardInput!, $setDefault: Boolean!) {
    createCard(cardInput: $cardInput, setDefault: $setDefault) {
      ...cardFragment
    }
  }
  ${cardFragment}
`;
