const CatalogServiceDataSource = jest.fn(() => {
  return {
    suggestSearch: jest.fn(),
    legacySearch: jest.fn(),
    findProductDetailByIdNew: jest.fn(),
    findProductDetailBySkuNew: jest.fn(),
    findByIdNew: jest.fn(),
    findBySkusNew: jest.fn(),
    search: jest.fn(),
    findById: jest.fn(),
    findBySku: jest.fn(),
  };
});

export { CatalogServiceDataSource };
