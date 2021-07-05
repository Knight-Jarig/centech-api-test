const PaymentDataSource = jest.fn(() => {
  return {
    offlinePayment: jest.fn(),
    authorizePayment: jest.fn(),
  };
});

enum PaymentType {
  fullPayment = 'full-payment',
  installment = 'installment',
  bankTransfer = 'bank-transfer',
  dolfin = 'dolfin',
}

export { PaymentDataSource, PaymentType };