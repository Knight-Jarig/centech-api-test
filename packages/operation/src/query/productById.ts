import gql from 'graphql-tag';
import { productFragment } from '../fragment/productFragment';

export const productById = gql`
    query productById($id: String!) {
        productById(id: $id) {
            ...productFragment
            configurable_product_items {
                ...productFragment
                online_salable
                offline_salable
            }
            product_links {
                sku
                link_type
                linked_product_sku
                linked_product_type
                position
                product {
                    ...productFragment
                    online_salable
                    offline_salable
                }
            }
            online_salable
            offline_salable
        }
    }
    ${productFragment}
`;
