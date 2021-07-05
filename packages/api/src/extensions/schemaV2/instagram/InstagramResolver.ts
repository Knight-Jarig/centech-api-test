
import { ResolverContext } from '../../../types';
import {
  IQueryResolvers,
  IResolvers,
  IV2InstagramPostsResponse
} from '../../../types/graphql';
import { ApplicationError } from '../../../error/ApplicationError';

const Query: IQueryResolvers<ResolverContext> = {
  async v2GetInstagramPosts(_source, _, { dataSources }): Promise<IV2InstagramPostsResponse[]> {
    try {
      return await dataSources.instagramUseCase.v2InstagramPosts();
    } catch (e) {
      if (e?.extensions?.response?.status === 404) {
        throw ApplicationError.create(e);
      }
      throw e;
    }
  }
};

export const InstagramResolvers: IResolvers = {
  Query
};
