import gql from 'graphql-tag';

export const cartFragment = gql`
  fragment cartFragment on CartInterface {
    __typename
    id
    items_count
    items_qty
    guest_id
  }
`;
