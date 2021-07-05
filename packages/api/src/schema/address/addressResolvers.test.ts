import AddressResolvers from './addressResolvers';
import { address } from '../../dataSource/magento/address/__mocks__/address';
import { ApolloError } from 'apollo-server';
import { ApplicationError } from '../../error/ApplicationError';

jest.mock('class-transformer-validator');

const mockDataSources = {
  customer: {
    getCustomer: () => new Promise(resolve => resolve(true)),
  },
  address: {
    createMagentoAddress: () => new Promise(resolve => resolve(true)),
    updateMagentoAddress: () => new Promise(resolve => resolve(true)),
    deleteMagentoAddress: () => new Promise(resolve => resolve(true)),
    getMagentoAddress: () => new Promise(resolve => resolve(true)),
  },
  google: {
    getPostcodeByLatLng: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesAddress = {
  magento: {
    customer: mockDataSources.customer,
    address: mockDataSources.address,
  },
  google: mockDataSources.google,
};

describe('AddressResolvers', () => {
  const customerAddressResult = AddressResolvers.CustomerAddressResult.custom_attributes as Function;
  const addCustomerAddress = AddressResolvers.Mutation.addCustomerAddress as Function;
  const editCustomerAddress = AddressResolvers.Mutation.editCustomerAddress as Function;
  const deleteCustomerAddress = AddressResolvers.Mutation.deleteCustomerAddress as Function;
  const getAddress = AddressResolvers.Query.getAddress as Function;
  const listAddresses = AddressResolvers.Query.listAddresses as Function;
  const postcodeByLatLng = AddressResolvers.Query.postcodeByLatLng as Function;

  const _source = {};
  const input = {};
  const dataSources = dataSourcesAddress;
  const storeCode = 'cds_th';
  const customerToken = '1234';

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('customerAddressResult', () => {
    it('customerAddressResult should run properly', async () => {
      const result = await customerAddressResult({});
      expect(result).toEqual(null);
    });
  });

  describe('addCustomerAddress', () => {
    it('addCustomerAddress should run properly', async () => {
      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: 1111 }));
      jest.spyOn(dataSources.magento.address, 'createMagentoAddress').mockReturnValue(Promise.resolve({}));
      await addCustomerAddress(_source, { input: address }, { dataSources, storeCode, customerToken });
      expect(dataSources.magento.customer.getCustomer).toBeCalledWith(storeCode);
      expect(dataSources.magento.address.createMagentoAddress).toBeCalled();
    });

    it('addCustomerAddress should run properly with no customerToken', async () => {
      const customerToken = null;
      await expect(() =>
        addCustomerAddress(_source, { input: address }, { dataSources, storeCode, customerToken }),
      ).rejects.toThrow(new ApplicationError('no permission'));
    });

    it('addCustomerAddress should run properly on Error case', async () => {
      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockRejectedValue([]);
      await expect(() =>
        addCustomerAddress(_source, { input: address }, { dataSources, storeCode, customerToken }),
      ).rejects.toThrow(new ApolloError('ValidationError', null, { validation: [] }));
    });

    it('addCustomerAddress should run properly on Error case which is not array', async () => {
      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockRejectedValue(new Error());
      await expect(() =>
        addCustomerAddress(_source, { input: address }, { dataSources, storeCode, customerToken }),
      ).rejects.toThrow(new Error());
    });
  });

  describe('editCustomerAddress', () => {
    it('editCustomerAddress should run properly', async () => {
      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: 1111 }));
      jest.spyOn(dataSources.magento.address, 'updateMagentoAddress').mockReturnValue(Promise.resolve({}));
      await editCustomerAddress(_source, { input: address }, { dataSources, storeCode, customerToken });
      expect(dataSources.magento.customer.getCustomer).toBeCalledWith(storeCode);
      expect(dataSources.magento.address.updateMagentoAddress).toBeCalled();
    });

    it('editCustomerAddress should run properly with no customerToken', async () => {
      const customerToken = null;
      await expect(() =>
        editCustomerAddress(_source, { input: address }, { dataSources, storeCode, customerToken }),
      ).rejects.toThrow(new ApplicationError('no permission'));
    });

    it('editCustomerAddress should run properly on Error case', async () => {
      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockRejectedValue([]);
      await expect(() =>
        editCustomerAddress(_source, { input: address }, { dataSources, storeCode, customerToken }),
      ).rejects.toThrow(new ApolloError('ValidationError', null, { validation: [] }));
    });

    it('editCustomerAddress should run properly on Error case which is not array', async () => {
      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockRejectedValue(new Error());
      await expect(() =>
        editCustomerAddress(_source, { input: address }, { dataSources, storeCode, customerToken }),
      ).rejects.toThrow(new Error());
    });
  });

  describe('deleteCustomerAddress', () => {
    it('deleteCustomerAddress should run properly', async () => {
      jest
        .spyOn(dataSources.magento.customer, 'getCustomer')
        .mockReturnValue(Promise.resolve({ addresses: [{ id: 1 }] }));
      jest.spyOn(dataSources.magento.address, 'deleteMagentoAddress').mockReturnValue(Promise.resolve({}));
      await deleteCustomerAddress(_source, { input: { address_id: 1 } }, { dataSources, storeCode, customerToken });
      expect(dataSources.magento.customer.getCustomer).toBeCalledWith(storeCode);
      expect(dataSources.magento.address.deleteMagentoAddress).toBeCalled();
    });

    it('deleteCustomerAddress should run properly with no customerToken', async () => {
      const customerToken = null;
      await expect(() =>
        deleteCustomerAddress(_source, { input: address }, { dataSources, storeCode, customerToken }),
      ).rejects.toThrow(new ApplicationError('no permission'));
    });

    it('deleteCustomerAddress should run properly on Error case', async () => {
      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(null));
      jest.spyOn(dataSources.magento.address, 'deleteMagentoAddress').mockReturnValue(Promise.resolve({}));
      await expect(() =>
        deleteCustomerAddress(_source, { input: { address_id: 1 } }, { dataSources, storeCode, customerToken }),
      ).rejects.toThrow(new ApplicationError('no permission, this address is not belong to this account'));
    });
  });

  describe('getAddress', () => {
    it('getAddress should run properly', async () => {
      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: 1 }));
      jest.spyOn(dataSources.magento.address, 'getMagentoAddress').mockReturnValue(Promise.resolve({ customer_id: 1 }));
      await getAddress(_source, { input: { address_id: 1 } }, { dataSources, storeCode, customerToken });
      expect(dataSources.magento.customer.getCustomer).toBeCalledWith(storeCode);
      expect(dataSources.magento.address.getMagentoAddress).toBeCalled();
    });

    it('getAddress should run properly with no customerToken', async () => {
      const customerToken = null;
      await expect(() =>
        getAddress(_source, { input: address }, { dataSources, storeCode, customerToken }),
      ).rejects.toThrow(new ApplicationError(`you don't have permission to access this resource.`));
    });

    it('getAddress should run properly on Error case', async () => {
      jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: 1 }));
      jest.spyOn(dataSources.magento.address, 'getMagentoAddress').mockReturnValue(Promise.resolve({ customer_id: 2 }));
      await expect(() =>
        getAddress(_source, { input: { address_id: 1 } }, { dataSources, storeCode, customerToken }),
      ).rejects.toThrow(new ApplicationError(`you don't have permission to access this resource.`));
    });
  });

  describe('listAddresses', () => {
    it('listAddresses should run properly', async () => {
      jest
        .spyOn(dataSources.magento.customer, 'getCustomer')
        .mockReturnValue(Promise.resolve({ addresses: [{ id: 1 }] }));
      await listAddresses(_source, { input: { address_id: 1 } }, { dataSources, storeCode, customerToken });
      expect(dataSources.magento.customer.getCustomer).toBeCalledWith(storeCode);
    });

    it('listAddresses should run properly with no customerToken', async () => {
      const customerToken = null;
      await expect(() =>
        listAddresses(_source, { input: address }, { dataSources, storeCode, customerToken }),
      ).rejects.toThrow(new ApplicationError(`auth fail`));
    });
  });

  describe('postcodeByLatLng', () => {
    it('postcodeByLatLng should run properly', async () => {
      const input = { lat: 1, lng: 2 };
      jest
        .spyOn(dataSources.google, 'getPostcodeByLatLng')
        .mockReturnValue(Promise.resolve({ addresses: [{ id: 1 }] }));
      await postcodeByLatLng(_source, input, { dataSources });
      expect(dataSources.google.getPostcodeByLatLng).toBeCalled();
    });
  });
});
