import { ResolverContext } from '../../../types';
import {
  IQueryResolvers,
  IResolvers,
  IV2SuggestSearchResultResolvers as ISuggestSearchResultResolvers,
  IV2SuggestSearchResult as ISuggestSearchResult,
  IV2SuggestSearchInput as ISuggestSearchInput,
} from '../../../types/graphql';
import { ApplicationError } from '../../../error/ApplicationError';

interface ISuggestSearchResultWithInput extends ISuggestSearchResult {
  input: ISuggestSearchInput;
}

const SuggestSearchResult: ISuggestSearchResultResolvers<ResolverContext, ISuggestSearchResultWithInput> = {
  suggestionTerms: (root, { input }, { dataSources }) => {
    const payload = input || root.input;
    const { suggestionTermSize: size, keyword } = payload || {};
    return dataSources.suggestSearchUseCase.searchSuggestionTerms(keyword, size);
  },
};

const Query: IQueryResolvers<ResolverContext> = {
  async v2SuggestSearch(_, { input }, { dataSources }): Promise<ISuggestSearchResultWithInput> {
    if (!input || input?.keyword === '') throw new ApplicationError('keyword is require');
    return {
      ...(await dataSources.suggestSearchUseCase.suggestSearch(input)),
      input, // Pass to suggestionTerms resolver
    };
  },
  async v2SuggestKeywordSearch(_, { input }, { dataSources }): Promise<string[]> {
    return dataSources.suggestSearchUseCase.searchKeywordSuggestion(input.keyword, input.size);
  },
  async v2TrendSearch(_, { size }, { dataSources }) {
    const trendingTerms = await dataSources.suggestSearchUseCase.searchTrendingTerms(size);
    return { trendingTerms };
  },
};

export const SuggestSearchResolvers: IResolvers = {
  Query,
  V2SuggestSearchResult: SuggestSearchResult,
};
