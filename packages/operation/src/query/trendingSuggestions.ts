import gql from 'graphql-tag';

export const trendingSuggestions = gql`
  query trendingSuggestions($input: String!) {
    searchTrending(storeCode: $input) {
      text
      score
      frequency
    }
  }
`;
