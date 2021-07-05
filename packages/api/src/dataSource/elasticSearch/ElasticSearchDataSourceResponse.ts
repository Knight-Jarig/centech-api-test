export interface ElasticSearchKeywordSuggestion {
  took: number;
  timed_out: boolean;
  _shards: ElasticSearchShard;
  hits: ElasticSearchHit;
  suggest: ElasticSearchKeywordSuggestionSuggest;
}

export interface ElasticSearchKeywordSuggestionSuggest {
  'tag-suggest': ElasticSearchKeywordSuggestionTagSuggest[];
}

export interface ElasticSearchKeywordSuggestionTagSuggest {
  text: string;
  offset: number;
  length: number;
  options: ElasticSearchKeywordSuggestionTagSuggestOption[];
}

export interface ElasticSearchKeywordSuggestionTagSuggestOption {
  text: string;
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  contexts: ElasticSearchKeywordSuggestionContexts;
}

export interface ElasticSearchKeywordSuggestionContexts {
  context: string[];
}

export interface ElasticSearchHit {
  total: ElasticSearchHitsTotal;
  max_score: any;
  hits: any;
}

export interface ElasticSearchHitsTotal {
  value: number;
  relation: string;
}

export interface ElasticSearchShard {
  total: number;
  successful: number;
  skipped: number;
  failed: number;
}
