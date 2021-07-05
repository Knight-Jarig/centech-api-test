import gql from 'graphql-tag';
import { orderFragment } from '../fragment/orderFragment';

export const orderByIncrementId = gql`
  query orderByIncrementId($incrementId: String!, $key: String!) {
    orderByIncrementId(incrementId: $incrementId, key: $key) {
      ...orderFragment
      children {
        ...orderFragment
      }
    }
  }
  ${orderFragment}
`;
