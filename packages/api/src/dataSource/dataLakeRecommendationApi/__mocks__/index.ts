const DataLakeRecommendationApi = jest.fn(() => {
  return {
    productRecommendationByUser: jest.fn(),
    productRecommendationBySku: jest.fn(),
    productAssociationBySku: jest.fn(),
    productSimilarBySku: jest.fn(),
    productAssociationViewBySku: jest.fn(),
  };
});

export default DataLakeRecommendationApi;
