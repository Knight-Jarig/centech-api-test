import gql from 'graphql-tag';

export const v2DeliveryOptionByPostcode = gql`
  query v2DeliveryOptionByPostcode($input: V2DeliveryOptionByPostcodeInput!) {
    v2DeliveryOptionByPostcode(input: $input) {
      title
      methods {
        method
        label
        leadTimes
        freeLabel
        sortOrder
      }
    }
  }
`;
