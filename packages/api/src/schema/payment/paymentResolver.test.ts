import PaymentResolvers from './paymentResolvers';

const mockDataSources = {
  customer: {
    getCustomer: () => new Promise(resolve => resolve(true)),
  },
  order: {
    fetchOrder: () => new Promise(resolve => resolve(true)),
  },
  cart: {
    getPaymentInformation: () => new Promise(resolve => resolve(true)),
    setPaymentInformation: () => new Promise(resolve => resolve(true)),
    updatePaymentInformation: () => new Promise(resolve => resolve(true)),
  },
  cartId: {
    getPaymentInformation: () => new Promise(resolve => resolve(true)),
    setPaymentInformation: () => new Promise(resolve => resolve(true)),
    updatePaymentInformation: () => new Promise(resolve => resolve(true)),
    updateMultiplePaymentInformation: () => new Promise(resolve => resolve(true)),
  },
  cartGuest: {
    getPaymentInformation: () => new Promise(resolve => resolve(true)),
    setPaymentInformation: () => new Promise(resolve => resolve(true)),
    updatePaymentInformation: () => new Promise(resolve => resolve(true)),
  },
  consent: {
    getConsentInfo: () => new Promise(resolve => resolve(true)),
    checkConsentInfo: () => new Promise(resolve => resolve(true)),
    createCustomerConsent: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesWishlist = {
  magento: {
    customer: mockDataSources.customer,
    order: mockDataSources.order,
    cart: mockDataSources.cart,
    cartId: mockDataSources.cartId,
    cartGuest: mockDataSources.cartGuest,
  },
  consent: mockDataSources.consent,
};

describe('PaymentResolver', () => {
  const queryPaymentInformations = PaymentResolvers.Query.paymentInformations as Function;
  const mutationSetPaymentInformation = PaymentResolvers.Mutation.setPaymentInformation as Function;
  const mutationUpdatePaymentInformation = PaymentResolvers.Mutation.updatePaymentInformation as Function;
  const mutationUpdateMultiplePaymentInformation = PaymentResolvers.Mutation
    .updateMultiplePaymentInformation as Function;

  const _source = undefined;
  const dataSources = dataSourcesWishlist;
  const storeCode = 'cds_th';

  it('Query paymentInformations with guest status', async () => {
    const cartId = '1';
    const isGuest = true;
    jest.spyOn(dataSources.magento.cartGuest, 'getPaymentInformation').mockReturnValue(Promise.resolve({}));
    await queryPaymentInformations(_source, { cartId, isGuest }, { dataSources, storeCode });
    expect(dataSources.magento.cartGuest.getPaymentInformation).toBeCalledWith(cartId, storeCode);
  });

  it('Query paymentInformations with not guest status', async () => {
    const cartId = '1';
    const isGuest = false;
    jest.spyOn(dataSources.magento.cartId, 'getPaymentInformation').mockReturnValue(Promise.resolve({}));
    await queryPaymentInformations(_source, { cartId, isGuest }, { dataSources, storeCode });
    expect(dataSources.magento.cartId.getPaymentInformation).toBeCalledWith(cartId, storeCode);
  });

  it('Query paymentInformations with not guest status and no cartId', async () => {
    const cartId = null;
    const isGuest = false;
    jest
      .spyOn(dataSources.magento.cart, 'getPaymentInformation')
      .mockReturnValue(Promise.resolve({ extension_attributes: { is_payment_promotion_locked: '1' } }));
    await queryPaymentInformations(_source, { cartId, isGuest }, { dataSources, storeCode });
    expect(dataSources.magento.cart.getPaymentInformation).toBeCalledWith(storeCode);
  });

  it('Mutation setPaymentInformation with guest status', async () => {
    const cartId = '1';
    const isGuest = true;
    const input = {};
    jest.spyOn(dataSources.magento.cartGuest, 'setPaymentInformation').mockReturnValue(Promise.resolve({}));
    jest
      .spyOn(dataSources.consent, 'getConsentInfo')
      .mockReturnValue(Promise.resolve({ consent_privacy_version: '1' }));
    jest
      .spyOn(dataSources.consent, 'checkConsentInfo')
      .mockReturnValue(Promise.resolve({ content: { consent_privacy_version: '2' } }));
    await mutationSetPaymentInformation(_source, { cartId, isGuest, input }, { dataSources, storeCode });
    expect(dataSources.magento.cartGuest.setPaymentInformation).toBeCalled();
  });

  it('Mutation setPaymentInformation with not guest status', async () => {
    const cartId = '1';
    const isGuest = false;
    const input = {};
    jest.spyOn(dataSources.magento.cartId, 'setPaymentInformation').mockReturnValue(Promise.resolve({}));
    jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: '1', email: '1' }));
    jest
      .spyOn(dataSources.consent, 'getConsentInfo')
      .mockReturnValue(Promise.resolve({ consent_privacy_version: '1' }));
    await mutationSetPaymentInformation(_source, { cartId, isGuest, input }, { dataSources, storeCode });
    expect(dataSources.magento.cartId.setPaymentInformation).toBeCalled();
  });

  it('Mutation setPaymentInformation with not guest status and no cartId', async () => {
    const cartId = null;
    const isGuest = false;
    const input = {};
    jest.spyOn(dataSources.magento.cart, 'setPaymentInformation').mockReturnValue(Promise.resolve({}));
    jest.spyOn(dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: '1', email: '1' }));
    jest
      .spyOn(dataSources.consent, 'getConsentInfo')
      .mockReturnValue(Promise.resolve({ consent_privacy_version: '1' }));
    await mutationSetPaymentInformation(_source, { cartId, isGuest, input }, { dataSources, storeCode });
    expect(dataSources.magento.cart.setPaymentInformation).toBeCalled();
  });

  it('Mutation updatePaymentInformation with guest status', async () => {
    const cartId = '1';
    const isGuest = true;
    const input = {};
    jest.spyOn(dataSources.magento.cartGuest, 'updatePaymentInformation').mockReturnValue(Promise.resolve({}));
    await mutationUpdatePaymentInformation(_source, { cartId, isGuest, input }, { dataSources, storeCode });
    expect(dataSources.magento.cartGuest.updatePaymentInformation).toBeCalledWith(input, cartId, storeCode);
  });

  it('Mutation updatePaymentInformation with not guest status', async () => {
    const cartId = '1';
    const isGuest = false;
    const input = {};
    jest.spyOn(dataSources.magento.cartId, 'updatePaymentInformation').mockReturnValue(Promise.resolve({}));
    await mutationUpdatePaymentInformation(_source, { cartId, isGuest, input }, { dataSources, storeCode });
    expect(dataSources.magento.cartId.updatePaymentInformation).toBeCalledWith(input, cartId, storeCode);
  });

  it('Mutation updatePaymentInformation with not guest status and no cartId', async () => {
    const cartId = null;
    const isGuest = false;
    const input = {};
    jest.spyOn(dataSources.magento.cart, 'updatePaymentInformation').mockReturnValue(Promise.resolve({}));
    await mutationUpdatePaymentInformation(_source, { cartId, isGuest, input }, { dataSources, storeCode });
    expect(dataSources.magento.cart.updatePaymentInformation).toBeCalledWith(input, storeCode);
  });

  it('Mutation updateMultiplePaymentInformation', async () => {
    const input = {};
    jest.spyOn(dataSources.magento.cartId, 'updateMultiplePaymentInformation').mockReturnValue(Promise.resolve({}));
    await mutationUpdateMultiplePaymentInformation(_source, { input }, { dataSources, storeCode });
    expect(dataSources.magento.cartId.updateMultiplePaymentInformation).toBeCalledWith(input, storeCode);
  });
});
