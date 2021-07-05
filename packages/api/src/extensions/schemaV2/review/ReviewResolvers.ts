import { ResolverContext } from '../../../types';
import { IMutationResolvers, IResolvers, IResponseMessage } from '../../../types/graphql';

const Mutation: IMutationResolvers<ResolverContext> = {
  async v2AddReview(_, { input }, { dataSources }): Promise<IResponseMessage> {
    await dataSources.reviewUseCase.addReview(input);

    return {
      status: true,
    };
  },
};

export const ReviewResolvers: IResolvers = {
  Mutation,
};
