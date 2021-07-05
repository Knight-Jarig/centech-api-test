import { ResolverContext } from '../../types';
import { IConsentType, IMutationResolvers, IQueryResolvers } from '../../types/graphql';

const Query: IQueryResolvers<ResolverContext> = {
  async consentInfo(_source, _input, { dataSources, locale }) {
    const transformFormat = (data, storeCode) => ({
      marketing: data.marketing_display_text[storeCode],
      privacy_policy: data.privacy_policy[storeCode],
      version: data.consent_privacy_version,
    });
    const result = await dataSources.consent.getConsentInfo();
    return transformFormat(result, locale);
  },
};

const Mutation: IMutationResolvers<ResolverContext> = {
  async consent(_, { input }, { dataSources, customerToken, storeCode }) {
    const isGuest = !customerToken;
    const { cartId, email, accept_consents } = input;

    const [customer, consentInfo] = await Promise.all([
      isGuest ? { id: `cart-ID:${cartId}`, email } : dataSources.magento.customer.getCustomer(storeCode),
      dataSources.consent.getConsentInfo(),
    ]);

    await dataSources.consent.createCustomerConsent({
      ref_id: customer.id,
      email: customer.email,
      consent_privacy_version: consentInfo?.consent_privacy_version,
      consent_privacy_status: accept_consents.includes(IConsentType.Privacy),
      consent_marketing_status: accept_consents.includes(IConsentType.Marketing),
    });

    customer.need_reaccept_consents = false;
    return isGuest ? null : customer;
  },
};

export default {
  Query,
  Mutation,
};
