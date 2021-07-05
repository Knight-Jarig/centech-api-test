import { resolver } from './index';
import { ICard, ICardSort, ICardSortIdEnum, ISortDirection } from '../../types/graphql';
import {
  inputPaymentNewCreditCard,
  mockCustomer,
  mockGetPaymentServiceResponse,
  mockICreditCardListWithDefaultCard,
  mockICreditCardListWithDefaultCardWithDescId,
  mockICreditCardListWithoutDefaultCard,
  mockStoreConfigResponse,
} from './__mocks__/PaymentUseCase';
import { magentoDataSourceInit, paymentDataSourceInit } from './__mocks__/InitialData';
import config from '../../configs/vars';
import { createDataSources } from '../../dataSource/';
import { encrypt } from '../../utils/crypto.utils';

jest.mock('../../configs/vars');

describe('Payment Extension Resolver', () => {
  const dataSources = createDataSources();
  const magento = dataSources.magento;
  const paymentDataSource = dataSources.payment;

  const root = undefined;
  const info = {};

  paymentDataSource.initialize(paymentDataSourceInit);
  magento.initialize(magentoDataSourceInit);

  const context = {
    storeCode: 'th',
    dataSources,
    store: {
      secure_base_media_url: "url",
    },
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('paymentService', () => {
    it('call query cards function with asc sort and no default card', async () => {
      const paymentResultFn = resolver.Query.cards as Function;
      const iCards: ICard[] = mockICreditCardListWithoutDefaultCard;
      const sort: ICardSort = {
        id: ICardSortIdEnum.Id,
        direction: ISortDirection.Asc,
      };

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));
      jest.spyOn(context.dataSources.magento.bank, 'find').mockReturnValue(Promise.resolve([]));

      jest
        .spyOn(paymentDataSource, 'getPaymentService')
        .mockReturnValue(Promise.resolve(mockGetPaymentServiceResponse));

      jest.spyOn(paymentDataSource, 'getCards').mockReturnValue(Promise.resolve(iCards));

      jest.spyOn(paymentDataSource, 'setDefaultCard').mockReturnValue(Promise.resolve(true));

      jest.spyOn(magento.storeConfig, 'find').mockReturnValue(Promise.resolve(mockStoreConfigResponse));

      const paymentResult = await paymentResultFn({}, { sort }, context);

      expect(paymentResult).toEqual(mockICreditCardListWithDefaultCard);
    });

    it('call query cards function with desc sort and has default card', async () => {
      const paymentResultFn = resolver.Query.cards as Function;
      const iCards: ICard[] = mockICreditCardListWithDefaultCard;
      const sort: ICardSort = {
        id: ICardSortIdEnum.Id,
        direction: ISortDirection.Desc,
      };

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));
      jest.spyOn(context.dataSources.magento.bank, 'find').mockReturnValue(Promise.resolve([]));

      jest
        .spyOn(paymentDataSource, 'getPaymentService')
        .mockReturnValue(Promise.resolve(mockGetPaymentServiceResponse));

      jest.spyOn(paymentDataSource, 'getCards').mockReturnValue(Promise.resolve(iCards));

      jest.spyOn(paymentDataSource, 'setDefaultCard').mockReturnValue(Promise.resolve(true));

      jest.spyOn(magento.storeConfig, 'find').mockReturnValue(Promise.resolve(mockStoreConfigResponse));

      const paymentResult = await paymentResultFn({}, { sort }, context);

      expect(paymentResult).toEqual(iCards.reverse());
    });

    it('call query cards function on tops not call mds get bank', async () => {
      const paymentResultFn = resolver.Query.cards as Function;
      const iCards: ICard[] = mockICreditCardListWithoutDefaultCard;
      const sort: ICardSort = {
        id: ICardSortIdEnum.Id,
        direction: ISortDirection.Desc,
      };

      config.bu = 'tops';

      jest.spyOn(context.dataSources.magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomer));
      jest.spyOn(context.dataSources.magento.bank, 'find').mockReturnValue(Promise.resolve([]));

      jest
        .spyOn(paymentDataSource, 'getPaymentService')
        .mockReturnValue(Promise.resolve(mockGetPaymentServiceResponse));

      jest.spyOn(paymentDataSource, 'getCards').mockReturnValue(Promise.resolve(iCards));

      jest.spyOn(paymentDataSource, 'setDefaultCard').mockReturnValue(Promise.resolve(true));

      jest.spyOn(magento.storeConfig, 'find').mockReturnValue(Promise.resolve(mockStoreConfigResponse));

      const paymentResult = await paymentResultFn({}, { sort }, context);

      expect(context.dataSources.magento.bank.find).toBeCalledTimes(0);
      expect(paymentResult).toEqual(mockICreditCardListWithDefaultCardWithDescId);
    });

    it('setPaymentInformation call on OFM', async () => {
      const setPaymentFn = resolver.Mutation.setPaymentInformation as Function;

      config.bu = 'ofm';
      jest.spyOn(context.dataSources.paymentOfmUseCase, 'setPaymentInformation').mockReturnValue(Promise.resolve(true));
      await setPaymentFn(root, inputPaymentNewCreditCard, context, info);
      expect(context.dataSources.paymentOfmUseCase.setPaymentInformation).toBeCalledWith(
        root,
        inputPaymentNewCreditCard,
        context,
        info,
      );
    });

    it('setPaymentInformation call on TOPS', async () => {
      const setPaymentFn = resolver.Mutation.setPaymentInformation as Function;

      config.bu = 'tops';
      jest
        .spyOn(context.dataSources.paymentTopsUseCase, 'setPaymentInformation')
        .mockReturnValue(Promise.resolve(true));
      await setPaymentFn(root, inputPaymentNewCreditCard, context, info);
      expect(context.dataSources.paymentTopsUseCase.setPaymentInformation).toBeCalledWith(
        root,
        inputPaymentNewCreditCard,
        context,
        info,
      );
    });

    it('setPaymentInformation call on CDS', async () => {
      const setPaymentFn = resolver.Mutation.setPaymentInformation as Function;

      config.bu = 'cds';
      jest.spyOn(context.dataSources.paymentCdsUseCase, 'setPaymentInformation').mockReturnValue(Promise.resolve(true));
      await setPaymentFn(root, inputPaymentNewCreditCard, context, info);
      expect(context.dataSources.paymentCdsUseCase.setPaymentInformation).toBeCalledWith(
        root,
        inputPaymentNewCreditCard,
        context,
        info,
      );
    });

    it('setPaymentInformation call on RBS', async () => {
      const setPaymentFn = resolver.Mutation.setPaymentInformation as Function;

      config.bu = 'rbs';
      jest.spyOn(context.dataSources.paymentRbsUseCase, 'setPaymentInformation').mockReturnValue(Promise.resolve(true));
      await setPaymentFn(root, inputPaymentNewCreditCard, context, info);
      expect(context.dataSources.paymentRbsUseCase.setPaymentInformation).toBeCalledWith(
        root,
        inputPaymentNewCreditCard,
        context,
        info,
      );
    });

    it('setPaymentInformation call on PWB', async () => {
      const setPaymentFn = resolver.Mutation.setPaymentInformation as Function;

      config.bu = 'pwb';
      jest.spyOn(context.dataSources.paymentUseCase, 'setPaymentInformation').mockReturnValue(Promise.resolve(true));
      await setPaymentFn(root, inputPaymentNewCreditCard, context, info);
      expect(context.dataSources.paymentUseCase.setPaymentInformation).toBeCalledWith(
        root,
        inputPaymentNewCreditCard,
        context,
        info,
      );
    });

    it('repayment call on TOPS', async () => {
      const inputRepayment = { incrementId: 'FC432201217928', card: 'test' };
      const repaymentFn = resolver.Mutation.repayment as Function;

      config.bu = 'tops';
      jest.spyOn(context.dataSources.paymentTopsUseCase, 'repayment').mockReturnValue(Promise.resolve(null));
      await repaymentFn(root, inputRepayment, context);
      expect(context.dataSources.paymentTopsUseCase.repayment).toBeCalledWith(root, inputRepayment, context);
    });

    it('repayment call on OFM', async () => {
      const inputRepayment = { incrementId: 'FC432201217928', card: 'test' };
      const repaymentFn = resolver.Mutation.repayment as Function;

      config.bu = 'ofm';
      jest.spyOn(context.dataSources.paymentOfmUseCase, 'repayment').mockReturnValue(Promise.resolve(null));
      await repaymentFn(root, inputRepayment, context);
      expect(context.dataSources.paymentOfmUseCase.repayment).toBeCalledWith(root, inputRepayment, context);
    });

    it('repayment call on CDS', async () => {
      const inputRepayment = { incrementId: 'FC432201217928', card: 'test' };
      const repaymentFn = resolver.Mutation.repayment as Function;

      config.bu = 'cds';
      jest.spyOn(context.dataSources.paymentCdsUseCase, 'repayment').mockReturnValue(Promise.resolve(null));
      await repaymentFn(root, inputRepayment, context);
      expect(context.dataSources.paymentCdsUseCase.repayment).toBeCalledWith(root, inputRepayment, context);
    });

    it('repayment call on RBS', async () => {
      const inputRepayment = { incrementId: 'FC432201217928', card: 'test' };
      const repaymentFn = resolver.Mutation.repayment as Function;

      config.bu = 'rbs';
      jest.spyOn(context.dataSources.paymentRbsUseCase, 'repayment').mockReturnValue(Promise.resolve(null));
      await repaymentFn(root, inputRepayment, context);
      expect(context.dataSources.paymentRbsUseCase.repayment).toBeCalledWith(root, inputRepayment, context);
    });

    it('binLookup should run properly', async () => {
      const paymentResultFn = resolver.Query.binLookup as Function;
      const bin = '1';
      jest.spyOn(paymentDataSource, 'binLookup').mockReturnValue(Promise.resolve({}) as any);
      await paymentResultFn({}, { bin }, context);
      expect(paymentDataSource.binLookup).toBeCalledWith(bin);
    });

    it('query paymentOffline should run properly', async () => {
      const paymentResultFn = resolver.Query.paymentOffline as Function;
      const incrementId = '1';
      const key = encrypt(incrementId);
      jest.spyOn(paymentDataSource, 'getOfflinePaymentDetail').mockReturnValue(Promise.resolve({}) as any);
      await paymentResultFn({}, { incrementId, key }, context);
      expect(paymentDataSource.getOfflinePaymentDetail).toBeCalledWith(incrementId);
    });

    it('query paymentStatus should run properly', async () => {
      const paymentResultFn = resolver.Query.paymentStatus as Function;
      const incrementId = '1';
      const key = encrypt(incrementId);
      const paymentServiceKey = 'payment_service_dolfin';
      jest.spyOn(paymentDataSource, 'getDolfinPaymentStatus').mockReturnValue(Promise.resolve({}) as any);
      await paymentResultFn({}, { incrementId, key, paymentServiceKey }, context);
      expect(paymentDataSource.getDolfinPaymentStatus).toBeCalledWith(incrementId);
    });

    it('mutation createCard should run properly', async () => {
      const paymentResultFn = resolver.Mutation.createCard as Function;
      const cardInput = '1';
      const setDefault = true;
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: '1' }) as any);
      jest.spyOn(paymentDataSource, 'createCard').mockReturnValue(Promise.resolve({}) as any);
      await paymentResultFn({}, { cardInput, setDefault }, context);
      expect(paymentDataSource.createCard).toBeCalled();
    });

    it('mutation deleteCard should run properly', async () => {
      const paymentResultFn = resolver.Mutation.deleteCard as Function;
      const cardId = '1';
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: '1' }) as any);
      jest.spyOn(paymentDataSource, 'deleteCard').mockReturnValue(Promise.resolve({}) as any);
      await paymentResultFn({}, { cardId }, context);
      expect(paymentDataSource.deleteCard).toBeCalled();
    });

    it('mutation setDefaultCard should run properly', async () => {
      const paymentResultFn = resolver.Mutation.setDefaultCard as Function;
      const cardId = '1';
      jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve({ id: '1' }) as any);
      jest.spyOn(paymentDataSource, 'getCards').mockReturnValue(Promise.resolve([{ id: '1' }]) as any);
      jest.spyOn(paymentDataSource, 'setDefaultCard').mockReturnValue(Promise.resolve({}) as any);
      await paymentResultFn({}, { cardId }, context);
      expect(paymentDataSource.setDefaultCard).toBeCalled();
    });

    it('PaymentInformations installment_plans should run properly', async () => {
      const paymentResultFn = resolver.PaymentInformations.installment_plans as Function;
      const input = {
        extension_attributes: {
          payment_service_installment_plans: '1',
        },
      };
      const result = await paymentResultFn(input);
      expect(result).toEqual('1');
    });

    it('PaymentOfflineResponse key should run properly', async () => {
      const paymentResultFn = resolver.PaymentOfflineResponse.key as Function;
      const input = {
        detail: {
          orderId: '1',
        },
      };
      const result = await paymentResultFn(input);
      expect(result).toEqual(encrypt(input.detail.orderId));
    });

    it('PaymentStatusResponse key should run properly', async () => {
      const paymentResultFn = resolver.PaymentStatusResponse.key as Function;
      const input = {
        order_id: '1',
      };
      const result = await paymentResultFn(input);
      expect(result).toEqual(encrypt(input.order_id));
    });
  });
});
