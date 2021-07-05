import { PaymentRbsUseCase } from './PaymentRbsUseCase';
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
  mockPayloadAuthorizePaymentNewCreditCard,
  mockPayloadAuthorizePaymentSavedCreditCard,
  mockPaymentDataResultBankTransfer,
  mockPaymentDataResultCashOnDelivery,
  mockPaymentDataResultCreditCard,
  mockPaymentInformationResult,
  mockPaymentInformationResultBankTransfer,
  mockPaymentOffline,
} from './__mocks__/PaymentUseCase';

jest.mock('../../dataSource/magento/MagentoDataSource');
jest.mock('../../dataSource/payment/PaymentDataSource');

describe('Payment Rbs Usecase', () => {
  const magento = new MagentoDataSource();
  const paymentDataSource = new PaymentDataSource();
  const paymentRbsUseCase = new PaymentRbsUseCase({ magento });
  const paymentUseCase = new PaymentUseCase({ magento });
  const root = undefined;
  const info = {};
  const context = {
    dataSources: {
      magento,
      payment: paymentDataSource,
    },
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('setPaymentInformation', () => {
    it('payment method is cash on delivery: success', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService').mockReturnValue(false as boolean);

      jest
        .spyOn(paymentUseCase, 'getPaymentData')
        .mockReturnValue(Promise.resolve(mockPaymentDataResultCashOnDelivery) as any);

      jest
        .spyOn(context.dataSources.magento.cart, 'getCartMineTotals')
        .mockReturnValue(Promise.resolve(mockCartTotal) as any);

      jest
        .spyOn(paymentResolvers.Mutation as any, 'setPaymentInformation')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResult));

      const paymentResult = await paymentRbsUseCase.setPaymentInformation(
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

      const paymentResult = await paymentRbsUseCase.setPaymentInformation(
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

      const paymentResult = await paymentRbsUseCase.setPaymentInformation(
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

    it('payment method is saved credit card: success and send OTP', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService').mockReturnValue(true as boolean);

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

      const paymentResult = await paymentRbsUseCase.setPaymentInformation(
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

      jest
        .spyOn(paymentUseCase, 'getPaymentData')
        .mockReturnValue(Promise.resolve(mockPaymentDataResultCreditCard) as any);

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));

      jest
        .spyOn(context.dataSources.magento.cart, 'getCartMineTotals')
        .mockReturnValue(Promise.resolve({ base_grand_total: 20000 }) as any);

      await expect(() =>
        paymentRbsUseCase.setPaymentInformation(root, inputPaymentSavedCreditCardWithoutEncryptedCard, context, info),
      ).rejects.toThrow();
    });

    it('payment method is credit card: throw error when user is guest', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService').mockReturnValue(true as boolean);

      await expect(() =>
        paymentRbsUseCase.setPaymentInformation(root, inputPaymentCreditCardWithoutCard, context, info),
      ).rejects.toThrow();
    });
  });
});
