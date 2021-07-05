import gql from 'graphql-tag';

export const updateMultiplePaymentInformation = gql`
  mutation updateMultiplePaymentInformation($input: MultipleInformationFormat!) {
    updateMultiplePaymentInformation(input: $input) {
      statusPayment
    }
  }
`;
