import { PaymentType } from '../../dataSource/payment/PaymentDataSource';

export const paymentServicePaymentMethods = {
  payment_service_fullpayment: PaymentType.fullPayment,
  payment_service_installment: PaymentType.installment,
  payment_service_bank_transfer: PaymentType.bankTransfer,
  payment_service_dolfin: PaymentType.dolfin,
};
