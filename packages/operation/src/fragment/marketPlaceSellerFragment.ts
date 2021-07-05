import gql from 'graphql-tag';

export const marketPlaceSellerFragment = gql`
  fragment marketPlaceSellerFragment on MarketPlaceSeller {
    seller_id
    seller
    seller_url_key
  }
`;
