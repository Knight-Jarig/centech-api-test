import gql from 'graphql-tag';

export const cmsBlockByIdentifier = gql`
  query cmsBlockByIdentifier($identifier: String!, $storeId: String!) {
    cmsBlockByIdentifier(identifier: $identifier, store_id: $storeId) {
      id
      content
      identifier
      active
      title
    }
  }
`;
