import gql from 'graphql-tag';

export const uploadReviewImage = gql`
  mutation uploadReviewImage($input: UploadImageInput!) {
    uploadReviewImage(input: $input) {
      error
      items {
        error
        message
        path
      }
    }
  }
`;
