import gql from 'graphql-tag';

export const binLookup = gql`
  query binLookup($bin: String!) {
    binLookup(bin: $bin) {
        bank_id
        promo_codes
    }
  }
`;
