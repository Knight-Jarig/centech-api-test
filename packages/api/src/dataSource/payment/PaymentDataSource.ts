import configs from '../../configs/vars';
import { BaseRESTDataSource } from '../BaseRESTDataSource';
import { generateAmxHeader } from '../../utils/payment.utils';
import { cardTransform } from '../../transform/card';
import { ApplicationError } from '../../error/ApplicationError';

interface PaymentServiceResponse {
  payment_service_base_url: string;
  bu_public_key: string;
  bu_secret_key: string;
  bu_store_key: string;
}

export interface CardResponse {
  id: string;
  cardType: string;
  last4Digits: string;
  createdDateTime: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  bankId: string;
  bankName: string;
  promoCodes: string[];
  maskPan: string;
}

interface CreateCardResponse {
  isSuccess: boolean;
  paymentFailReason: number;
  card: CardResponse;
}

export interface PaymentOfflineRequest {
  storeKeyId: string;
  agentCode?: string;
  channel?: string;
  orderEntityId: string;
  paymentExpiryDateTime?: string;
}

export interface PaymentDolfinRequest {
  storeKeyId: string;
  orderEntityId: string;
}

interface PaymentDolfinResponseDetail {
  qrValue: string;
  qrCodeImage: string;
}

interface PaymentDolfinResponse {
  isSuccess: boolean;
  failReason: number;
  detail: PaymentDolfinResponseDetail;
}

interface AuthorizePaymentResponse {
  isSuccess: boolean;
  failReason: number;
  generatePayloadFailMessage: string;
  formHTML: string;
  formUrl: string;
  encryptedPayload: string;
}

interface DolfinPaymentStatusResponse {
  isSuccess: boolean;
  responseCode: string;
  description: string;
  orderId: string;
  amount: number;
  currency: string;
  refundAmount: number;
  rawResponseData: string;
}

export enum PaymentType {
  fullPayment = 'full-payment',
  installment = 'installment',
  bankTransfer = 'bank-transfer',
  dolfin = 'dolfin',
}

export class PaymentDataSource extends BaseRESTDataSource {
  constructor() {
    super();
    this.baseURL = configs.magento.base_url;
  }

  getPaymentService(paymentType: PaymentType): Promise<PaymentServiceResponse> {
    const path = `/V1/payment-service-${paymentType}/get-bu-info`;
    return this.get(path);
  }

  async createCard(
    customerId: string,
    cardholderName: string,
    cardEncryptData: string,
    expiryMonth: number,
    expiryYear: number,
    setDefaultCard: boolean,
  ) {
    const paymentService = await this.getPaymentService(PaymentType.fullPayment);

    const path = `${paymentService.payment_service_base_url}/card`;

    const auth = generateAmxHeader(paymentService.bu_public_key, paymentService.bu_secret_key);

    const payload = {
      storeKeyId: paymentService.bu_store_key,
      customerId,
      cardholderName,
      cardEncryptData,
      expiryMonth,
      expiryYear,
      setDefaultCard,
    };

    const response: CreateCardResponse = await this.post(path, null, {
      headers: {
        Authorization: auth,
      },
      body: payload as any,
    });

    if (!response.isSuccess) {
      throw new ApplicationError(`Cannot add a new card [${response?.paymentFailReason}]`);
    }
    return cardTransform(response.card);
  }

  async deleteCard(id, customerId) {
    const paymentService = await this.getPaymentService(PaymentType.fullPayment);

    const path = `${paymentService.payment_service_base_url}/card`;

    const auth = generateAmxHeader(paymentService.bu_public_key, paymentService.bu_secret_key);

    const payload = {
      id,
      customerId,
      storeKeyId: paymentService.bu_store_key,
    };

    return this.delete(path, null, {
      headers: {
        Authorization: auth,
      },
      body: payload as any,
    });
  }

  async getCards(customerId: string) {
    const paymentService = await this.getPaymentService(PaymentType.fullPayment);
    const path = `${paymentService.payment_service_base_url}/card/${customerId}`;

    const auth = generateAmxHeader(paymentService.bu_public_key, paymentService.bu_secret_key);

    const cardList: CardResponse[] = await this.get(
      path,
      {},
      {
        headers: {
          Authorization: auth,
        },
      },
    );

    const cards = cardList || [];
    return cards.map(cardTransform);
  }

  async setDefaultCard(id, customerId) {
    const paymentService = await this.getPaymentService(PaymentType.fullPayment);

    const path = `${paymentService.payment_service_base_url}/card/default`;

    const auth = generateAmxHeader(paymentService.bu_public_key, paymentService.bu_secret_key);

    const payload = {
      id,
      customerId,
      storeKeyId: paymentService.bu_store_key,
    };

    return this.put(path, null, {
      headers: {
        Authorization: auth,
      },
      body: payload as any,
    });
  }

  async getOfflinePaymentDetail(incrementId: string) {
    const paymentService = await this.getPaymentService(PaymentType.bankTransfer);
    const path = `${paymentService.payment_service_base_url}/payment/offline/${incrementId}`;

    const auth = generateAmxHeader(paymentService.bu_public_key, paymentService.bu_secret_key);

    return this.get(
      path,
      {},
      {
        headers: {
          Authorization: auth,
        },
      },
    );
  }

  async getDolfinPaymentStatus(incrementId: string): Promise<DolfinPaymentStatusResponse> {
    const paymentService = await this.getPaymentService(PaymentType.dolfin);
    const path = `${paymentService.payment_service_base_url}/payment/dolfin/qr/${incrementId}/status`;
    const auth = generateAmxHeader(paymentService.bu_public_key, paymentService.bu_secret_key);

    return this.get(
      path,
      {},
      {
        headers: {
          Authorization: auth,
        },
      },
    );
  }

  async offlinePayment(
    orderEntityId: string,
    agentCode: string, //  = null
    channel: string, //  = null
    paymentExpiryDateTime: string = null,
  ) {
    const paymentService = await this.getPaymentService(PaymentType.bankTransfer);
    const path = `${paymentService.payment_service_base_url}/payment/offline`;

    const auth = generateAmxHeader(paymentService.bu_public_key, paymentService.bu_secret_key);

    const payload: PaymentOfflineRequest = {
      storeKeyId: paymentService.bu_store_key,
      agentCode,
      channel,
      // ...(agentCode ? { agentCode } : {}),
      // ...(channel ? { channel } : {}),
      orderEntityId,
      ...(paymentExpiryDateTime ? { paymentExpiryDateTime } : {}),
    };

    return this.post(path, payload, {
      headers: {
        Authorization: auth,
      },
    });
  }

  async dolfinPayment(orderEntityId: string, paymentType: string): Promise<PaymentDolfinResponse> {
    const paymentService = await this.getPaymentService(PaymentType.dolfin);
    const path = `${paymentService.payment_service_base_url}/payment/dolfin/${paymentType}`;

    const auth = generateAmxHeader(paymentService.bu_public_key, paymentService.bu_secret_key);

    const payload: PaymentDolfinRequest = {
      storeKeyId: paymentService.bu_store_key,
      orderEntityId,
    };

    return this.post(path, payload, {
      headers: {
        Authorization: auth,
      },
    });
  }

  async authorizePayment(data, paymentType: PaymentType): Promise<AuthorizePaymentResponse> {
    const paymentService = await this.getPaymentService(paymentType);
    const path = `${paymentService.payment_service_base_url}/payment/web`;

    const auth = generateAmxHeader(paymentService.bu_public_key, paymentService.bu_secret_key);

    return this.post(
      path,
      {
        ...data,
        storeKeyId: paymentService.bu_store_key,
      },
      {
        headers: {
          Authorization: auth,
        },
      },
    );
  }

  async binLookup(bin) {
    const paymentService = await this.getPaymentService(PaymentType.fullPayment);

    const path = `${paymentService.payment_service_base_url}/card/lookup/${bin}`;

    const auth = generateAmxHeader(paymentService.bu_public_key, paymentService.bu_secret_key);

    const result = await this.get(path, null, {
      headers: {
        Authorization: auth,
      },
    });

    if (!result) {
      throw new ApplicationError('Not Found');
    }

    return {
      bank_id: result.bankId,
      promo_codes: result.promoCodes,
    };
  }
}
