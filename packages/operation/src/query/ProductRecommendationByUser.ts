import gql from 'graphql-tag';

export const productRecommendationByUser = gql`
  query productRecommendationByUser($customerId: String, $limit: Int) {
    productRecommendationByUser(customerId: $customerId, limit: $limit)
  }
`;
