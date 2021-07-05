import { ResolverContext } from '../../types';
import {
  IConsentType,
  IMutationResolvers,
  IPaymentInformations,
  IQueryResolvers,
  ISetMultiPaymentResponse,
  ISetPaymentInfoResponse,
} from '../../types/graphql';
import { encrypt } from '../../utils/crypto.utils';
import { ApplicationError } from '../../error/ApplicationError';

const Query: IQueryResolvers<ResolverContext> = {
  async paymentInformations(_source, { cartId, isGuest }, { dataSources, storeCode }): Promise<IPaymentInformations> {
    const getResult = async () => {
      if (isGuest) {
        return await dataSources.magento.cartGuest.getPaymentInformation(cartId, storeCode);
      } else if (cartId) {
        return await dataSources.magento.cartId.getPaymentInformation(cartId, storeCode);
      }
      return await dataSources.magento.cart.getPaymentInformation(storeCode);
    }
    const result = await getResult();

    return {
      ...result,
      extension_attributes: {
        ...result?.extension_attributes,
        is_payment_promotion_locked: result.extension_attributes?.is_payment_promotion_locked === '1',
      },
    };
  },
};

const Mutation: IMutationResolvers<ResolverContext> = {
  async setPaymentInformation(
    _source,
    { cartId, isGuest, input },
    { dataSources, storeCode },
  ): Promise<ISetPaymentInfoResponse> {
    const { accept_consents = [], billing_address, payment_method, email, remark, substitution } = input;
    const payload = {
      billing_address,
      payment_method,
      email,
      remark,
      substitution,
    };
    const setData = async () => {
      if (isGuest) {
        return await dataSources.magento.cartGuest.setPaymentInformation(payload, cartId, storeCode);
      } else if (cartId) {
        return await dataSources.magento.cartId.setPaymentInformation(payload, cartId, storeCode);
      }
      return await dataSources.magento.cart.setPaymentInformation(payload, storeCode);
    }
    const { data, redirect_url } = await setData();
    let urlToRedirect = redirect_url;
    const isRedirect = /<!doctype html>/.test(data);
    if (!isRedirect) {
      const order = await dataSources.magento.order.fetchOrder(data, storeCode);
      urlToRedirect = `/${order.increment_id}/${encrypt(order.increment_id)}`;
    }
    // Check Consent Info
    (async () => {
      try {
        const [customer, consentInfo] = await Promise.all([
          isGuest
            ? { id: `cart-ID:${cartId}`, email: payload.email }
            : dataSources.magento.customer.getCustomer(storeCode),
          dataSources.consent.getConsentInfo(),
        ]);
        const userConsent = isGuest
          ? await dataSources.consent.checkConsentInfo({ ref_id: customer.id, email: customer.email })
          : null;
        const isCustomerAlreadyAcceptConsent =
          userConsent?.content?.consent_privacy_version === consentInfo?.consent_privacy_version;

        if (isCustomerAlreadyAcceptConsent) throw new ApplicationError('Customer already accept consent.');
        await dataSources.consent.createCustomerConsent({
          ref_id: customer.id,
          email: customer.email,
          consent_privacy_version: consentInfo?.consent_privacy_version,
          consent_privacy_status: accept_consents.includes(IConsentType.Privacy),
          consent_marketing_status: accept_consents.includes(IConsentType.Marketing),
        });
      } catch (error) {
        console.error(error);
      }
    })();

    return {
      message: 'success',
      order: data,
      redirect_url: urlToRedirect,
    };
  },
  async updatePaymentInformation(
    _source,
    { cartId, isGuest, input },
    { dataSources, storeCode },
  ): Promise<ISetPaymentInfoResponse> {
    const response = isGuest
      ? await dataSources.magento.cartGuest.updatePaymentInformation(input, cartId, storeCode)
      : cartId
      ? await dataSources.magento.cartId.updatePaymentInformation(input, cartId, storeCode)
      : await dataSources.magento.cart.updatePaymentInformation(input, storeCode);
    return {
      message: 'success',
      order: response,
    };
  },
  async updateMultiplePaymentInformation(
    _source,
    { input },
    { dataSources, storeCode },
  ): Promise<ISetMultiPaymentResponse> {
    const response = await dataSources.magento.cartId.updateMultiplePaymentInformation(input, storeCode);

    return { statusPayment: response };
  },
};

export default {
  Query,
  Mutation,
};
