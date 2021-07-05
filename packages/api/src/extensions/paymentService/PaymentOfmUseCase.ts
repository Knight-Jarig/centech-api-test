import { PaymentUseCase } from './PaymentUseCase';
import { ApplicationError } from '../../error/ApplicationError';
import { encrypt } from '../../utils/crypto.utils';

export class PaymentOfmUseCase extends PaymentUseCase {
  is3ds = async () => {
    return false;
  };

  async validateRepaymentOrderStatus(order) {
    const isCanRepayment = /(pending|approval_approved|payment_pending|MCOM_RECEIVED|MCOM_ONHOLD)/.test(order?.status);

    if (!isCanRepayment) {
      throw new ApplicationError('This order cannot re-payment within current status', {
        statusCode: 'order_cant_repayment',
        key: encrypt(order.increment_id),
      });
    }
  }
}
