import gql from 'graphql-tag';

export const paymentOffline = gql`
  query paymentOffline($incrementId: String!, $key: String!) {
    paymentOffline(incrementId: $incrementId, key: $key) {
      orderId
      paymentCode
      referenceCode
      agentpaymentCode
      paymentExpiry
      instructionUrl
      barcodeValue
      barcodeImage
      qrCodeImage
      amount
      currencyCode
      merchantName
      amountString
    }
  }
`;
