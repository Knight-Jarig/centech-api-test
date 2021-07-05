import gql from 'graphql-tag';

export const getAddress = gql`
  query getAddress($input: GetCustomerAddress!) {
    getAddress(input: $input) {
      id
      customer_id
      firstname
      lastname
      city
      telephone
      country_id
      vat_id
      company
      region_id
      region
      default_billing
      default_shipping
      postcode
      custom_attributes
    }
  }
`;
