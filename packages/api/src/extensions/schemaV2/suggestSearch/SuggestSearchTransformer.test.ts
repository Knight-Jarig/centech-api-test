import { transformKeywordSuggestions } from './SuggestSearchTransformer';
import {
  mockSearchKeywordSuggestionElasticSearchResult,
  mockSearchKeywordSuggestionResult,
} from './__mocks__/SuggestSearchUseCase';

describe('SuggestSearchTransformer', () => {
  describe('transformKeywordSuggestions', () => {
    it('Should return data as expect', () => {
      const result = transformKeywordSuggestions(mockSearchKeywordSuggestionElasticSearchResult);
      expect(result).toEqual(mockSearchKeywordSuggestionResult);
    });

    it('Should return empty array when data is null', () => {
      const result = transformKeywordSuggestions(null);
      expect(result).toEqual([]);
    });
  });
});
