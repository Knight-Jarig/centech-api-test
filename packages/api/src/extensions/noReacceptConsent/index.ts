import { ICustomerResolvers, IResolvers } from '../../types/graphql';

const typeDef = '';

const Customer: ICustomerResolvers = {
  need_reaccept_consents: async ({ need_reaccept_consents, email, id }, _input, { dataSources }) => {
    if (typeof need_reaccept_consents !== 'undefined') return need_reaccept_consents;

    const { consent_privacy_status, consent_marketing_status } = await dataSources.consent.checkConsentInfo({
      email: email,
      ref_id: id.toString(),
    });

    const hasCompletedConsent =
      typeof consent_privacy_status === 'boolean' && typeof consent_marketing_status === 'boolean';

    return !hasCompletedConsent;
  },
};

const resolver: IResolvers = {
  Customer,
};

export { typeDef, resolver };
