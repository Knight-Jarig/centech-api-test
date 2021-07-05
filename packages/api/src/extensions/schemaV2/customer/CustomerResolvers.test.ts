import { CustomerResolvers } from './CustomerResolvers';

const mockDataSources = {
  customerUseCase: {
    customer: () => new Promise(resolve => resolve(true)),
    updateCustomerT1: () => new Promise(resolve => resolve(true)),
    updateCustomerT1ById: () => new Promise(resolve => resolve(true)),
  },
  consent: {
    getConsentInfo: () => new Promise(resolve => resolve(true)),
    checkConsentInfo: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesCustomer = {
  customerUseCase: mockDataSources.customerUseCase,
  consent: mockDataSources.consent,
};

describe('customerResolvers on schemaV2', () => {
  const v2Customer = CustomerResolvers.Query.v2Customer as Function;
  const v2UpdateCustomerT1 = CustomerResolvers.Mutation.v2UpdateCustomerT1 as Function;
  const v2UpdateCustomerT1ById = CustomerResolvers.Mutation.v2UpdateCustomerT1ById as Function;
  const needReacceptConsents = CustomerResolvers.V2Customer.needReacceptConsents as Function;

  const _source = {};
  const params = {
    input: {
      email: 'email',
      firstname: 'firstname',
      lastname: 'lastname',
      websiteId: '1',
      t1cNumber: '1234',
      t1ApiVersion: '2',
    },
  };
  const paramWithId = {
    input: {
      id: '111',
      email: 'email',
      firstname: 'firstname',
      lastname: 'lastname',
      websiteId: '1',
      t1cNumber: '1234',
      t1ApiVersion: '2',
    },
  }
  const dataSources = dataSourcesCustomer;

  it('customer should run properly', async () => {
    jest.spyOn(dataSources.customerUseCase, 'customer').mockReturnValue(Promise.resolve([]));
    await v2Customer(_source, params, { dataSources });
    expect(dataSources.customerUseCase.customer).toBeCalled();
  });

  it('customer throw error', async () => {
    jest.spyOn(dataSources.customerUseCase, 'customer').mockImplementation(() => {
      throw new Error();
    });
    expect(async () => await v2Customer(_source, params, { dataSources })).rejects.toThrowError(new Error());
  });

  it('updateCustomerT1 should run properly', async () => {
    jest.spyOn(dataSources.customerUseCase, 'updateCustomerT1').mockReturnValue(Promise.resolve([]));
    await v2UpdateCustomerT1(_source, params, { dataSources });
    expect(dataSources.customerUseCase.updateCustomerT1).toBeCalled();
  });

  it('updateCustomerT1 throw error', async () => {
    jest.spyOn(dataSources.customerUseCase, 'updateCustomerT1').mockImplementation(() => {
      throw new Error();
    });
    expect(async () => await v2UpdateCustomerT1(_source, params, { dataSources })).rejects.toThrowError(new Error());
  });

  it('needReacceptConsents should run properly', async () => {
    const _source = {
      id: 1,
      email: 'email',
    };
    jest
      .spyOn(dataSources.consent, 'getConsentInfo')
      .mockReturnValue(Promise.resolve({ consent_privacy_version: '1' }));
    jest
      .spyOn(dataSources.consent, 'checkConsentInfo')
      .mockReturnValue(
        Promise.resolve({ consent_privacy_version: '1', consent_privacy_status: true, consent_marketing_status: true }),
      );
    await needReacceptConsents(_source, params, { dataSources });
    expect(dataSources.consent.getConsentInfo).toBeCalled();
    expect(dataSources.consent.checkConsentInfo).toBeCalled();
  });

  it('updateCustomerT1ById should run properly', async () => {
    jest.spyOn(dataSources.customerUseCase, 'updateCustomerT1ById').mockReturnValue(Promise.resolve([]));
    await v2UpdateCustomerT1ById(_source, paramWithId, { dataSources });
    expect(dataSources.customerUseCase.updateCustomerT1ById).toBeCalled();
  });

  it('updateCustomerT1ById throw error', async () => {
    jest.spyOn(dataSources.customerUseCase, 'updateCustomerT1ById').mockImplementation(() => {
      throw new Error();
    });
    expect(async () => await v2UpdateCustomerT1ById(_source, paramWithId, { dataSources })).rejects.toThrowError(new Error());
  });
});
