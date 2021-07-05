import { ResolverContext } from '../../../types';
import { IQueryResolvers, IMutationResolvers, IResolvers, IV2CustomerResolvers } from '../../../types/graphql';
import { ApplicationError } from '../../../error/ApplicationError';

const V2Customer: IV2CustomerResolvers = {
  needReacceptConsents: async (root, _input, { dataSources }) => {
    const data = {
      email: root.email,
      ref_id: root.id.toString(),
    };
    const getConsentInfoAPI = dataSources.consent.getConsentInfo();
    const checkConsentInfoAPI = dataSources.consent.checkConsentInfo(data);
    const [currentConsent, userConsent] = await Promise.all([getConsentInfoAPI, checkConsentInfoAPI]);
    const currentVersion = currentConsent?.consent_privacy_version;
    const userVersion = userConsent?.content?.consent_privacy_version || userConsent?.consent_privacy_version;
    const hasDoneConsent = userConsent?.consent_privacy_status && userConsent?.consent_marketing_status;

    return userVersion !== currentVersion || !hasDoneConsent;
  },
};

const Query: IQueryResolvers<ResolverContext> = {
  async v2Customer(_source, _, { dataSources }) {
    try {
      return await dataSources.customerUseCase.customer();
    } catch (e) {
      if (e?.extensions?.response?.status === 404) {
        throw ApplicationError.create(e);
      }
      throw e;
    }
  },
};

const Mutation: IMutationResolvers<ResolverContext> = {
  async v2UpdateCustomerT1(_source, { input }, { dataSources }) {
    try {
      const data = {
        customerProfile: {
          email: input.email,
          firstname: input.firstname,
          lastname: input.lastname,
          websiteId: input.websiteId,
        },
        t1cNumber: input.t1cNumber,
        t1ApiVersion: input.t1ApiVersion,
      };
      return await dataSources.customerUseCase.updateCustomerT1(data);
    } catch (e) {
      if (e?.extensions?.response?.status === 404) {
        throw ApplicationError.create(e);
      }
      throw e;
    }
  },

  async v2UpdateCustomerT1ById(_source, { input }, { dataSources }) {
    try {
      const data = {
        id: input.id,
        customerProfile: {
          email: input.email,
          firstname: input.firstname,
          lastname: input.lastname,
          websiteId: input.websiteId,
        },
        t1cNumber: input.t1cNumber,
        t1ApiVersion: input.t1ApiVersion,
      };
      return await dataSources.customerUseCase.updateCustomerT1ById(data);
    } catch (e) {
      if (e?.extensions?.response?.status === 404) {
        throw ApplicationError.create(e);
      }
      throw e;
    }
  },
};

export const CustomerResolvers: IResolvers = {
  V2Customer,
  Query,
  Mutation,
};
