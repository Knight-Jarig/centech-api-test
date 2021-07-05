import gql from 'graphql-tag';

export const cmsBlocks = gql`
  query cmsBlocks($identifier: String!, $storeId: String!) {
    cmsBlocks(
      input: {
        filterGroups: [{ filters: [{ field: "identifier", value: $identifier }] }, { filters: [{ field: "store_id", value: $storeId }] }]
        size: 1
        page: 1
      }
    ) {
      id
      content
      identifier
      active
    }
  }
`;
