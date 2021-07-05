import { AddressUseCase } from './AddressUseCase';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { mockCustomerAddressesEmpty, mockCustomerAddresses, mockAddressesResult } from './__mocks__/Address';

jest.mock('../../../dataSource/magento/MagentoDataSource');

describe('Address Usecase', () => {
  const magento = new MagentoDataSource();
  const addressUseCase = new AddressUseCase({ magento });
  const storeCode = 'cds_th';
  const customerToken = 'customer_token';
  const bu = 'cds';

  describe('getAddresses', () => {
    it('Should return empty customer addresses', async () => {
      addressUseCase.initialize({
        context: {
          storeCode,
          customerToken,
          bu,
        },
      });

      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomerAddressesEmpty) as any);
      const result = await addressUseCase.getAddresses();
      expect(result).toEqual([]);
    });

    it('Should return customer addresses', async () => {
      addressUseCase.initialize({
        context: {
          storeCode,
          customerToken,
          bu,
        },
      });

      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomerAddresses) as any);
      const result = await addressUseCase.getAddresses();
      expect(result).toEqual(mockAddressesResult);
    });

    it('Should throw error when empty customerToken', async () => {
      addressUseCase.initialize({
        context: {
          storeCode,
          customerToken: '',
          bu,
        },
      });

      await expect(() => addressUseCase.getAddresses()).rejects.toThrow();
    });
  });
});
