import gql from 'graphql-tag';
import { storeConfigFragment } from '../fragment/storeConfigFragment'

export const storeConfigs = gql`
  query storeConfigs {
    storeConfigs {
     ...storeConfigFragment
    }
  }
  ${storeConfigFragment}
`;
