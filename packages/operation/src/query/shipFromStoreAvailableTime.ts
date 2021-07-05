import gql from 'graphql-tag';

export const shipFromStoreAvailableTime = gql`
  query shipFromStoreAvailableTime {
    getShipFromStoreAvailableTime {
      available_from
      available_to
    }
}
`;