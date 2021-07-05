import gql from 'graphql-tag';
import { addressFragment } from '../fragment/addressFragment';

export const customer = gql`
  query customer($withConsent: Boolean = false) {
    customer {
      id
      group_id
      created_at
      updated_at
      created_in
      default_billing
      default_shipping
      email
      dob
      gender
      firstname
      lastname
      store_id
      website_id
      addresses {
        ...addressFragment
      }
      extension_attributes {
        is_subscribed
      }
      is_subscribed
      phone
      tax_id
      t1c_no
      t1c_phone
      language
      custom_attributes
      need_reaccept_consents @include(if: $withConsent) 
    }
  }

  ${addressFragment}
`;
