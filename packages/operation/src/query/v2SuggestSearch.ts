import gql from 'graphql-tag';

export const v2SuggestSearch = gql`
  query v2SuggestSearch($input: V2SuggestSearchInput) {
    v2SuggestSearch(input: $input) {
      products {
        id
        type
        name
        sku
        urlKey
        overlayImageUrl
        thumbnailUrl
        brand {
          id
          name
          urlKey
        }
        priceSummary {
          original
          final
          discount {
            amount
            percentage
            effectiveDateRange {
              from
              to
            }
          }
        }
      }
      categories {
        id
        name
        parentId
        urlPath
        isGtm
      }
      suggestionTerms(input: $input)
    }
  }
`;
