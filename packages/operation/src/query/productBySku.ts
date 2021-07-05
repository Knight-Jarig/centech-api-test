import gql from 'graphql-tag';
import { productFragment } from '../fragment/productFragment';

export const productBySku = gql`
    query productBySku($sku: String!) {
      productBySku(sku: $sku) {
            ...productFragment
            configurable_product_items {
                ...productFragment
            }
            product_links {
                sku
                link_type
                linked_product_sku
                linked_product_type
                position
                product {
                    ...productFragment
                }
            }
        }
    }
    ${productFragment}
`;
