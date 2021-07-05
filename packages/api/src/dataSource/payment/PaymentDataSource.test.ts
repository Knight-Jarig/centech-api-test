import { PaymentDataSource, PaymentType } from './PaymentDataSource';
import { cardOne, cardOneBeforeTransform } from '../../extensions/paymentService/__mocks__/PaymentUseCase';
import { ApplicationError } from '../../error/ApplicationError';

class PaymentDataSourceTest extends PaymentDataSource {
  get() {
    return jest.fn() as any;
  }
  post() {
    return jest.fn() as any;
  }
  put() {
    return jest.fn() as any;
  }
  delete() {
    return jest.fn() as any;
  }
}

describe('PaymentDataSource', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const paymentDS = new PaymentDataSourceTest();
  const params = null;
  const storeCode = 'cds_th';
  const paymentService = {
    payment_service_base_url: '1',
    bu_public_key: '1',
    bu_secret_key: '1',
    bu_store_key: '1',
  };

  it(`getPaymentService should run properly`, async () => {
    const paymentType = PaymentType.bankTransfer;
    const path = `/V1/payment-service-${paymentType}/get-bu-info`;
    jest.spyOn(paymentDS, 'get').mockReturnValue(Promise.resolve({}) as any);
    await paymentDS.getPaymentService(paymentType);
    expect(paymentDS.get).toBeCalledWith(path);
  });

  it(`createCard should run properly`, async () => {
    const customerId = '1';
    const cardholderName = 'john';
    const cardEncryptData = '1234';
    const expiryMonth = 1;
    const expiryYear = 1;
    const setDefaultCard = true;
    jest.spyOn(paymentDS, 'getPaymentService').mockReturnValue(Promise.resolve(paymentService) as any);
    jest.spyOn(paymentDS, 'post').mockReturnValue(Promise.resolve({ isSuccess: true, card: '1' }) as any);
    await paymentDS.createCard(customerId, cardholderName, cardEncryptData, expiryMonth, expiryYear, setDefaultCard);
    expect(paymentDS.post).toBeCalled();
  });

  it(`createCard isSuccess should throw`, async () => {
    const customerId = '1';
    const cardholderName = 'john';
    const cardEncryptData = '1234';
    const expiryMonth = 1;
    const expiryYear = 1;
    const setDefaultCard = true;
    jest.spyOn(paymentDS, 'getPaymentService').mockReturnValue(Promise.resolve(paymentService) as any);
    jest
      .spyOn(paymentDS, 'post')
      .mockReturnValue(Promise.resolve({ isSuccess: false, card: '1', paymentFailReason: 'TEST' }) as any);
    await expect(() =>
      paymentDS.createCard(customerId, cardholderName, cardEncryptData, expiryMonth, expiryYear, setDefaultCard),
    ).rejects.toThrow(new ApplicationError(`Cannot add a new card [TEST]`));
    expect(paymentDS.post).toBeCalled();
  });

  it(`deleteCard should run properly`, async () => {
    const id = '1';
    const customerId = '1';
    jest.spyOn(paymentDS, 'getPaymentService').mockReturnValue(Promise.resolve(paymentService) as any);
    jest.spyOn(paymentDS, 'delete').mockReturnValue(Promise.resolve({}) as any);
    await paymentDS.deleteCard(id, customerId);
    expect(paymentDS.delete).toBeCalled();
  });

  it(`getCards should run properly`, async () => {
    const customerId = '1';
    jest.spyOn(paymentDS, 'getPaymentService').mockReturnValue(Promise.resolve(paymentService) as any);
    jest.spyOn(paymentDS, 'get').mockReturnValue(Promise.resolve([cardOneBeforeTransform]) as any);
    const result = await paymentDS.getCards(customerId);
    expect(paymentDS.get).toBeCalled();
    expect(result).toEqual([
      {
        ...cardOneBeforeTransform,
        ...cardOne,
      },
    ]);
  });

  it(`getCards should run properly when card return null`, async () => {
    const customerId = '1';
    jest.spyOn(paymentDS, 'getPaymentService').mockReturnValue(Promise.resolve(paymentService) as any);
    jest.spyOn(paymentDS, 'get').mockReturnValue(Promise.resolve(null) as any);
    const result = await paymentDS.getCards(customerId);
    expect(paymentDS.get).toBeCalled();
    expect(result).toEqual([]);
  });

  it(`setDefaultCard should run properly`, async () => {
    const id = '1';
    const customerId = '1';
    jest.spyOn(paymentDS, 'getPaymentService').mockReturnValue(Promise.resolve(paymentService) as any);
    jest.spyOn(paymentDS, 'put').mockReturnValue(Promise.resolve({}) as any);
    await paymentDS.setDefaultCard(id, customerId);
    expect(paymentDS.put).toBeCalled();
  });

  it(`getOfflinePaymentDetail should run properly`, async () => {
    const incrementId = '1';
    jest.spyOn(paymentDS, 'getPaymentService').mockReturnValue(Promise.resolve(paymentService) as any);
    jest.spyOn(paymentDS, 'get').mockReturnValue(Promise.resolve({}) as any);
    await paymentDS.getOfflinePaymentDetail(incrementId);
    expect(paymentDS.get).toBeCalled();
  });

  it(`getDolfinPaymentStatus should run properly`, async () => {
    const incrementId = '1';
    jest.spyOn(paymentDS, 'getPaymentService').mockReturnValue(Promise.resolve(paymentService) as any);
    jest.spyOn(paymentDS, 'get').mockReturnValue(Promise.resolve({}) as any);
    await paymentDS.getDolfinPaymentStatus(incrementId);
    expect(paymentDS.get).toBeCalled();
  });

  it(`offlinePayment should run properly`, async () => {
    const orderEntityId = '1';
    const agentCode = '1';
    const channel = '1';
    const paymentExpiryDateTime = '1';
    jest.spyOn(paymentDS, 'getPaymentService').mockReturnValue(Promise.resolve(paymentService) as any);
    jest.spyOn(paymentDS, 'post').mockReturnValue(Promise.resolve({}) as any);
    await paymentDS.offlinePayment(orderEntityId, agentCode, channel, paymentExpiryDateTime);
    expect(paymentDS.post).toBeCalled();
  });

  it(`offlinePayment should run properly when have channel and agentCode`, async () => {
    const orderEntityId = '1';
    const agentCode = '1';
    const channel = '1';
    const paymentExpiryDateTime = '1';
    const path = `${paymentService.payment_service_base_url}/payment/offline`;
    jest.spyOn(paymentDS, 'getPaymentService').mockReturnValue(Promise.resolve(paymentService) as any);
    jest.spyOn(paymentDS, 'post').mockReturnValue(Promise.resolve({}) as any);
    await paymentDS.offlinePayment(orderEntityId, agentCode, channel, paymentExpiryDateTime);
    expect(paymentDS.post).toBeCalledWith(
      '1/payment/offline',
      expect.objectContaining({
        channel: '1',
        agentCode: '1',
      }),
      expect.objectContaining({
        headers: { Authorization: expect.any(String) },
      }),
    );
  });

  it(`offlinePayment should run properly when dont have channel`, async () => {
    const orderEntityId = '1';
    const agentCode = '1';
    const channel = null;
    const paymentExpiryDateTime = '1';
    jest.spyOn(paymentDS, 'getPaymentService').mockReturnValue(Promise.resolve(paymentService) as any);
    jest.spyOn(paymentDS, 'post').mockReturnValue(Promise.resolve({}) as any);
    await paymentDS.offlinePayment(orderEntityId, agentCode, channel, paymentExpiryDateTime);
    expect(paymentDS.post).toBeCalledWith(
      '1/payment/offline',
      expect.not.objectContaining({
        channel: expect.any(String),
      }),
      expect.objectContaining({
        headers: { Authorization: expect.any(String) },
      }),
    );
  });

  it(`offlinePayment should run properly when dont have agentCode`, async () => {
    const orderEntityId = '1';
    const agentCode = null;
    const channel = '1';
    const paymentExpiryDateTime = '1';
    jest.spyOn(paymentDS, 'getPaymentService').mockReturnValue(Promise.resolve(paymentService) as any);
    jest.spyOn(paymentDS, 'post').mockReturnValue(Promise.resolve({}) as any);
    await paymentDS.offlinePayment(orderEntityId, agentCode, channel, paymentExpiryDateTime);
    expect(paymentDS.post).toBeCalledWith(
      '1/payment/offline',
      expect.not.objectContaining({
        agentCode: expect.any(String),
      }),
      expect.objectContaining({
        headers: { Authorization: expect.any(String) },
      }),
    );
  });

  it(`dolfinPayment should run properly`, async () => {
    const orderEntityId = '1';
    const paymentType = PaymentType.fullPayment;
    jest.spyOn(paymentDS, 'getPaymentService').mockReturnValue(Promise.resolve(paymentService) as any);
    jest.spyOn(paymentDS, 'post').mockReturnValue(Promise.resolve({}) as any);
    await paymentDS.dolfinPayment(orderEntityId, paymentType);
    expect(paymentDS.post).toBeCalled();
  });

  it(`authorizePayment should run properly`, async () => {
    const data = '1';
    const paymentType = PaymentType.fullPayment;
    jest.spyOn(paymentDS, 'getPaymentService').mockReturnValue(Promise.resolve(paymentService) as any);
    jest.spyOn(paymentDS, 'post').mockReturnValue(Promise.resolve({}) as any);
    await paymentDS.authorizePayment(data, paymentType);
    expect(paymentDS.post).toBeCalled();
  });

  it(`binLookup should run properly`, async () => {
    const bin = '1';
    const path = `${paymentService.payment_service_base_url}/card/lookup/${bin}`;
    jest.spyOn(paymentDS, 'getPaymentService').mockReturnValue(Promise.resolve(paymentService) as any);
    jest.spyOn(paymentDS, 'get').mockReturnValue(Promise.resolve({}) as any);
    await paymentDS.binLookup(bin);
    expect(paymentDS.get).toBeCalled();
  });

  it(`binLookup should throw when result is null`, async () => {
    const bin = '1';
    const path = `${paymentService.payment_service_base_url}/card/lookup/${bin}`;
    jest.spyOn(paymentDS, 'getPaymentService').mockReturnValue(Promise.resolve(paymentService) as any);
    jest.spyOn(paymentDS, 'get').mockReturnValue(Promise.resolve(null) as any);

    await expect(() => paymentDS.binLookup(bin)).rejects.toThrow(new ApplicationError('Not Found'));
    expect(paymentDS.get).toBeCalled();
  });
});
