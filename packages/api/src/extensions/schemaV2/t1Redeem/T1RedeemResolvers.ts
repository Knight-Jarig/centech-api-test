import { IQueryResolvers, IMutationResolvers, IResolvers, IV2T1RedeemResponseResolvers } from '../../../types/graphql';
import configs from '../../../configs/vars';

const Mutation: IMutationResolvers = {
  async v2T1RedeemLogin(_source, { input }, { dataSources }) {
    return dataSources.t1RedeemUseCase.login(input);
  },
  async v2T1Redeem(_source, { input }, { dataSources, redisClient }) {
    return dataSources.t1RedeemUseCase.redeem(input, redisClient);
  },
  async v2T1RedeemVerify(_source, { input }, { dataSources, redisClient }) {
    return dataSources.t1RedeemUseCase.verify(input, redisClient);
  },
  async v2T1RefreshToken(_source, { input }, { dataSources }) {
    return dataSources.t1RedeemUseCase.refreshToken( input );
  }
};

const Query: IQueryResolvers = {
  async v2T1RedeemProfile(_source, { input }, { dataSources }) {
    return dataSources.t1RedeemUseCase.profile(input);
  },
};

const V2T1RedeemResponse: IV2T1RedeemResponseResolvers = {
  noVerifyPointLimit: () => configs.t1Redeem.noVerifyPointLimit,
};

export const T1RedeemResolvers: IResolvers = {
  Query,
  Mutation,
  V2T1RedeemResponse,
};
