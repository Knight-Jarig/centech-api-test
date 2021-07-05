import gql from 'graphql-tag';

export const review = gql`
  mutation review($input: ReviewInput!, $storeCode: String) {
    addReview(storeCode: $storeCode, input: $input) {
      success
    }
  }
`;
