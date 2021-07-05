const DataLakeApi = jest.fn(() => {
  return {
    searchSuggestionTerms: jest.fn(),
    searchTrendingTerms: jest.fn(),
    productRecommendationByUser: jest.fn(),
    productRecommendationBySku: jest.fn(),
  };
});

export default DataLakeApi;
