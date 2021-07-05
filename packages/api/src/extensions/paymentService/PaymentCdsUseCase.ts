import { PaymentUseCase } from './PaymentUseCase';

export class PaymentCdsUseCase extends PaymentUseCase {
  is3ds = async () => {
    return true;
  };
}
