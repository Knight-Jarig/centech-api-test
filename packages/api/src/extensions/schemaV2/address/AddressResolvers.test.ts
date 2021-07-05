import { AddressResolvers } from './AddressResolvers';
import { createDataSources } from '../../../dataSource/';

jest.mock('../../../dataSource');
jest.mock('../../../dataSource/magento/MagentoDataSource');

describe('Address Resolvers', () => {
  const dataSources = createDataSources();
  dataSources.addressUseCase = {
    getAddresses: jest.fn(),
    setValidatePin: jest.fn(),
  } as any;

  describe(`Query: v2Addresses`, () => {
    const v2Addresses = AddressResolvers.Query.v2Addresses as Function;

    it(`Query: v2Addresses`, async () => {
      await v2Addresses(null, null, { dataSources });
      expect(dataSources.addressUseCase.getAddresses).toHaveBeenCalled();
    });
  });
});
