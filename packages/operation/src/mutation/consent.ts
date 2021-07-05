import gql from 'graphql-tag';

export const consent = gql`
  mutation consent($input: AcceptConsentInput!) {
    consent(input: $input) {
      id
      email
      need_reaccept_consents
    }
  }
`;
