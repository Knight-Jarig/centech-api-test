import { ReviewResolvers } from './ReviewResolvers';

describe('Review Resolvers', () => {
  const dataSources = {
    reviewUseCase: { addReview: jest.fn() },
  };

  describe('Query v2AddReview', () => {
    const v2SuggestKeywordSearch = ReviewResolvers.Mutation.v2AddReview as Function;

    it(`v2AddReview should have to be called with expect input`, async () => {
      const input = {
        name: 'wanwan',
        email: 'wantip@central.tech',
        title: 'Great product!',
        detail: '',
        ratingOption: {
          optionId: 20,
          ratingId: 4,
        },
        sku: 'CDS20283674',
      };

      const result = await v2SuggestKeywordSearch(null, { input }, { dataSources });

      expect(dataSources.reviewUseCase.addReview).toBeCalledWith(input);
      expect(result).toEqual({
        status: true,
      });
    });
  });
});
