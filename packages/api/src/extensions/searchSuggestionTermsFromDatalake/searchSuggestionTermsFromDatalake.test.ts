import { typeDef, resolver } from './index';

const mockDataSources = {
  dataLake: {
    searchSuggestionTerms: () => new Promise(resolve => resolve(true)),
  },
  catalogService: {
    getSearchSuggestion: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesOrder = {
  dataLake: mockDataSources.dataLake,
  magento: {
    catalogService: mockDataSources.catalogService,
  },
};

describe('cartWithLineItem', () => {
  const searchSuggestion = resolver.Query.searchSuggestion as Function;

  const keyword = 'keyword';
  const _source = {};
  const params = {
    searchTermsInput: { termsSize: 1, keyword },
  };
  const dataSources = dataSourcesOrder;
  const locale = 'th';

  it('searchSuggestion should run properly', async () => {
    jest.spyOn(dataSources.dataLake, 'searchSuggestionTerms').mockReturnValue(Promise.resolve(['1', '2', '3']));
    jest.spyOn(dataSources.magento.catalogService, 'getSearchSuggestion').mockReturnValue(Promise.resolve([]));
    await searchSuggestion(_source, params, { dataSources, locale });
    expect(dataSources.dataLake.searchSuggestionTerms).toBeCalledWith(keyword, locale);
  });
});
