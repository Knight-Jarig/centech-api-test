import gql from 'graphql-tag';
import { marketPlaceSellerFragment } from './marketPlaceSellerFragment';
import { productBrandFragment } from './productBrandFragment';
import { installmentPlansFragment } from './installmentPlansFragment';

export const productFragment = gql`
  fragment productFragment on Product {
    #    __typename
    id
    name
    url_key
    sku
    breadcrumbs {
      category_id
      level
      name
      url
    }
    product_tags
    visibility
    status
    type_id
    image
    marketplace_product_type_option
    marketplace_seller_option
    small_image
    thumbnail
    description
    short_description
    price
    price_min
    price_max
    sale_price_min
    sale_price_max
    special_price
    special_from_date
    special_to_date
    meta_title
    meta_keyword
    meta_description
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
      suggest_promotions {
        promotion_name
        full_condition
        start_datetime
        end_datetime
      }
      free_shipping_amount
      brand {
        ...productBrandFragment
      }
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
      specification_attributes {
        attribute_code
        label
        value
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
      reviews {
        nickname
        rating_items {
          rating_id
          rating
          category
        }
        created_at
        title
        detail
        is_validate
        region_id
        images {
          path
        }
      }
      cc_promotions {
        discount
        bank_icon
        bank_color
        sales_rule_id
        promotion_id
      }
      salable
      ispu_salable
      seller_url_key
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
      size_map {
        size
        type
      }
      size_maps {
        size
        type
      }
      configurable_product_options {
        id
        attribute_id
        label
        position
        values {
          value_index
          extension_attributes {
            label
            frontend_value
            frontend_type
            products
          }
        }
      }
    }
    marketplace {
      ...marketPlaceSellerFragment
    }
    cart_price_rule_overlays {
      id
      overlay_image
      display_priority
    }
    isReview
  }
  ${marketPlaceSellerFragment}
  ${productBrandFragment}
  ${installmentPlansFragment}
`;
