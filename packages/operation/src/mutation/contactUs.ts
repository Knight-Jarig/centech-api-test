import gql from 'graphql-tag';

export const contactUs = gql`
  mutation contactUs($contact: ContactUsInput!, $storeCode: String) {
    contactUs(storeCode: $storeCode, input: $contact) {
      success
      message
    }
  }
`;
