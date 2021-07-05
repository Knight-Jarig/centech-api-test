import gql from 'graphql-tag';
import { installmentPlansFragment } from '../fragment/installmentPlansFragment';

export const productSearch = gql`
  query productSearch($filterGroups: [FilterGroups]!, $page: Int!, $size: Int!, $sortOrders: [SortOrder]) {
    productSearch(filter: { filterGroups: $filterGroups, sortOrders: $sortOrders, page: $page, size: $size }) {
      total_count
      sorting {
        code
        name
      }
      filters {
        name
        attribute_code
        position
        items {
          label
          value
          count
          custom_attributes {
            parent_id
            url_path
            level
            url_key
          }
        }
      }
      products {
        id
        name
        visibility
        url_key
        sku
        status
        breadcrumbs {
          category_id
          level
          name
          url
        }
        type_id
        image
        small_image
        thumbnail
        short_description
        price
        special_price
        special_from_date
        special_to_date
        custom_attributes
        custom_attributes_option
        media_gallery_entries {
          file
          id
          label
          media_type
          disabled
          extension_attributes {
            video_content {
              media_type
              video_provider
              video_url
              video_title
              video_description
              video_metadata
            }
          }
        }
        extension_attributes {
          stock_item {
            qty
            is_in_stock
            min_sale_qty
            max_sale_qty
          }
          t1c_redeemable_points
          installment_plans {
            ...installmentPlansFragment
          }
          overall_rating {
            rating
            total_vote
            five_star
            four_star
            three_star
            two_star
            one_star
            rounded_rating
          }
          salable
          ispu_salable
          category_paths {
            category_id
            name
            level
            parent_id
          }
          overlays {
            overlay_image
            overlay_status
            mobile_overlay_status
            overlay_start_date
            overlay_end_date
            overlay_position
          }
          configurable_product_links
          flash_sale_price {
            start_date
            end_date
            special_price
          }
        }
      }
    }
  }
  ${installmentPlansFragment}
`;
