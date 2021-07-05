import { ResolverContext } from '../../../types';
import {
  IQueryResolvers,
  IMutationResolvers,
  IResolvers,
  IV2T1ProfileDataResolvers as IT1ProfileDataResolvers,
} from '../../../types/graphql';
import { ApplicationError } from '../../../error/ApplicationError';

const V2T1ProfileData: IT1ProfileDataResolvers = {
  card: async root => {
    return {
      cardNo: root?.card?.[0]?.cardNo,
      pointsBalance: root?.card?.[0]?.pointsBalance,
      pointsExpiryThisYear: root?.card?.[0]?.pointsExpiryThisYear,
    };
  },
};

const Mutation: IMutationResolvers<ResolverContext> = {
  async v2ConnectT1Profile(_source, { t1Token }, { dataSources }) {
    try {
      return await dataSources.t1PassportUseCase.v2ConnectT1Profile(t1Token);
    } catch (e) {
      if (e?.extensions?.response?.status === 404) {
        throw ApplicationError.create(e);
      }
      throw e;
    }
  },
  async v2DeleteT1Profile(_source, _, { dataSources }) {
    try {
      return await dataSources.t1PassportUseCase.v2DeleteT1Profile();
    } catch (e) {
      if (e?.extensions?.response?.status === 404) {
        throw ApplicationError.create(e);
      }
      throw e;
    }
  },
  async v2LoginT1Passport(_source, { input: { t1Token, email, password, acceptConsents } }, { dataSources }) {
    try {
      if (!email && !password) {
        return await dataSources.t1PassportUseCase.v2LoginT1PassportCaseToken(t1Token);
      }
      if (email && !password) {
        return await dataSources.t1PassportUseCase.v2LoginT1PassportCaseEmail(t1Token, email, acceptConsents);
      }
      if (email && password) {
        return await dataSources.t1PassportUseCase.v2LoginT1PassportCasePassword(t1Token, email, password);
      }
    } catch (e) {
      if (e?.extensions?.response?.status === 404) {
        throw ApplicationError.create(e);
      }
      throw e;
    }
  },
};

const Query: IQueryResolvers<ResolverContext> = {
  async v2GetT1CustomerProfile(_source, { t1Token }, { dataSources }) {
    try {
      return await dataSources.t1PassportUseCase.v2GetT1CustomerProfile(t1Token);
    } catch (e) {
      if (e?.extensions?.response?.status === 404) {
        throw ApplicationError.create(e);
      }
      throw e;
    }
  },
  async v2CheckEmailRegistered(_source, { email }, { dataSources }) {
    try {
      return await dataSources.t1PassportUseCase.v2CheckEmailRegistered(email);
    } catch (e) {
      if (e?.extensions?.response?.status === 404) {
        throw ApplicationError.create(e);
      }
      throw e;
    }
  },
};

export const T1PassportResolvers: IResolvers = {
  V2T1ProfileData,
  Query,
  Mutation,
};
