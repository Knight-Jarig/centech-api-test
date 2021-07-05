import { IResolvers } from '../../types/graphql';
import ProductsResolvers from '../../schema/products/productsResolvers';

const typeDef = '';

const resolver: IResolvers = {
  Query: {
    async searchSuggestion(...params) {
      const defaultResolver = ProductsResolvers.Query.searchSuggestion as any;
      const [, { searchTermsInput }, { dataSources, locale }] = params;

      const { termsSize, keyword } = searchTermsInput;
      const [data, keywordResponse] = await Promise.all([
        defaultResolver(...params),
        dataSources.dataLake.searchSuggestionTerms(keyword, locale),
      ]);

      return {
        ...data,
        terms: keywordResponse.slice(0, termsSize).map(text => ({
          text,
          score: 0,
          frequency: 0,
        })),
      };
    },
  },
};

export { typeDef, resolver };
