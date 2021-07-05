import gql from 'graphql-tag';

export const consentInfo = gql`
  query consentInfo {
    consentInfo {
      marketing
      privacy_policy
      version
    }
  }
`;
