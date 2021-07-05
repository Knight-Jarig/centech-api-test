import get from 'lodash/get';
import { ResolverContext } from '../../types';
import { explode } from '../../utils/attribute.utils';
import AddressModel from '../../transform/address.model';
import {
  ICustomerAddress,
  ICustomerAddressResult,
  ICustomerAddressResultResolvers,
  IDeleteCustomerAddressResult,
  IMutationResolvers,
  IPostcodeResult,
  IQueryResolvers,
} from '../../types/graphql';
import { transformAndValidate } from 'class-transformer-validator';
import { Address } from '../customer/models/Address';
import { ApolloError } from 'apollo-server';
import { PostCustomerAddressesRequestBody } from '../../dataSource/magento/address/request/PostCustomerAddressesRequestBody';
import { PutCustomerAddressesIdRequestBody } from '../../dataSource/magento/address/request/PutCustomerAddressesIdRequestBody';
import { ApplicationError } from '../../error/ApplicationError';

const CustomerAddressResult: ICustomerAddressResultResolvers<ResolverContext> = {
  custom_attributes: _source => {
    const dataExploded = explode(_source);
    return get(dataExploded, 'custom_attributes', null);
  },
};

const Mutation: IMutationResolvers<ResolverContext> = {
  async addCustomerAddress(_source, { input }, { dataSources, storeCode, customerToken }): Promise<ICustomerAddress> {
    if (!customerToken) {
      throw new ApplicationError('no permission');
    }

    try {
      const customer = await dataSources.magento.customer.getCustomer(storeCode);
      const address = await transformAndValidate(PostCustomerAddressesRequestBody, {
        ...input,
        customer_id: customer.id,
      });

      const response = await dataSources.magento.address.createMagentoAddress(address as any);

      const result = await transformAndValidate(Address, response);

      return result;
    } catch (error) {
      if (Array.isArray(error)) {
        throw new ApolloError('ValidationError', null, { validation: error });
      }

      throw error;
    }
  },
  async editCustomerAddress(_source, { input }, { dataSources, storeCode, customerToken }) {
    if (!customerToken) {
      throw new ApplicationError('no permission');
    }

    try {
      const customer = await dataSources.magento.customer.getCustomer(storeCode);
      const address = await transformAndValidate(PutCustomerAddressesIdRequestBody, {
        ...input,
        customer_id: customer.id,
      });

      const response = await dataSources.magento.address.updateMagentoAddress(address as any);

      const result = await transformAndValidate(Address, response);

      return result;
    } catch (error) {
      if (Array.isArray(error)) {
        throw new ApolloError('ValidationError', null, { validation: error });
      }

      throw error;
    }
  },
  async deleteCustomerAddress(
    _source,
    { input: { address_id } },
    { dataSources, customerToken, storeCode },
  ): Promise<IDeleteCustomerAddressResult> {
    if (!customerToken) {
      throw new ApplicationError('no permission');
    }

    const customer = await dataSources.magento.customer.getCustomer(storeCode);

    const isAddressAvailableForCustomer =
      customer && customer.addresses && customer.addresses.find(customerAddress => +customerAddress.id === +address_id);

    if (!isAddressAvailableForCustomer) {
      throw new ApplicationError('no permission, this address is not belong to this account');
    }

    const magentoAddress = await dataSources.magento.address.deleteMagentoAddress(address_id);
    return magentoAddress === true ? { is_success: true } : { is_success: false, message: magentoAddress };
  },
};

const Query: IQueryResolvers<ResolverContext> = {
  async getAddress(
    _source,
    { input: { address_id } },
    { dataSources, customerToken, storeCode },
  ): Promise<ICustomerAddressResult> {
    if (!customerToken) {
      throw new ApplicationError(`you don't have permission to access this resource.`);
    }
    const customer = await dataSources.magento.customer.getCustomer(storeCode);
    const address = await dataSources.magento.address.getMagentoAddress(address_id);
    const addressCustomerId = get(address, 'customer_id');
    const customerId = get(customer, 'id');

    if (addressCustomerId !== customerId) {
      throw new ApplicationError(`you don't have permission to access this resource.`);
    }

    return AddressModel.transformMagentoAddressToAddress(address);
  },
  async listAddresses(_source, data, { dataSources, storeCode, customerToken }): Promise<ICustomerAddressResult[]> {
    if (!customerToken) throw new ApplicationError('auth fail');
    const customer = await dataSources.magento.customer.getCustomer(storeCode);
    return customer.addresses.map(AddressModel.transformMagentoAddressToAddress);
  },
  async postcodeByLatLng(_source, { lat, lng }, { dataSources }): Promise<IPostcodeResult> {
    const postcode = await dataSources.google.getPostcodeByLatLng(lat, lng);
    return { postcode };
  },
};

export default {
  CustomerAddressResult,
  Mutation,
  Query,
};
