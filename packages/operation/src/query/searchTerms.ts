import gql from 'graphql-tag';

export const searchTerms = gql`
  query searchTerms($input: SearchTermsInput) {
    searchSuggestion(searchTermsInput: $input) {
      products {
        id
        title
        image
        url
        brand_name
        price
        count
        sku
        final_price
        original_price
        custom_attributes
      }
      terms {
        text
        score
        frequency
      }
      categories {
        breadcrumb
        count
        id
        level
        title
        url
      }
    }
  }
`;
