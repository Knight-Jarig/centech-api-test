import gql from 'graphql-tag';
import { cardFragment } from '../fragment/cardFragment'

export const cards = gql`
  query cards($sort: CardSort) {
    cards(sort: $sort) {
      ...cardFragment
    }
  }
  ${cardFragment}
`;
