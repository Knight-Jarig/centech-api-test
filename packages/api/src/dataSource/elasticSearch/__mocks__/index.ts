const ElasticSearch = jest.fn(() => {
  return {
    searchKeywordSuggestion: jest.fn(),
  };
});

export default ElasticSearch;
