import { IMutationResolvers, IPaymentRequestForm } from '../../types/graphql';
import { ResolverContext } from '../../types';
import { PaymentType } from '../../dataSource/payment/PaymentDataSource';
import paymentResolvers from '../../schema/payment/paymentResolvers';
import { ApplicationError } from '../../error/ApplicationError';
import { paymentServicePaymentMethods } from './constant';
import config from '../../configs/vars';

export async function authorizePayment(
  { card, saved_card, orderEntityId, isGuest, customer, is3ds = null },
  { dataSources, storeCode },
  paymentType: PaymentType,
): Promise<IPaymentRequestForm> {
  const force3dsBUs = ['cds', 'rbs'];
  const customIs3ds = force3dsBUs.includes(config.bu) ? true : !saved_card;

  const payload = {
    orderEntityId: orderEntityId,
    description: '',
    is3ds: is3ds ?? customIs3ds,
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

const defaultMutationResolvers: IMutationResolvers<ResolverContext> = {
  async setPaymentInformation(root, input, context, info) {
    const { card, saved_card, payment_service_methods, ...paymentInput } = input.input;

    if (saved_card && !saved_card.encrypted_card_data) {
      throw new ApplicationError('input encrypted_card_data is required');
    }

    const paymentMethod = paymentInput.payment_method as any;

    const paymentServicePaymentType = paymentServicePaymentMethods[payment_service_methods];

    const isMDCPaymentType = !paymentServicePaymentType;

    const isBankTransfer = paymentServicePaymentType === paymentServicePaymentMethods.payment_service_bank_transfer;

    if (!isMDCPaymentType && !saved_card && !card && !isBankTransfer) {
      throw new ApplicationError('input card_id or card');
    }

    const customer =
      card?.is_store_card || saved_card
        ? await context.dataSources.magento.customer.getCustomer(context.storeCode)
        : null;

    if ((card?.is_store_card || saved_card) && !customer && !isBankTransfer) {
      throw new ApplicationError('guest can not store card');
    }

    paymentMethod.additional_data = { use_redirect: !isMDCPaymentType };
    paymentMethod.extension_attributes.installmentplan_id = paymentMethod.installment_plan_id;
    const result = await (paymentResolvers.Mutation as any).setPaymentInformation(
      root,
      {
        ...input,
        input: paymentInput,
      },
      context,
      info,
    );
    if (isMDCPaymentType) return result;
    const orderId = result.order;

    if (isBankTransfer) {
      const { apm_agent_code, apm_channel_code } = input.input.payment_method.extension_attributes;
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

    const paymentResult = await authorizePayment(
      { card, saved_card, orderEntityId: orderId, isGuest: input.isGuest, customer },
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
  },
};

export { defaultMutationResolvers };
