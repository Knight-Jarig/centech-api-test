import gql from 'graphql-tag';

export const productAssociationBySku = gql`
  query productAssociationBySku($sku: String, $limit: Int) {
    productAssociationBySku(sku: $sku, limit: $limit)
  }
`;
