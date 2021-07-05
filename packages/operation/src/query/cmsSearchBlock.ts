import gql from 'graphql-tag';

export const cmsSearchBlock = gql`
  query cmsSearchBlock($identifier: String!, $storeId: String!) {
    cmsBlocks(
      input: {
        filterGroups: [
          { filters: [{ field: "identifier", value: $identifier, conditionType: in }] }
          { filters: [{ field: "store_id", value: $storeId }] }
          { filters: [{ field: "is_active", value: "1" }] }
        ]
      }
    ) {
      id
      identifier
      content
    }
  }
`;
