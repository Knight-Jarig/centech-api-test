import { PaymentUseCase } from './PaymentUseCase';
import { MagentoDataSource } from '../../dataSource/magento/MagentoDataSource';
import { PaymentDataSource, PaymentType } from '../../dataSource/payment/PaymentDataSource';
import paymentResolvers from '../../schema/payment/paymentResolvers';
import {
  inputPaymentBankTransfer,
  inputPaymentCashOnDelivery,
  inputPaymentNewCreditCard,
  inputPaymentSavedCreditCardWithoutEncryptedCard,
  mockAuthorizePayment,
  mockAuthorizePaymentResult,
  mockCartTotal,
  mockCustomer,
  mockOrderResponse,
  mockOrderResponseWithCancel,
  mockOrderResponseWithEmptyItem,
  mockOrderResponseWithOfflinePayment,
  mockPayloadAuthorizePaymentNewCreditCard,
  mockPaymentDataResultBankTransfer,
  mockPaymentDataResultCashOnDelivery,
  mockPaymentDataResultCreditCard,
  mockPaymentInformationResult,
  mockPaymentInformationResultBankTransfer,
  mockPaymentOffline,
} from './__mocks__/PaymentUseCase';
import { ApplicationError } from '../../error/ApplicationError';
import { encrypt } from '../../utils/crypto.utils';

jest.mock('../../dataSource/magento/MagentoDataSource');
jest.mock('../../dataSource/payment/PaymentDataSource');

describe('Payment Usecase', () => {
  const magento = new MagentoDataSource();
  const paymentDataSource = new PaymentDataSource();
  const paymentUseCase = new PaymentUseCase({ magento });
  const root = undefined;
  const info = {};
  const context = {
    customerToken: 'MOCK_TOKEN',
    dataSources: {
      magento,
      payment: paymentDataSource,
    },
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('isPaymentService', () => {
    it('return true when payment method is payment_service_fullpayment', async () => {
      const isPaymentService = paymentUseCase.isPaymentService('payment_service_fullpayment');
      expect(isPaymentService).toBe(true);
    });

    it('return false when payment method is cashondelivery', async () => {
      const isPaymentService = paymentUseCase.isPaymentService('cashondelivery');
      expect(isPaymentService).toBe(false);
    });
  });

  describe('authorizePayment', () => {
    it('get authorize payment: success', async () => {
      jest.spyOn(context.dataSources.payment, 'authorizePayment')
        .mockReturnValue(Promise.resolve(mockAuthorizePayment) as any);

      const result = await paymentUseCase.authorizePayment(
        { card: {}, saved_card: {}, orderEntityId: '', isGuest: false, customer: mockCustomer, is3ds: true }, context,
        PaymentType.fullPayment);

      expect(result).toEqual(mockAuthorizePaymentResult);
    });
  });

  describe('getOfflinePaymentResult', () => {
    it('get offline payment: success', async () => {
      jest.spyOn(context.dataSources.payment, 'offlinePayment')
        .mockReturnValue(Promise.resolve(mockPaymentOffline) as any);

      const result = await paymentUseCase.getOfflinePaymentResult(inputPaymentBankTransfer.input, '804744', context);

      expect(result).toEqual(mockPaymentInformationResultBankTransfer);
    });
  });

  describe('getPaymentData', () => {
    it('get payment data: success', async () => {
      const result = await paymentUseCase.getPaymentData(inputPaymentCashOnDelivery.input, context);

      expect(result).toEqual(mockPaymentDataResultCashOnDelivery);
    });

    it('get payment data: success', async () => {
      jest.spyOn(context.dataSources.magento.customer, 'getCustomer')
        .mockReturnValue(Promise.resolve(mockCustomer)
        );

      const result = await paymentUseCase.getPaymentData(inputPaymentNewCreditCard.input, context);

      expect(result).toEqual(mockPaymentDataResultCreditCard);
    });
  });

  describe('setPaymentInformation', () => {
    it('payment method is cash on delivery: success', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService')
        .mockReturnValue(false as boolean);

      jest.spyOn(paymentUseCase, 'getPaymentData')
        .mockReturnValue(Promise.resolve(mockPaymentDataResultCashOnDelivery) as any);

      jest.spyOn(context.dataSources.magento.cart, 'getCartMineTotals')
        .mockReturnValue(Promise.resolve(mockCartTotal) as any);

      jest.spyOn(paymentResolvers.Mutation as any, 'setPaymentInformation')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResult));

      const paymentResult = await paymentUseCase.setPaymentInformation(root, inputPaymentCashOnDelivery, context, info);

      expect(paymentResult.message).toBe('success');
      expect(paymentResult.order).toBe(mockPaymentInformationResult.order);
      expect(paymentResult.redirect_url).toBe(mockPaymentInformationResult.redirect_url);
    });

    it('payment method is bank transfer: success', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService')
        .mockReturnValue(true as boolean);

      jest.spyOn(paymentUseCase, 'getPaymentData')
        .mockReturnValue(Promise.resolve(mockPaymentDataResultBankTransfer) as any);

      jest.spyOn(context.dataSources.magento.cart, 'getCartMineTotals')
        .mockReturnValue(Promise.resolve(mockCartTotal) as any);

      jest.spyOn(paymentResolvers.Mutation as any, 'setPaymentInformation')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResult));

      jest.spyOn(paymentUseCase, 'getOfflinePaymentResult')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResultBankTransfer) as any);

      jest.spyOn(context.dataSources.payment, 'offlinePayment')
        .mockReturnValue(Promise.resolve(mockPaymentOffline));

      const paymentResult = await paymentUseCase.setPaymentInformation(root, inputPaymentBankTransfer, context, info);

      expect(paymentResult.message).toBe('success');
      expect(paymentResult.order).toBe(mockPaymentInformationResultBankTransfer.order);
      expect(paymentResult.redirect_url).toBe(null);
      expect(paymentResult.request_form).toBe(null);
      expect(paymentResult.payment_offline).toBe(mockPaymentInformationResultBankTransfer.payment_offline);
    });

    it('payment method is new credit card: success and send OTP', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService')
        .mockReturnValue(true as boolean);

      jest.spyOn(paymentUseCase, 'getPaymentData')
        .mockReturnValue(Promise.resolve(mockPaymentDataResultCreditCard) as any);

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer')
        .mockReturnValue(Promise.resolve(mockCustomer));

      jest.spyOn(context.dataSources.magento.cart, 'getCartMineTotals')
        .mockReturnValue(Promise.resolve(mockCartTotal) as any);

      jest.spyOn(paymentResolvers.Mutation as any, 'setPaymentInformation')
        .mockReturnValue(Promise.resolve(mockPaymentInformationResult));

      jest.spyOn(context.dataSources.payment, 'authorizePayment')
        .mockReturnValue(Promise.resolve(mockAuthorizePayment) as any);

      const paymentResult = await paymentUseCase.setPaymentInformation(root, inputPaymentNewCreditCard, context, info);

      expect(context.dataSources.payment.authorizePayment).toBeCalledWith(expect.objectContaining(mockPayloadAuthorizePaymentNewCreditCard), 'full-payment');

      expect(paymentResult.message).toBe('success');
      expect(paymentResult.order).toBe(mockPaymentInformationResult.order);
      expect(paymentResult.redirect_url).toBe(null);
      expect(paymentResult.request_form).toEqual(mockAuthorizePaymentResult);
      expect(paymentResult.payment_offline).toBe(null);
    });

    it('payment method is saved credit card: throw error when encrypted_card_data is empty', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService')
        .mockReturnValue(true as boolean);

      await expect(() => paymentUseCase.setPaymentInformation(root, inputPaymentSavedCreditCardWithoutEncryptedCard, context, info)).rejects.toThrow();
    });

    it('payment method is saved credit card: throw error when cannot found customer', async () => {
      jest.spyOn(paymentUseCase, 'isPaymentService')
        .mockReturnValue(true as boolean);

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer')
        .mockReturnValue(Promise.resolve(null));

      await expect(() => paymentUseCase.setPaymentInformation(root, inputPaymentNewCreditCard, context, info)).rejects.toThrow();
    });
  });

  it('repayment on CDS', async () => {
    jest.spyOn(context.dataSources.magento.customer, 'getCustomer')
      .mockReturnValue(Promise.resolve(mockCustomer));

    jest.spyOn(context.dataSources.magento.order, 'search')
      .mockReturnValue(Promise.resolve(mockOrderResponse));

    jest.spyOn(paymentUseCase, 'authorizePayment')
      .mockReturnValue(Promise.resolve(null));

    const result = await paymentUseCase.repayment(root, {
      card: inputPaymentNewCreditCard.input.card,
      incrementId: "MOCK00000001"
    }, context as any)

    expect(result.message).toEqual('success');
  });

  it('repayment with cancel order on CDS', async () => {
    jest.spyOn(context.dataSources.magento.customer, 'getCustomer')
      .mockReturnValue(Promise.resolve(mockCustomer));

    jest.spyOn(context.dataSources.magento.order, 'search')
      .mockReturnValue(Promise.resolve(mockOrderResponseWithCancel));

    await expect(() => paymentUseCase.repayment(root, {
      card: inputPaymentNewCreditCard.input.card,
      incrementId: "MOCK00000001"
    }, context as any)).rejects.toThrow(new ApplicationError('order status is not awaiting_payment'));
  });

  it('repayment notfound order on CDS', async () => {
    jest.spyOn(context.dataSources.magento.customer, 'getCustomer')
      .mockReturnValue(Promise.resolve(mockCustomer));

    jest.spyOn(context.dataSources.magento.order, 'search')
      .mockReturnValue(Promise.resolve(mockOrderResponseWithEmptyItem));

    await expect(() => paymentUseCase.repayment(root, {
      card: inputPaymentNewCreditCard.input.card,
      incrementId: "MOCK00000001"
    }, context as any)).rejects.toThrow(new ApplicationError('order not found'));
  });

  it('repayment with bank_transfer on CDS', async () => {
    jest.spyOn(context.dataSources.magento.customer, 'getCustomer')
      .mockReturnValue(Promise.resolve(mockCustomer));

    jest.spyOn(context.dataSources.magento.order, 'search')
      .mockReturnValue(Promise.resolve(mockOrderResponseWithOfflinePayment));

    expect(() => paymentUseCase.repayment(root, {
      card: inputPaymentNewCreditCard.input.card,
      incrementId: "MOCK00000001"
    }, context as any)).rejects.toThrow(new ApplicationError('offline payment can not repayment'));
  });


  it('repayment without card on CDS', async () => {
    jest.spyOn(context.dataSources.magento.customer, 'getCustomer')
      .mockReturnValue(Promise.resolve(mockCustomer));

    jest.spyOn(context.dataSources.magento.order, 'search')
      .mockReturnValue(Promise.resolve(mockOrderResponseWithEmptyItem));

    await expect(() => paymentUseCase.repayment(root, {
      incrementId: "MOCK00000001"
    }, context as any)).rejects.toThrow(new ApplicationError('card or saved_card is require'));
  });

  it('repayment without customerToken on CDS', async () => {
    jest.spyOn(context.dataSources.magento.customer, 'getCustomer')
      .mockReturnValue(Promise.reject(new Error('401')));

    jest.spyOn(context.dataSources.magento.order, 'search')
      .mockReturnValue(Promise.resolve(mockOrderResponse));

    await expect(() => paymentUseCase.repayment(root, {
      card: inputPaymentNewCreditCard.input.card,
      incrementId: "MOCK00000001"
    }, {
      ...context,
    } as any)).rejects.toThrow(new ApplicationError('401'));
  });
});
