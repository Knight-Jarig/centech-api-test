import { defaultMutationResolvers, authorizePayment } from './default.resolver';
import { magentoDataSourceInit, paymentDataSourceInit } from './__mocks__/InitialData';
import { createDataSources } from '../../dataSource/';
import { PaymentType } from '../../dataSource/payment/PaymentDataSource';

jest.mock('../../configs/vars');

describe('Payment Extension Resolver', () => {
  const dataSources = createDataSources();
  const magento = dataSources.magento;
  const consent = dataSources.consent;
  const paymentDataSource = dataSources.payment;

  const root = undefined;
  const info = {};

  paymentDataSource.initialize(paymentDataSourceInit);
  magento.initialize(magentoDataSourceInit);

  const context = {
    storeCode: 'th',
    dataSources,
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('paymentService', () => {
    it('setPaymentInformation should run properly', async () => {
      const paymentResultFn = defaultMutationResolvers.setPaymentInformation as Function;
      const input = {
        card: {
          is_store_card: false,
        },
        saved_card: {
          encrypted_card_data: '1',
        },
        payment_service_methods: 'payment_service_bank_transfer',
        paymentInput: {
          payment_method: {
            installment_plan_id: '1',
          },
        },
        payment_method: {
          extension_attributes: {
            installmentplan_id: '1',
          },
        },
        isGuest: true,
      };
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: '1' }) as any);
      jest.spyOn(magento.cart, 'setPaymentInformation').mockReturnValue(Promise.resolve({ increment_id: '1' }) as any);
      jest.spyOn(magento.order, 'fetchOrder').mockReturnValue(Promise.resolve({ increment_id: '1' }) as any);
      jest.spyOn(paymentDataSource, 'offlinePayment').mockReturnValue(Promise.resolve({ message: 'success' }) as any);
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: '1', email: '1' }) as any);
      jest.spyOn(consent, 'getConsentInfo').mockReturnValue(Promise.resolve({ consent_privacy_version: '1' }) as any);
      jest
        .spyOn(consent, 'checkConsentInfo')
        .mockReturnValue(Promise.resolve({ content: { consent_privacy_version: '2' } }) as any);
      jest.spyOn(consent, 'createCustomerConsent').mockReturnValue(Promise.resolve({ id: '1' }) as any);
      await paymentResultFn({}, { input }, context, info);
      expect(paymentDataSource.offlinePayment).toBeCalled();
    });
  });

  describe('paymentService', () => {
    it('authorizePayment should run properly', async () => {
      const paymentResultFn = authorizePayment as Function;
      const input = {
        card: {
          encrypted_card_data: '1',
          cardholder_name: 'john',
          expiry_month: '1',
          expiry_year: '1',
          is_store_card: '1',
        },
        saved_card: {
          card_id: '1',
          encrypted_card_data: '1',
        },
        orderEntityId: '1',
        isGuest: true,
        customer: {
          id: '1',
        },
        is3ds: true,
      };
      jest
        .spyOn(paymentDataSource, 'authorizePayment')
        .mockReturnValue(Promise.resolve({ formUrl: '1', encryptedPayload: '1' }) as any);
      await paymentResultFn(input, context, PaymentType.fullPayment);
      expect(paymentDataSource.authorizePayment).toBeCalled();
    });
  });
});
