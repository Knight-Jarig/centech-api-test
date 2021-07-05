import { typeDef, resolver } from './index';

const mockDataSources = {
  consent: {
    checkConsentInfo: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesConsent = {
  consent: mockDataSources.consent,
};

describe('cartWithLineItem', () => {
  const needReacceptConsents = resolver.Customer.need_reaccept_consents as Function;

  const params = {
    id: 1234,
    email: 'email@gmail.com',
    need_reaccept_consents: undefined,
  };
  const dataSources = dataSourcesConsent;

  it('needReacceptConsents should run properly', async () => {
    jest
      .spyOn(dataSources.consent, 'checkConsentInfo')
      .mockReturnValue(Promise.resolve({ consent_privacy_status: true, consent_marketing_status: true }));
    await needReacceptConsents(params, null, { dataSources });
    expect(dataSources.consent.checkConsentInfo).toBeCalledWith({ email: params.email, ref_id: params.id.toString() });
  });

  it('needReacceptConsents should run properly with need_reaccept_consents', async () => {
    const params = {
      id: 1234,
      email: 'email@gmail.com',
      need_reaccept_consents: true,
    };
    const result = await needReacceptConsents(params, null, { dataSources });
    expect(result).toEqual(params.need_reaccept_consents);
  });
});
