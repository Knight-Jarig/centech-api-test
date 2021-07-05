const CmsDataSource = jest.fn(() => {
  return {
    getCmsV2: jest.fn(),
    getCmsV2Mobile: jest.fn(),
  };
});

export { CmsDataSource };
