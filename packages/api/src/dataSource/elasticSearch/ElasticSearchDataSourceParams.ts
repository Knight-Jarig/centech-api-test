export interface ElasticSearchParamsKeywordSuggestion {
  id: string;
  params: ElasticSearchParamsKeywordSuggestionParams;
}

interface ElasticSearchParamsKeywordSuggestionParams {
  prefix: string;
  size: string;
}
