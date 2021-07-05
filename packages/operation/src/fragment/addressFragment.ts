import gql from 'graphql-tag';

export const addressFragment = gql`
  fragment addressFragment on CustomerAddress {
    id
    firstname
    lastname
    telephone

    building
    address_line
    subdistrict {
      id
      name
    }
    district {
      id
      name
    }
    province {
      id
      name
    }
    postcode

    address_name
    customer_address_type
    full_tax_type
    vat_id
    company
    branch_id

    country_id

    is_default_billing
    is_default_shipping

    city
    region_id
    region {
      region_id
      region
      region_code
    }
    customer_id

    default_billing
    default_shipping
    street

    custom_attributes
  }
`;
