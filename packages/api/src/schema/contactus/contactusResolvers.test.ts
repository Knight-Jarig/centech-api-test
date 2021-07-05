import ContactusResolvers from './contactusResolvers';

const mockDataSources = {
  contact: {
    contactUs: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesAddress = {
  magento: {
    contact: mockDataSources.contact,
  },
};

describe('AddressResolvers', () => {
  const contactUs = ContactusResolvers.Mutation.contactUs as Function;

  const _source = {};
  const contact = 1;
  const input = { contact };
  const dataSources = dataSourcesAddress;
  const storeCode = 'cds_th';

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('ContactusResolvers', () => {
    it('contactUs should run properly', async () => {
      jest.spyOn(dataSources.magento.contact, 'contactUs').mockReturnValue(Promise.resolve({}));
      await contactUs(_source, { input }, { dataSources, storeCode });
      expect(dataSources.magento.contact.contactUs).toBeCalledWith({ contact }, storeCode);
    });
  });
});
