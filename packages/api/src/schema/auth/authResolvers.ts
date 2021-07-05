import get from 'lodash/get';
import { ResolverContext } from '../../types';
import {
  IConsentType,
  ICustomer,
  ILoginResponse,
  IMutationResolvers,
  IRegister,
  IResponseMessage,
} from '../../types/graphql';
import { sign } from 'jsonwebtoken';
import configs from '../../configs/vars';
import { mapGender } from '../../utils/customer.utils';
import { ApplicationError } from '../../error/ApplicationError';

const Mutation: IMutationResolvers<ResolverContext> = {
  async login(
    _source,
    { input: { username, password, guestToken, is_jwt } },
    { dataSources, storeCode },
  ): Promise<ILoginResponse> {
    let data;
    try {
      data = await dataSources.magento.auth.getCustomerToken({
        username,
        password,
      });
    } catch (e) {
      if (e?.extensions?.response?.status === 401) {
        throw ApplicationError.create(e);
      }
      throw e;
    }

    if (guestToken) {
      try {
        await dataSources.magento.cart.mergeGuestCart(data, guestToken);
      } catch {
        try {
          await dataSources.magento.cart.createCartMine(data, storeCode);
          await dataSources.magento.cart.mergeGuestCart(data, guestToken);
        } catch (error) {
          console.error(error);
        }
      }
    }

    if (is_jwt) {
      data = sign({ token: data }, configs.jwt.secret);
    }

    return {
      token: data,
    };
  },
  async forgotPassword(_source, { storeCode, email }, { dataSources }): Promise<IResponseMessage> {
    try {
      const data = await dataSources.magento.auth.forgotPassword({
        storeCode,
        email,
      });

      return {
        message: data ? 'success' : 'error',
      };
    } catch (error) {
      return {
        message: get(error, 'extensions.response.body.message', 'error'),
      };
    }
  },
  async resetPassword(
    _source,
    { input: { newPassword, email, resetToken } },
    { dataSources },
  ): Promise<IResponseMessage> {
    try {
      const data = await dataSources.magento.auth.resetPassword({
        email,
        newPassword,
        resetToken,
      });

      return {
        message: data ? 'success' : 'error',
      };
    } catch (error) {
      return {
        message: get(error, 'extensions.response.body.message', 'error'),
      };
    }
  },
  async facebookLogin(_source, { social_id, customerToken }, { dataSources, storeCode }): Promise<ILoginResponse> {
    if (!social_id) {
      throw new ApplicationError('social_facebook_app_id is not defined');
    }

    const data = await dataSources.magento.auth.facebookLogin({
      social_id: social_id,
      social_type: 'facebook',
    });

    if (customerToken) {
      try {
        await dataSources.magento.cart.mergeGuestCart(data, customerToken);
      } catch {
        try {
          await dataSources.magento.cart.createCartMine(data, storeCode);
          await dataSources.magento.cart.mergeGuestCart(data, customerToken);
        } catch (error) {
          console.error(error);
        }
      }
    }

    return {
      token: data,
    };
  },
  async register(
    _source,
    {
      input: {
        firstname,
        lastname,
        password,
        email,
        is_subscribed,
        storeId,
        dob,
        gender,
        tax_id,
        phone,
        language,
        t1c_no,
        t1c_phone,
        custom_attributes,
        accept_consents = [],
      },
    },
    { dataSources, storeCode },
  ): Promise<IRegister> {
    const customerData = {
      customer: {
        firstname,
        lastname,
        email,
        storeId,
        dob,
        gender: mapGender(gender),
        taxvat: tax_id,

        extension_attributes: {
          is_subscribed: is_subscribed || false,
        },
        custom_attributes: {
          phone,
          language,
          t1c_no,
          t1c_phone,
          ...custom_attributes,
        },
      },
      password,
    };

    const data: ICustomer = await dataSources.magento.auth.register({
      customer: customerData,
      storeCode,
    });
    const consentInfo = await dataSources.consent.getConsentInfo().catch(e => console.error(e));
    const consentInput = {
      email,
      ref_id: data.id.toString(),
      consent_privacy_version: consentInfo?.consent_privacy_version,
      consent_privacy_status: accept_consents.includes(IConsentType.Privacy),
      consent_marketing_status: accept_consents.includes(IConsentType.Marketing),
    };
    dataSources.consent
      .createCustomerConsent(consentInput)
      .then(res => {
        if (!res?.uuid) {
          console.error('createCustomerConsent fail.');
        }
      })
      .catch(e => console.error(e));

    return {
      data: data,
      message: 'success',
    };
  },
  async lazyRegister(
    _source,
    { input: { firstname, lastname, password, email, is_subscribed, storeId, orderId, accept_consents } },
    { dataSources },
  ): Promise<IRegister> {
    const lazyIRegisterData = {
      customer: {
        firstname,
        lastname,
        email,
        storeId,
        extension_attributes: {
          is_subscribed: is_subscribed || false,
        },
      },
      password,
      orderId,
    };
    const data = await dataSources.magento.auth.lazyRegister(lazyIRegisterData);
    const consentInfo = await dataSources.consent.getConsentInfo().catch(e => console.error(e));
    const consentInput = {
      email,
      ref_id: data.id.toString(),
      consent_privacy_version: consentInfo?.consent_privacy_version,
      consent_privacy_status: accept_consents.includes(IConsentType.Privacy),
      consent_marketing_status: accept_consents.includes(IConsentType.Marketing),
    };
    dataSources.consent
      .createCustomerConsent(consentInput)
      .then(res => {
        if (!res?.uuid) {
          console.error('createCustomerConsent fail.');
        }
      })
      .catch(e => console.error(e));
    return {
      data: data,
      message: 'success',
    };
  },
};

export default {
  Mutation,
};
