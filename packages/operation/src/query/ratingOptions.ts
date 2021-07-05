import gql from 'graphql-tag';

export const ratingOptions = gql`
  query ratingOptions {
    ratingOptions {
      option_id
      rating_id
      code
      value
      position
      rating_code
    }
  }
`;
