import ConsentResolvers from './consentResolvers';

const mockDataSources = {
  customer: {
    getCustomer: () => new Promise(resolve => resolve(true)),
  },
  consent: {
    getConsentInfo: () => new Promise(resolve => resolve(true)),
    createCustomerConsent: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesAddress = {
  magento: {
    customer: mockDataSources.customer,
  },
  consent: mockDataSources.consent,
};

describe('ConsentResolvers', () => {
  const consentInfo = ConsentResolvers.Query.consentInfo as Function;
  const consent = ConsentResolvers.Mutation.consent as Function;

  const _source = {};
  const input = {
    cartId: '1234',
    email: 'email@gmail.com',
    accept_consents: [],
  };
  const dataSources = dataSourcesAddress;
  const storeCode = 'cds_th';
  const customerToken = '1234';
  const locale = 'th';

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('ConsentResolvers', () => {
    describe('consentInfo', () => {
      it('consentInfo should run properly', async () => {
        jest.spyOn(dataSources.consent, 'getConsentInfo').mockReturnValue(
          Promise.resolve({
            marketing_display_text: { th: 'th', en: 'en' },
            privacy_policy: { th: 'th', en: 'en' },
            consent_privacy_version: '1.0.0',
          }),
        );
        await consentInfo(_source, null, { dataSources, locale });
        expect(dataSources.consent.getConsentInfo).toBeCalled();
      });
    });

    describe('consent', () => {
      it('consent should run properly', async () => {
        jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(
          Promise.resolve({
            id: '1234',
            email: 'email@gmail.com',
            need_reaccept_consents: true,
          }),
        );
        jest.spyOn(dataSources.consent, 'getConsentInfo').mockReturnValue(
          Promise.resolve({
            marketing_display_text: { th: 'th', en: 'en' },
            privacy_policy: { th: 'th', en: 'en' },
            consent_privacy_version: '1.0.0',
          }),
        );
        await consent(_source, { input }, { dataSources, customerToken, storeCode });
        expect(dataSources.magento.customer.getCustomer).toBeCalled();
        expect(dataSources.consent.getConsentInfo).toBeCalled();
      });
    });

    it('consent should run properly with no customer token', async () => {
      const customerToken = null;
      jest.spyOn(dataSources.consent, 'getConsentInfo').mockReturnValue(
        Promise.resolve({
          marketing_display_text: { th: 'th', en: 'en' },
          privacy_policy: { th: 'th', en: 'en' },
          consent_privacy_version: '1.0.0',
        }),
      );
      await consent(_source, { input }, { dataSources, customerToken, storeCode });
      expect(dataSources.consent.getConsentInfo).toBeCalled();
    });
  });
});
