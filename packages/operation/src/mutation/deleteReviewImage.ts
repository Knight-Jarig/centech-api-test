import gql from 'graphql-tag';

export const deleteReviewImage = gql`
  mutation deleteReviewImage($input: DeleteImageInput!) {
    deleteReviewImage(input: $input)
  }
`;
