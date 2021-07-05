import { PaymentTopsUseCase } from './PaymentTopsUseCase';
import { PaymentUseCase } from './PaymentUseCase';
import { MagentoDataSource } from '../../dataSource/magento/MagentoDataSource';
import { PaymentDataSource } from '../../dataSource/payment/PaymentDataSource';
import paymentResolvers from '../../schema/payment/paymentResolvers';
import {
  inputPaymentBankTransfer,
  inputPaymentCashOnDelivery,
  inputPaymentCreditCardWithoutCard,
  inputPaymentNewCreditCard,
  inputPaymentSavedCreditCard,
  inputPaymentSavedCreditCardWithoutEncryptedCard,
  mockAuthorizePayment,
  mockAuthorizePaymentResult,
  mockCartTotal,
  mockCustomer,
  mockOrderResponse,
  mockOrderResponseWithEmptyItem,
  mockOrderResponseWithTotalGreaterThan10000,
  mockPayloadAuthorizePaymentNewCreditCard,
  mockPayloadAuthorizePaymentSavedCreditCard,
  mockPayloadAuthorizePaymentSavedCreditCardNotSendOTP,
  mockPaymentDataResultBankTransfer,
  mockPaymentDataResultCashOnDelivery,
  mockPaymentDataResultCreditCard,
  mockPaymentInformationResult,
  mockPaymentInformationResultBankTransfer,
  mockPaymentOffline,
} from './__mocks__/PaymentUseCase';
import { ApplicationError } from '../../error/ApplicationError';

import { Firebase } from '../../dataSource/firebase';

jest.mock('../../dataSource/magento/MagentoDataSource');
jest.mock('../../dataSource/payment/PaymentDataSource');

describe('Payment Tops Usecase', () => {
  const magento = new MagentoDataSource();
  const paymentDataSource = new PaymentDataSource();
  const paymentTopsUseCase = new PaymentTopsUseCase({ magento });
  const paymentUseCase = new PaymentUseCase({ magento });
  const firebase = new Firebase();
  const root = undefined;
  const info = {};
  const context = {
    dataSources: {
      magento,
      payment: paymentDataSource,
      firebase,
    },
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    firebase.context = {
      redisClient: null,
      requestUsage: [],
    } as any;
  });

  describe('setPaymentInformation', () => {
    it('payment method is cash on delivery: success', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService').mockReturnValue(false as boolean);

      jest.spyOn(context.dataSources.firebase, 'getFireStore').mockReturnValue({
        collection: () => ({
          doc: () => ({
            get: async () => ({
              exists: true,
              data: () => ({
                price_require_cvv: 10000,
              }),
            }),
          }),
        }),
      } as any);

      jest
        .spyOn(paymentUseCase, 'getPaymentData')
        .mockReturnValue(Promise.resolve(mockPaymentDataResultCashOnDelivery) as any);

      jest
        .spyOn(context.dataSources.magento.cart, 'getCartMineTotals')
        .mockReturnValue(Promise.resolve(mockCartTotal) as any);

      jest
        .spyOn(paymentResolvers.Mutation as any, 'setPaymentInformation')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResult));

      const paymentResult = await paymentTopsUseCase.setPaymentInformation(
        root,
        inputPaymentCashOnDelivery,
        context,
        info,
      );

      expect(paymentResult.message).toBe('success');
      expect(paymentResult.order).toBe(mockPaymentInformationResult.order);
      expect(paymentResult.redirect_url).toBe(mockPaymentInformationResult.redirect_url);
    });

    it('payment method is bank transfer: success', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService').mockReturnValue(true as boolean);

      jest.spyOn(context.dataSources.firebase, 'getFireStore').mockReturnValue({
        collection: () => ({
          doc: () => ({
            get: async () => ({
              exists: true,
              data: () => ({
                price_require_cvv: 10000,
              }),
            }),
          }),
        }),
      } as any);

      jest
        .spyOn(paymentUseCase, 'getPaymentData')
        .mockReturnValue(Promise.resolve(mockPaymentDataResultBankTransfer) as any);

      jest
        .spyOn(context.dataSources.magento.cart, 'getCartMineTotals')
        .mockReturnValue(Promise.resolve(mockCartTotal) as any);

      jest
        .spyOn(paymentResolvers.Mutation as any, 'setPaymentInformation')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResult));

      jest
        .spyOn(paymentUseCase, 'getOfflinePaymentResult')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResultBankTransfer) as any);

      jest.spyOn(context.dataSources.payment, 'offlinePayment').mockReturnValue(Promise.resolve(mockPaymentOffline));

      const paymentResult = await paymentTopsUseCase.setPaymentInformation(
        root,
        inputPaymentBankTransfer,
        context,
        info,
      );

      expect(paymentResult.message).toBe('success');
      expect(paymentResult.order).toBe(mockPaymentInformationResultBankTransfer.order);
      expect(paymentResult.redirect_url).toBe(null);
      expect(paymentResult.request_form).toBe(null);
      expect(paymentResult.payment_offline).toBe(mockPaymentInformationResultBankTransfer.payment_offline);
    });

    it('payment method is new credit card: success and send OTP', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService').mockReturnValue(true as boolean);

      jest.spyOn(context.dataSources.firebase, 'getFireStore').mockReturnValue({
        collection: () => ({
          doc: () => ({
            get: async () => ({
              exists: true,
              data: () => ({
                price_require_cvv: 10000,
              }),
            }),
          }),
        }),
      } as any);

      jest
        .spyOn(paymentUseCase, 'getPaymentData')
        .mockReturnValue(Promise.resolve(mockPaymentDataResultCreditCard) as any);

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));

      jest
        .spyOn(context.dataSources.magento.cart, 'getCartMineTotals')
        .mockReturnValue(Promise.resolve(mockCartTotal) as any);

      jest
        .spyOn(paymentResolvers.Mutation as any, 'setPaymentInformation')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResult));

      jest
        .spyOn(context.dataSources.payment, 'authorizePayment')
        .mockReturnValue(Promise.resolve(mockAuthorizePayment) as any);

      const paymentResult = await paymentTopsUseCase.setPaymentInformation(
        root,
        inputPaymentNewCreditCard,
        context,
        info,
      );

      expect(context.dataSources.payment.authorizePayment).toBeCalledWith(
        expect.objectContaining(mockPayloadAuthorizePaymentNewCreditCard),
        'full-payment',
      );

      expect(paymentResult.message).toBe('success');
      expect(paymentResult.order).toBe(mockPaymentInformationResult.order);
      expect(paymentResult.redirect_url).toBe(null);
      expect(paymentResult.request_form).toEqual(mockAuthorizePaymentResult);
      expect(paymentResult.payment_offline).toBe(null);
    });

    it('payment method is saved credit card: success and not send OTP', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService').mockReturnValue(true as boolean);

      jest.spyOn(context.dataSources.firebase, 'getFireStore').mockReturnValue({
        collection: () => ({
          doc: () => ({
            get: async () => ({
              exists: true,
              data: () => ({
                price_require_cvv: 10000,
              }),
            }),
          }),
        }),
      } as any);

      jest
        .spyOn(paymentUseCase, 'getPaymentData')
        .mockReturnValue(Promise.resolve(mockPaymentDataResultCreditCard) as any);

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));

      jest
        .spyOn(context.dataSources.magento.cart, 'getCartMineTotals')
        .mockReturnValue(Promise.resolve(mockCartTotal) as any);

      jest
        .spyOn(paymentResolvers.Mutation as any, 'setPaymentInformation')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResult));

      jest
        .spyOn(context.dataSources.payment, 'authorizePayment')
        .mockReturnValue(Promise.resolve(mockAuthorizePayment) as any);

      const paymentResult = await paymentTopsUseCase.setPaymentInformation(
        root,
        inputPaymentSavedCreditCard,
        context,
        info,
      );

      expect(context.dataSources.payment.authorizePayment).toBeCalledWith(
        expect.objectContaining(mockPayloadAuthorizePaymentSavedCreditCardNotSendOTP),
        'full-payment',
      );

      expect(paymentResult.message).toBe('success');
      expect(paymentResult.order).toBe(mockPaymentInformationResult.order);
      expect(paymentResult.redirect_url).toBe(null);
      expect(paymentResult.request_form).toEqual(mockAuthorizePaymentResult);
      expect(paymentResult.payment_offline).toBe(null);
    });

    it('payment method is saved credit card: success and send OTP', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService').mockReturnValue(true as boolean);

      jest.spyOn(context.dataSources.firebase, 'getFireStore').mockReturnValue({
        collection: () => ({
          doc: () => ({
            get: async () => ({
              exists: true,
              data: () => ({
                price_require_cvv: 10000,
              }),
            }),
          }),
        }),
      } as any);

      jest
        .spyOn(paymentUseCase, 'getPaymentData')
        .mockReturnValue(Promise.resolve(mockPaymentDataResultCreditCard) as any);

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));

      jest.spyOn(context.dataSources.magento.cart, 'getCartMineTotals').mockReturnValue(
        Promise.resolve({
          base_grand_total: 10010,
        }) as any,
      );

      jest
        .spyOn(paymentResolvers.Mutation as any, 'setPaymentInformation')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResult));

      jest
        .spyOn(context.dataSources.payment, 'authorizePayment')
        .mockReturnValue(Promise.resolve(mockAuthorizePayment) as any);

      const paymentResult = await paymentTopsUseCase.setPaymentInformation(
        root,
        inputPaymentSavedCreditCard,
        context,
        info,
      );

      expect(context.dataSources.payment.authorizePayment).toBeCalledWith(
        expect.objectContaining(mockPayloadAuthorizePaymentSavedCreditCard),
        'full-payment',
      );

      expect(paymentResult.message).toBe('success');
      expect(paymentResult.order).toBe(mockPaymentInformationResult.order);
      expect(paymentResult.redirect_url).toBe(null);
      expect(paymentResult.request_form).toEqual(mockAuthorizePaymentResult);
      expect(paymentResult.payment_offline).toBe(null);
    });

    it('payment method is saved credit card get config from firebase: success and not send OTP', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService').mockReturnValue(true as boolean);

      jest.spyOn(context.dataSources.firebase, 'getFireStore').mockReturnValue({
        collection: () => ({
          doc: () => ({
            get: async () => ({
              exists: true,
              data: () => ({
                price_require_cvv: 20000,
              }),
            }),
          }),
        }),
      } as any);

      jest
        .spyOn(paymentUseCase, 'getPaymentData')
        .mockReturnValue(Promise.resolve(mockPaymentDataResultCreditCard) as any);

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));

      jest.spyOn(context.dataSources.magento.cart, 'getCartMineTotals').mockReturnValue(
        Promise.resolve({
          base_grand_total: 10010,
        }) as any,
      );

      jest
        .spyOn(paymentResolvers.Mutation as any, 'setPaymentInformation')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResult));

      jest
        .spyOn(context.dataSources.payment, 'authorizePayment')
        .mockReturnValue(Promise.resolve(mockAuthorizePayment) as any);

      const paymentResult = await paymentTopsUseCase.setPaymentInformation(
        root,
        inputPaymentSavedCreditCard,
        context,
        info,
      );

      expect(context.dataSources.payment.authorizePayment).toBeCalledWith(
        expect.objectContaining(mockPayloadAuthorizePaymentSavedCreditCardNotSendOTP),
        'full-payment',
      );

      expect(paymentResult.message).toBe('success');
      expect(paymentResult.order).toBe(mockPaymentInformationResult.order);
      expect(paymentResult.redirect_url).toBe(null);
      expect(paymentResult.request_form).toEqual(mockAuthorizePaymentResult);
      expect(paymentResult.payment_offline).toBe(null);
    });

    it('payment method is saved credit card get config from firebase and error fallback with 10000', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService').mockReturnValue(true as boolean);

      jest.spyOn(context.dataSources.firebase, 'getFireStore').mockReturnValue({
        collection: () => ({
          doc: () => ({
            get: async () => ({
              exists: false,
            }),
          }),
        }),
      } as any);

      jest
        .spyOn(paymentUseCase, 'getPaymentData')
        .mockReturnValue(Promise.resolve(mockPaymentDataResultCreditCard) as any);

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));

      jest.spyOn(context.dataSources.magento.cart, 'getCartMineTotals').mockReturnValue(
        Promise.resolve({
          base_grand_total: 10010,
        }) as any,
      );

      jest
        .spyOn(paymentResolvers.Mutation as any, 'setPaymentInformation')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResult));

      jest
        .spyOn(context.dataSources.payment, 'authorizePayment')
        .mockReturnValue(Promise.resolve(mockAuthorizePayment) as any);

      const paymentResult = await paymentTopsUseCase.setPaymentInformation(
        root,
        inputPaymentSavedCreditCard,
        context,
        info,
      );

      expect(context.dataSources.payment.authorizePayment).toBeCalledWith(
        expect.objectContaining(mockPayloadAuthorizePaymentSavedCreditCard),
        'full-payment',
      );

      expect(paymentResult.message).toBe('success');
      expect(paymentResult.order).toBe(mockPaymentInformationResult.order);
      expect(paymentResult.redirect_url).toBe(null);
      expect(paymentResult.request_form).toEqual(mockAuthorizePaymentResult);
      expect(paymentResult.payment_offline).toBe(null);
    });

    it('payment method is saved credit card get config from firebase: success and send OTP', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService').mockReturnValue(true as boolean);

      jest.spyOn(context.dataSources.firebase, 'getFireStore').mockReturnValue({
        collection: () => ({
          doc: () => ({
            get: async () => ({
              exists: true,
              data: () => ({
                price_require_cvv: 9000,
              }),
            }),
          }),
        }),
      } as any);

      jest
        .spyOn(paymentUseCase, 'getPaymentData')
        .mockReturnValue(Promise.resolve(mockPaymentDataResultCreditCard) as any);

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));

      jest.spyOn(context.dataSources.magento.cart, 'getCartMineTotals').mockReturnValue(
        Promise.resolve({
          base_grand_total: 10010,
        }) as any,
      );

      jest
        .spyOn(paymentResolvers.Mutation as any, 'setPaymentInformation')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResult));

      jest
        .spyOn(context.dataSources.payment, 'authorizePayment')
        .mockReturnValue(Promise.resolve(mockAuthorizePayment) as any);

      const paymentResult = await paymentTopsUseCase.setPaymentInformation(
        root,
        inputPaymentSavedCreditCard,
        context,
        info,
      );

      expect(context.dataSources.payment.authorizePayment).toBeCalledWith(
        expect.objectContaining(mockPayloadAuthorizePaymentSavedCreditCard),
        'full-payment',
      );

      expect(paymentResult.message).toBe('success');
      expect(paymentResult.order).toBe(mockPaymentInformationResult.order);
      expect(paymentResult.redirect_url).toBe(null);
      expect(paymentResult.request_form).toEqual(mockAuthorizePaymentResult);
      expect(paymentResult.payment_offline).toBe(null);
    });

    it('payment method is saved credit card: throw error when encrypted card is empty', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService').mockReturnValue(true as boolean);

      jest.spyOn(context.dataSources.firebase, 'getFireStore').mockReturnValue({
        collection: () => ({
          doc: () => ({
            get: async () => ({
              exists: true,
              data: () => ({
                price_require_cvv: 10000,
              }),
            }),
          }),
        }),
      } as any);

      jest
        .spyOn(paymentUseCase, 'getPaymentData')
        .mockReturnValue(Promise.resolve(mockPaymentDataResultCreditCard) as any);

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));

      jest
        .spyOn(context.dataSources.magento.cart, 'getCartMineTotals')
        .mockReturnValue(Promise.resolve({ base_grand_total: 20000 }) as any);

      await expect(() =>
        paymentTopsUseCase.setPaymentInformation(root, inputPaymentSavedCreditCardWithoutEncryptedCard, context, info),
      ).rejects.toThrow();
    });

    it('payment method is credit card: throw error when user is guest', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService').mockReturnValue(true as boolean);

      jest.spyOn(context.dataSources.firebase, 'getFireStore').mockReturnValue({
        collection: () => ({
          doc: () => ({
            get: async () => ({
              exists: true,
              data: () => ({
                price_require_cvv: 10000,
              }),
            }),
          }),
        }),
      } as any);

      await expect(() =>
        paymentTopsUseCase.setPaymentInformation(root, inputPaymentCreditCardWithoutCard, context, info),
      ).rejects.toThrow();
    });

    it('is3dsRepayment with saved_card on tops', async () => {
      jest.spyOn(context.dataSources.magento.order, 'search').mockReturnValue(Promise.resolve(mockOrderResponse));

      jest.spyOn(context.dataSources.firebase, 'getFireStore').mockReturnValue({
        collection: () => ({
          doc: () => ({
            get: async () => ({
              exists: true,
              data: () => ({
                price_require_cvv: 10000,
              }),
            }),
          }),
        }),
      } as any);

      const response = await paymentTopsUseCase.is3dsRepayment({
        isGuest: false,
        saved_card: {
          card_id: '1234',
        },
        context: context as any,
        incrementId: 'MOCK1234',
      });
      expect(response).toEqual(false);
    });

    it('is3dsRepayment with new card on tops', async () => {
      jest.spyOn(context.dataSources.magento.order, 'search').mockReturnValue(Promise.resolve(mockOrderResponse));

      jest.spyOn(context.dataSources.firebase, 'getFireStore').mockReturnValue({
        collection: () => ({
          doc: () => ({
            get: async () => ({
              exists: true,
              data: () => ({
                price_require_cvv: 10000,
              }),
            }),
          }),
        }),
      } as any);

      const response = await paymentTopsUseCase.is3dsRepayment({
        isGuest: false,
        card: { encrypted_card_data: 'TEST' } as any,
        context: context as any,
        incrementId: 'MOCK1234',
      });
      expect(response).toEqual(true);
    });

    it('is3dsRepayment with saved_card and order total > 10000 on tops', async () => {
      jest
        .spyOn(context.dataSources.magento.order, 'search')
        .mockReturnValue(Promise.resolve(mockOrderResponseWithTotalGreaterThan10000));

      jest.spyOn(context.dataSources.firebase, 'getFireStore').mockReturnValue({
        collection: () => ({
          doc: () => ({
            get: async () => ({
              exists: true,
              data: () => ({
                price_require_cvv: 100,
              }),
            }),
          }),
        }),
      } as any);

      const response = await paymentTopsUseCase.is3dsRepayment({
        isGuest: false,
        saved_card: { encrypted_card_data: 'TEST' } as any,
        context: context as any,
        incrementId: 'MOCK1234',
      });
      expect(response).toEqual(true);
    });

    it('is3dsRepayment with saved_card and order total > 10000 on tops and firebase set to 20000', async () => {
      jest
        .spyOn(context.dataSources.magento.order, 'search')
        .mockReturnValue(Promise.resolve(mockOrderResponseWithTotalGreaterThan10000));

      jest.spyOn(context.dataSources.firebase, 'getFireStore').mockReturnValue({
        collection: () => ({
          doc: () => ({
            get: async () => ({
              exists: true,
              data: () => ({
                price_require_cvv: 20000,
              }),
            }),
          }),
        }),
      } as any);

      const response = await paymentTopsUseCase.is3dsRepayment({
        isGuest: false,
        saved_card: { encrypted_card_data: 'TEST' } as any,
        context: context as any,
        incrementId: 'MOCK1234',
      });
      expect(response).toEqual(false);
    });

    it('is3dsRepayment with saved_card and order total > 10000 without CVV on tops', async () => {
      jest
        .spyOn(context.dataSources.magento.order, 'search')
        .mockReturnValue(Promise.resolve(mockOrderResponseWithTotalGreaterThan10000));

      jest.spyOn(context.dataSources.firebase, 'getFireStore').mockReturnValue({
        collection: () => ({
          doc: () => ({
            get: async () => ({
              exists: true,
              data: () => ({
                price_require_cvv: 10000,
              }),
            }),
          }),
        }),
      } as any);

      await expect(() =>
        paymentTopsUseCase.is3dsRepayment({
          isGuest: false,
          saved_card: { card_id: '1234' } as any,
          context: context as any,
          incrementId: 'MOCK1234',
        }),
      ).rejects.toThrow(new ApplicationError('input encrypted_card_data is required'));
    });

    it('is3dsRepayment with empty order on tops', async () => {
      jest
        .spyOn(context.dataSources.magento.order, 'search')
        .mockReturnValue(Promise.resolve(mockOrderResponseWithEmptyItem));

      jest.spyOn(context.dataSources.firebase, 'getFireStore').mockReturnValue({
        collection: () => ({
          doc: () => ({
            get: async () => ({
              exists: true,
              data: () => ({
                price_require_cvv: 10000,
              }),
            }),
          }),
        }),
      } as any);

      await expect(() =>
        paymentTopsUseCase.is3dsRepayment({
          isGuest: false,
          saved_card: {
            card_id: '1234',
          },
          context: context as any,
          incrementId: 'MOCK1234',
        }),
      ).rejects.toThrow(new ApplicationError('order not found'));
    });
  });
});
