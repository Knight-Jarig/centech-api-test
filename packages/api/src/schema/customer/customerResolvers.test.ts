import CustomerResolvers from './customerResolvers';

const mockDataSources = {
  customer: {
    getCustomer: () => new Promise(resolve => resolve(true)),
    update: () => new Promise(resolve => resolve(true)),
    changePassword: () => new Promise(resolve => resolve(true)),
  },
  consent: {
    getConsentInfo: () => new Promise(resolve => resolve(true)),
    checkConsentInfo: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesCategory = {
  magento: {
    customer: mockDataSources.customer,
  },
  consent: mockDataSources.consent,
};

describe('CustomerResolver', () => {
  const queryCustomer = CustomerResolvers.Query.customer as Function;
  const mutationUpdateCustomer = CustomerResolvers.Mutation.updateCustomer as Function;
  const mutationChangePassword = CustomerResolvers.Mutation.changePassword as Function;
  const customerNeedReacceptConsents = CustomerResolvers.Customer.need_reaccept_consents as Function;
  const customerAddresses = CustomerResolvers.Customer.addresses as Function;
  const customerCustomAttributes = CustomerResolvers.Customer.custom_attributes as Function;
  const customerIsSubscribed = CustomerResolvers.Customer.is_subscribed as Function;
  const customerTaxId = CustomerResolvers.Customer.tax_id as Function;
  const customerPhone = CustomerResolvers.Customer.phone as Function;
  const customerT1cNo = CustomerResolvers.Customer.t1c_no as Function;
  const customerT1cPhone = CustomerResolvers.Customer.t1c_phone as Function;
  const customerLanguage = CustomerResolvers.Customer.language as Function;
  const customerGender = CustomerResolvers.Customer.gender as Function;

  const _source = { addresses: '' };
  const dataSources = dataSourcesCategory;
  const storeCode = 'cds_th';

  it('Query customer should run properly', async () => {
    jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve([]));
    await queryCustomer(_source, {}, { dataSources, storeCode });
    expect(dataSources.magento.customer.getCustomer).toBeCalledWith(storeCode);
  });

  it('Mutation updateCustomer should run properly', async () => {
    const input = { extension_attributes: { is_subscribed: false } };
    const result = {
      custom_attributes: {},
      extension_attributes: { is_subscribed: false },
      gender: null,
      taxvat: undefined,
    };
    jest.spyOn(dataSources.magento.customer, 'update').mockReturnValue(Promise.resolve([]));
    await mutationUpdateCustomer(_source, { input }, { dataSources });
    expect(dataSources.magento.customer.update).toBeCalledWith({ customer: result });
  });

  it('Mutation changePassword should run properly', async () => {
    const input = { currentPassword: '1', newPassword: '2' };
    jest.spyOn(dataSources.magento.customer, 'changePassword').mockReturnValue(Promise.resolve([]));
    await mutationChangePassword(_source, { input }, { dataSources });
    expect(dataSources.magento.customer.changePassword).toBeCalledWith(input);
  });

  it('customerNeedReacceptConsents should run properly', async () => {
    const _source = { email: '1', id: '2' };
    jest.spyOn(dataSources.consent, 'getConsentInfo').mockReturnValue(Promise.resolve([]));
    await customerNeedReacceptConsents(_source, {}, { dataSources });
    expect(dataSources.consent.getConsentInfo).toBeCalledWith();
  });

  it('customerAddresses should run properly', async () => {
    const _source = { addresses: '1' };
    jest.mock('class-transformer-validator');
    const result = await customerAddresses(_source);
    expect(result).toEqual(1);
  });

  it('customerCustomAttributes should run properly', async () => {
    const _source = {
      custom_attributes: [{ attribute_code: '1', value: '1' }],
      custom_attributes_option: [{ attribute_code: '2', value: '2' }],
    };
    const result = await customerCustomAttributes(_source);
    expect(result).toEqual({ 1: '1' });
  });

  it('customerIsSubscribed should run properly', async () => {
    const extension_attributes = { is_subscribed: '1' };
    const result = await customerIsSubscribed({ extension_attributes });
    expect(result).toEqual('1');
  });

  it('customerTaxId should run properly', async () => {
    const taxvat = '1';
    const result = await customerTaxId({ taxvat });
    expect(result).toEqual(taxvat);
  });

  it('customerPhone should run properly', async () => {
    const _source = {
      custom_attributes: [{ attribute_code: '1', value: '1' }],
      custom_attributes_option: [{ attribute_code: '2', value: '2' }],
    };
    const result = await customerPhone({}, _source);
    expect(result).toEqual(undefined);
  });

  it('customerT1cNo should run properly', async () => {
    const _source = {
      custom_attributes: [{ attribute_code: '1', value: '1' }],
      custom_attributes_option: [{ attribute_code: '2', value: '2' }],
    };
    const result = await customerT1cNo({}, _source);
    expect(result).toEqual(undefined);
  });

  it('customerT1cPhone should run properly', async () => {
    const _source = {
      custom_attributes: [{ attribute_code: '1', value: '1' }],
      custom_attributes_option: [{ attribute_code: '2', value: '2' }],
    };
    const result = await customerT1cPhone({}, _source);
    expect(result).toEqual(undefined);
  });

  it('customerLanguage should run properly', async () => {
    const _source = {
      custom_attributes: [{ attribute_code: '1', value: '1' }],
      custom_attributes_option: [{ attribute_code: '2', value: '2' }],
    };
    const result = await customerLanguage({}, _source);
    expect(result).toEqual('th');
  });

  it('customerGender should run properly', async () => {
    const gender = 0;
    const result = await customerGender({ gender });
    expect(result).toEqual(null);
  });
});
