import gql from 'graphql-tag';
import { productFragment } from './../fragment/productFragment'

export const wishList = gql`
  query wishList($filter: FiltersQuery! $withProduct: Boolean = false) {
    wishlists(filter: $filter) {
      items {
        wishlist_id
        items {
          product_id
          wishlist_item_id
          added_at
          custom_attributes {
            attribute_code
            name
            value
          }
          product @include(if: $withProduct) {
            ...productFragment
            configurable_product_items {
              ...productFragment
            }
          }
        }
      }
    }
  }
  ${productFragment}
`;
