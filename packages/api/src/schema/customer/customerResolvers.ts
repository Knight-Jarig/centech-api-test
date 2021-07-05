import { ResolverContext } from '../../types';
import { explode, filterByKeys } from '../../utils/attribute.utils';
import get from 'lodash/get';
import {
  IChangePasswordResponse,
  ICustomerAddress,
  ICustomerResolvers,
  IMutationResolvers,
  IQueryResolvers,
} from '../../types/graphql';
import { transformAndValidate } from 'class-transformer-validator';
import { Address } from './models/Address';
import { ApolloError } from 'apollo-server';
import { mapGender } from '../../utils/customer.utils';
import { fromCustomAttributes } from '../../utils/transformer';

const Customer: ICustomerResolvers = {
  need_reaccept_consents: async (root, _input, { dataSources }) => {
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

    const isReaccept = userVersion !== currentVersion || !hasDoneConsent;

    return isReaccept;
  },
  async addresses(_source): Promise<ICustomerAddress[]> {
    try {
      const addresses = await transformAndValidate(Address, _source.addresses);

      return addresses;
    } catch (error) {
      if (Array.isArray(error)) {
        throw new ApolloError('ValidationError', null, { validation: error });
      }

      throw error;
    }
  },
  custom_attributes(_source): Promise<Record<string, any>> {
    const dataExploded = explode(_source);
    return get(dataExploded, 'custom_attributes', {});
  },
  is_subscribed: ({ extension_attributes }) => extension_attributes?.is_subscribed || false,
  tax_id: ({ taxvat }) => taxvat,
  phone: fromCustomAttributes({ key: 'phone' }).bind(null, null),
  t1c_no: fromCustomAttributes({ key: 't1c_no' }).bind(null, null),
  t1c_phone: fromCustomAttributes({ key: 't1c_phone' }).bind(null, null),
  language: fromCustomAttributes({ key: 'language', defaultValue: 'th' }).bind(null, null),
  gender: ({ gender }) => {
    return mapGender(gender);
  },
};

const Query: IQueryResolvers<ResolverContext> = {
  async customer(_source, data, { dataSources, storeCode }) {
    return await dataSources.magento.customer.getCustomer(storeCode);
  },
};

const Mutation: IMutationResolvers<ResolverContext> = {
  async updateCustomer(_source, { input }, { dataSources }) {
    const extension_attributes = filterByKeys(input, ['is_subscribed'], input.extension_attributes);
    const custom_attributes = filterByKeys(
      input,
      ['phone', 't1c_no', 't1c_phone', 'language'],
      input.custom_attributes,
    );
    const { gender, tax_id, taxvat } = input;
    const param = {
      ...input,
      gender: mapGender(gender),
      taxvat: tax_id || taxvat,
      extension_attributes,
      custom_attributes,
    };

    return await dataSources.magento.customer.update({ customer: param });
  },
  async changePassword(
    _source,
    { input: { currentPassword, newPassword } },
    { dataSources },
  ): Promise<IChangePasswordResponse> {
    const response = await dataSources.magento.customer.changePassword({
      currentPassword,
      newPassword,
    });
    return { message: response ? 'success' : 'error' };
  },
};

export default {
  Customer,
  Query,
  Mutation,
};
