import gql from 'graphql-tag';

export const v2TrendingSearch = gql`
  query v2TrendingSearch($size: Int) {
    v2TrendSearch(size: $size) {
      trendingTerms
    }
  }
`;
