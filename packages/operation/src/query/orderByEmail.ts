import gql from 'graphql-tag';
import { orderFragment } from '../fragment/orderFragment';

export const orderByEmail = gql`
  query orderByEmail($incrementId: String!, $email: String!) {
    orderByEmail(incrementId: $incrementId, email: $email) {
      ...orderFragment
      children {
        ...orderFragment
      }
    }
  }
  ${orderFragment}
`;
