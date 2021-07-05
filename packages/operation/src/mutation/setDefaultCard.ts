import gql from 'graphql-tag';
import { cardFragment } from '../fragment/cardFragment'

export const setDefaultCard = gql`
  mutation setDefaultCard($cardId: String!) {
    setDefaultCard(cardId: $cardId){
      ...cardFragment
    }
  }
  ${cardFragment}
`;
