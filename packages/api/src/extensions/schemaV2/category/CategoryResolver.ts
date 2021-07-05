import { IQueryResolvers, IResolvers, IV2Category } from '../../../types/graphql';
import { ResolverContext } from '../../../types';

const Query: IQueryResolvers<ResolverContext> = {
  async v2Categories(_source, _, { dataSources }): Promise<IV2Category[]> {
    const categories = await dataSources.categoryUseCase.getCategories();
    return categories;
  },
};

export const CategoryResolver: IResolvers = {
  Query,
};
