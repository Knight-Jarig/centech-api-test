import { DataSource } from 'apollo-datasource';
import {
  ICardInput,
  IConditionType,
  IMutationRepaymentArgs,
  IMutationSetPaymentInformationArgs,
  IPaymentRequestForm,
  ISavedCardInput,
} from '../../types/graphql';
import { PaymentType } from '../../dataSource/payment/PaymentDataSource';
import { ApplicationError } from '../../error/ApplicationError';
import { paymentServicePaymentMethods } from './constant';
import { MagentoDataSource } from '../../dataSource/magento/MagentoDataSource';
import { encrypt } from '../../utils/crypto.utils';

import paymentResolvers from '../../schema/payment/paymentResolvers';
import { ResolverContext } from '../../types';

export interface ValidateRepaymentInput {
  orderId?: number;
  context: ResolverContext;
}

export interface Is3dsInput {
  card?: ICardInput;
  saved_card?: ISavedCardInput;
  isGuest: boolean;
  customer?: any;
  cartId?: string;
  context: ResolverContext;
  incrementId?: string;
}

export class PaymentUseCase extends DataSource {
  private magento: MagentoDataSource;

  constructor({ magento }) {
    super();
    this.magento = magento;

    this.setPaymentInformation = this.setPaymentInformation.bind(this);
  }

  isPaymentService(paymentServiceMethod: string | null): boolean {
    return !!paymentServicePaymentMethods[paymentServiceMethod];
  }

  is3ds = async ({ saved_card }: Is3dsInput): Promise<boolean> => {
    return !saved_card;
  };

  is3dsRepayment = async ({
    card,
    saved_card,
    isGuest,
    customer,
    context,
    incrementId,
  }: Is3dsInput): Promise<boolean> => {
    return this.is3ds({ card, saved_card, isGuest, customer, context, incrementId });
  };

  async getPaymentData(input, context) {
    const { card, saved_card, payment_service_methods, ...paymentInput } = input;

    const paymentServicePaymentType = paymentServicePaymentMethods[payment_service_methods];

    const isPaymentService = this.isPaymentService(payment_service_methods);

    const isBankTransfer = paymentServicePaymentType === paymentServicePaymentMethods.payment_service_bank_transfer;
    const isDolfin = paymentServicePaymentType === paymentServicePaymentMethods.payment_service_dolfin;

    if (isPaymentService && !saved_card && !card && !isBankTransfer && !isDolfin) {
      throw new ApplicationError('input card_id or card');
    }

    const customer =
      card?.is_store_card || saved_card
        ? await context.dataSources.magento.customer.getCustomer(context.storeCode)
        : null;

    if ((card?.is_store_card || saved_card) && !customer && !isBankTransfer && !isDolfin) {
      throw new ApplicationError('guest can not store card');
    }

    if (!isDolfin) {
      paymentInput.payment_method.additional_data = {
        use_redirect: isPaymentService,
      };
    } else {
      paymentInput.payment_method.additional_data = { payment_type: 'qr' };
    }

    if (paymentInput.payment_method.installment_plan_id) {
      paymentInput.payment_method.extension_attributes.installmentplan_id =
        paymentInput.payment_method.installment_plan_id;
    }

    return {
      paymentInput,
      paymentServicePaymentType,
      isBankTransfer,
      isDolfin,
      customer,
    };
  }

  async getOfflinePaymentResult(input, orderId, context) {
    const { apm_agent_code, apm_channel_code } = input.payment_method.extension_attributes;
    const payment_offline_result = await context.dataSources.payment.offlinePayment(
      orderId,
      apm_agent_code,
      apm_channel_code,
    );

    return {
      message: 'success',
      order: orderId,
      redirect_url: null,
      request_form: null,
      payment_offline: payment_offline_result,
    };
  }

  async getDolfinPaymentResult(input, orderId, context) {
    const { payment_type } = input.payment_method.additional_data;
    const payment_dolfin = await context.dataSources.payment.dolfinPayment(orderId, payment_type);

    const { increment_id: incrementId } = await this.magento.order.fetchOrder(orderId, context.storeCode);

    return {
      message: 'success',
      order: orderId,
      redirect_url: null,
      request_form: null,
      payment_dolfin: {
        ...payment_dolfin,
        incrementId,
        key: encrypt(incrementId),
      },
    };
  }

  validateCVV(saved_card) {
    if (saved_card && !saved_card.encrypted_card_data) {
      throw new ApplicationError('input encrypted_card_data is required');
    }
  }

  async setPaymentInformation(root, input: IMutationSetPaymentInformationArgs, context, info) {
    const { card, saved_card, payment_service_methods } = input.input;

    const isPaymentService = this.isPaymentService(payment_service_methods);

    const { paymentInput, paymentServicePaymentType, isBankTransfer, isDolfin, customer } = await this.getPaymentData(
      input.input,
      context,
    );

    const is3dsInputValue: Is3dsInput = {
      card: card,
      saved_card: saved_card,
      isGuest: input.isGuest,
      cartId: input.cartId,
      customer,
      context,
    };

    this.validateCVV(saved_card);

    const is3ds = await this.is3ds(is3dsInputValue);

    const result = await (paymentResolvers.Mutation as any).setPaymentInformation(
      root,
      {
        ...input,
        input: paymentInput,
      },
      context,
      info,
    );

    if (!isPaymentService) return result;

    const orderId = result.order;

    if (isBankTransfer) {
      return this.getOfflinePaymentResult(input.input, orderId, context);
    }

    if (isDolfin) {
      return this.getDolfinPaymentResult(input.input, orderId, context);
    }

    const paymentResult = await this.authorizePayment(
      {
        card,
        saved_card,
        orderEntityId: orderId,
        isGuest: input.isGuest,
        customer,
        is3ds,
      },
      context,
      paymentServicePaymentType,
    );

    return {
      message: 'success',
      order: orderId,
      redirect_url: null,
      request_form: paymentResult,
      payment_offline: null,
    };
  }

  async authorizePayment(
    { card, saved_card, orderEntityId, isGuest, customer, is3ds },
    { dataSources },
    paymentType: PaymentType,
  ): Promise<IPaymentRequestForm> {
    const payload = {
      orderEntityId: orderEntityId,
      description: '',
      is3ds: is3ds,
      customerId: customer?.id,
      cardId: saved_card?.card_id,
      encryptCardData: saved_card?.encrypted_card_data ?? card?.encrypted_card_data,
      cardholderName: card?.cardholder_name,
      expiryMonth: card?.expiry_month,
      expiryYear: card?.expiry_year,
      isStoreCard: card?.is_store_card,
    };

    const result = await dataSources.payment.authorizePayment(payload, paymentType);
    return {
      url: result.formUrl,
      payload: {
        paymentRequest: result.encryptedPayload,
      },
    };
  }

  async validateRepaymentOrderStatus(order) {
    if (order?.extension_attributes?.order_status !== 'awaiting_payment') {
      throw new ApplicationError('order status is not awaiting_payment', {
        statusCode: 'require_awaiting_payment',
        key: encrypt(order.increment_id),
      });
    }
  }

  async validateRepaymentOrderPaymentMethod(order, paymentServicePaymentType) {
    const isBankTransfer = paymentServicePaymentType === paymentServicePaymentMethods.payment_service_bank_transfer;

    if (isBankTransfer) {
      throw new ApplicationError('offline payment can not repayment');
    }
  }

  async validateRepayment(input: IMutationRepaymentArgs, context: ResolverContext) {
    const { card, saved_card, incrementId } = input;
    const { dataSources, storeCode } = context;

    if (!card && !saved_card) {
      throw new ApplicationError('card or saved_card is require');
    }

    const searchOrderResponse = await dataSources.magento.order.search(
      {
        filterGroups: [
          {
            filters: [
              {
                field: 'increment_id',
                value: incrementId,
                conditionType: IConditionType.Eq,
              },
            ],
          },
        ],
      },
      storeCode,
    );

    const items = searchOrderResponse?.items;

    if (items.length === 0) {
      throw new ApplicationError('order not found');
    }

    const order = items[0];

    const payment_service_methods = order.payment.method;
    const paymentServicePaymentType = paymentServicePaymentMethods[payment_service_methods];

    await this.validateRepaymentOrderPaymentMethod(order, paymentServicePaymentType);
    await this.validateRepaymentOrderStatus(order);

    return { order, paymentServicePaymentType };
  }

  async repayment(_, input: IMutationRepaymentArgs, context: ResolverContext) {
    const { card, saved_card, incrementId } = input;
    const { dataSources, customerToken, storeCode } = context;

    const { order, paymentServicePaymentType } = await this.validateRepayment(input, context);

    let customer;
    if (customerToken) {
      try {
        customer = await dataSources.magento.customer.getCustomer(storeCode);
      } catch (e) {
        throw ApplicationError.create(e);
      }
    }

    const is3ds = await this.is3dsRepayment({
      card,
      saved_card,
      isGuest: false,
      customer,
      context,
      incrementId,
    });

    const result = await this.authorizePayment(
      {
        card,
        saved_card,
        orderEntityId: order.entity_id,
        isGuest: !!customerToken,
        customer: customer,
        is3ds,
      },
      {
        dataSources,
      },
      paymentServicePaymentType,
    );

    return {
      message: 'success',
      order: order.entity_id,
      redirect_url: null,
      request_form: result,
    };
  }
}
