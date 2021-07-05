import gql from 'graphql-tag';

export const urlRedirect = gql`
  query urlRedirect($url: String!) {
    urlRedirect(url: $url) {
      target_path
      redirect_type
    }
  }
`;
