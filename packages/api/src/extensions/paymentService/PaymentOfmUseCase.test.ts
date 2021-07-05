import { PaymentOfmUseCase } from './PaymentOfmUseCase';
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
  mockCustomer,
  mockPayloadAuthorizePaymentNewCreditCardForIs3dsFalse,
  mockPayloadAuthorizePaymentSavedCreditCardNotSendOTP,
  mockPaymentDataResultBankTransfer,
  mockPaymentDataResultCashOnDelivery,
  mockPaymentDataResultCreditCard,
  mockPaymentInformationResult,
  mockPaymentInformationResultBankTransfer,
  mockPaymentOffline,
  mockOrderResponseWithMCOMOnHoldStatus,
} from './__mocks__/PaymentUseCase';

jest.mock('../../dataSource/magento/MagentoDataSource');
jest.mock('../../dataSource/payment/PaymentDataSource');

describe('Payment Ofm Usecase', () => {
  const magento = new MagentoDataSource();
  const paymentDataSource = new PaymentDataSource();
  const paymentOfmUseCase = new PaymentOfmUseCase({ magento });
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
        .spyOn(paymentResolvers.Mutation as any, 'setPaymentInformation')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResult));

      const paymentResult = await paymentOfmUseCase.setPaymentInformation(
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
        .spyOn(paymentResolvers.Mutation as any, 'setPaymentInformation')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResult));

      jest
        .spyOn(paymentUseCase, 'getOfflinePaymentResult')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResultBankTransfer) as any);

      jest.spyOn(context.dataSources.payment, 'offlinePayment').mockReturnValue(Promise.resolve(mockPaymentOffline));

      const paymentResult = await paymentOfmUseCase.setPaymentInformation(
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

    it('payment method is new credit card: success with not send OTP', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService').mockReturnValue(true as boolean);

      jest
        .spyOn(paymentUseCase, 'getPaymentData')
        .mockReturnValue(Promise.resolve(mockPaymentDataResultCreditCard) as any);

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));

      jest
        .spyOn(paymentResolvers.Mutation as any, 'setPaymentInformation')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResult));

      jest
        .spyOn(context.dataSources.payment, 'authorizePayment')
        .mockReturnValue(Promise.resolve(mockAuthorizePayment) as any);

      const paymentResult = await paymentOfmUseCase.setPaymentInformation(
        root,
        inputPaymentNewCreditCard,
        context,
        info,
      );

      expect(context.dataSources.payment.authorizePayment).toBeCalledWith(
        expect.objectContaining(mockPayloadAuthorizePaymentNewCreditCardForIs3dsFalse),
        'full-payment',
      );

      expect(paymentResult.message).toBe('success');
      expect(paymentResult.order).toBe(mockPaymentInformationResult.order);
      expect(paymentResult.redirect_url).toBe(null);
      expect(paymentResult.request_form).toEqual(mockAuthorizePaymentResult);
      expect(paymentResult.payment_offline).toBe(null);
    });

    it('payment method is save credit card: success with not send OTP', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService').mockReturnValue(true as boolean);

      jest
        .spyOn(paymentUseCase, 'getPaymentData')
        .mockReturnValue(Promise.resolve(mockPaymentDataResultCreditCard) as any);

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));

      jest
        .spyOn(paymentResolvers.Mutation as any, 'setPaymentInformation')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResult));

      jest
        .spyOn(context.dataSources.payment, 'authorizePayment')
        .mockReturnValue(Promise.resolve(mockAuthorizePayment) as any);

      const paymentResult = await paymentOfmUseCase.setPaymentInformation(
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

    it('payment method is saved credit card: throw error when encrypted card is empty', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService').mockReturnValue(true as boolean);

      jest
        .spyOn(paymentUseCase, 'getPaymentData')
        .mockReturnValue(Promise.resolve(mockPaymentDataResultCreditCard) as any);

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));

      await expect(() =>
        paymentOfmUseCase.setPaymentInformation(root, inputPaymentSavedCreditCardWithoutEncryptedCard, context, info),
      ).rejects.toThrow();
    });

    it('payment method is credit card: throw error when user is guest', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService').mockReturnValue(true as boolean);

      await expect(() =>
        paymentOfmUseCase.setPaymentInformation(root, inputPaymentCreditCardWithoutCard, context, info),
      ).rejects.toThrow();
    });

    it('repayment on OFM with MCOM_ONHOLD status', async () => {
      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));

      jest
        .spyOn(context.dataSources.magento.order, 'search')
        .mockReturnValue(Promise.resolve(mockOrderResponseWithMCOMOnHoldStatus));

      jest.spyOn(paymentOfmUseCase, 'authorizePayment').mockReturnValue(Promise.resolve(null));

      const result = await paymentOfmUseCase.repayment(
        root,
        {
          card: inputPaymentNewCreditCard.input.card,
          incrementId: 'MOCK00000001',
        },
        context as any,
      );

      expect(result.message).toEqual('success');
    });

    it('repayment on OFM with MCOM_RECEIVED status', async () => {
      const mockOrderResponseWithMCOMReceivedStatus = Object.create(mockOrderResponseWithMCOMOnHoldStatus);
      mockOrderResponseWithMCOMReceivedStatus.status = 'MCOM_RECEIVED';

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));

      jest
        .spyOn(context.dataSources.magento.order, 'search')
        .mockReturnValue(Promise.resolve(mockOrderResponseWithMCOMReceivedStatus));

      jest.spyOn(paymentOfmUseCase, 'authorizePayment').mockReturnValue(Promise.resolve(null));

      const result = await paymentOfmUseCase.repayment(
        root,
        {
          card: inputPaymentNewCreditCard.input.card,
          incrementId: 'MOCK00000001',
        },
        context as any,
      );

      expect(result.message).toEqual('success');
    });

    it('repayment on OFM with payment_pending status', async () => {
      const mockOrderResponseWithPaymentPendingStatus = Object.create(mockOrderResponseWithMCOMOnHoldStatus);
      mockOrderResponseWithPaymentPendingStatus.status = 'payment_pending';

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));

      jest
        .spyOn(context.dataSources.magento.order, 'search')
        .mockReturnValue(Promise.resolve(mockOrderResponseWithPaymentPendingStatus));

      jest.spyOn(paymentOfmUseCase, 'authorizePayment').mockReturnValue(Promise.resolve(null));

      const result = await paymentOfmUseCase.repayment(
        root,
        {
          card: inputPaymentNewCreditCard.input.card,
          incrementId: 'MOCK00000001',
        },
        context as any,
      );

      expect(result.message).toEqual('success');
    });

    it('repayment on OFM with approval_approved status', async () => {
      const mockOrderResponseWithApprovalStatus = Object.create(mockOrderResponseWithMCOMOnHoldStatus);
      mockOrderResponseWithApprovalStatus.status = 'approval_approved';

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));

      jest
        .spyOn(context.dataSources.magento.order, 'search')
        .mockReturnValue(Promise.resolve(mockOrderResponseWithApprovalStatus));

      jest.spyOn(paymentOfmUseCase, 'authorizePayment').mockReturnValue(Promise.resolve(null));

      const result = await paymentOfmUseCase.repayment(
        root,
        {
          card: inputPaymentNewCreditCard.input.card,
          incrementId: 'MOCK00000001',
        },
        context as any,
      );

      expect(result.message).toEqual('success');
    });

    it('repayment on OFM with pending status', async () => {
      const mockOrderResponseWithPendingStatus = Object.create(mockOrderResponseWithMCOMOnHoldStatus);
      mockOrderResponseWithPendingStatus.status = 'pending';

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));

      jest
        .spyOn(context.dataSources.magento.order, 'search')
        .mockReturnValue(Promise.resolve(mockOrderResponseWithPendingStatus));

      jest.spyOn(paymentOfmUseCase, 'authorizePayment').mockReturnValue(Promise.resolve(null));

      const result = await paymentOfmUseCase.repayment(
        root,
        {
          card: inputPaymentNewCreditCard.input.card,
          incrementId: 'MOCK00000001',
        },
        context as any,
      );

      expect(result.message).toEqual('success');
    });
  });
});
