import gql from 'graphql-tag';

export const postcodeByLatLng = gql`
  query postcodeByLatLng($lat: String!, $lng: String!) {
    postcodeByLatLng(lat: $lat, lng: $lng) {
      postcode
    }
  }
`;
