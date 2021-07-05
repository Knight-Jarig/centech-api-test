import { SuggestSearchResolvers } from './SuggestSearchResolvers';

describe('Suggest Search Resolvers', () => {
  const dataSources = {
    suggestSearchUseCase: { searchKeywordSuggestion: jest.fn() },
  };

  describe('Query v2SuggestKeywordSearch', () => {
    const v2SuggestKeywordSearch = SuggestSearchResolvers.Query.v2SuggestKeywordSearch as Function;

    it(`v2SuggestKeywordSearch should have to be called with expect input`, async () => {
      const input = {
        keyword: 'nike',
        size: 5,
      };

      await v2SuggestKeywordSearch(null, { input }, { dataSources });
      expect(dataSources.suggestSearchUseCase.searchKeywordSuggestion).toBeCalledWith(input.keyword, input.size);
    });
  });
});
