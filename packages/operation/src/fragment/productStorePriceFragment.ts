import gql from 'graphql-tag';

export const productStorePriceFragment = gql`
  fragment productStorePriceFragment on ProductStorePrice {
    entity_id
    id
    price
    sku
    special_price
    configurable_product_items {
        entity_id
        id
        price
        sku
        special_price
    }
  }
`;
