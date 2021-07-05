import gql from 'graphql-tag';

export const cardFragment = gql`
  fragment cardFragment on Card {
    id
    type
    masked_number
    is_default
    expiry_month
    expiry_year
    bank_id
    bank {
      name
      image
      icon
      color
      id
      active
    }
  }
`;
