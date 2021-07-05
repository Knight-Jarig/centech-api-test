import gql from 'graphql-tag';

export const brandDetail = gql`
  query brandDetail($brandId: Int) {
    brandDetail(brandId: $brandId) {
      brand_id
      attribute_id
      attribute_code
      option_id
      name
      website_ids
      url_key
      logo
      is_featured
      content {
        brand_id
        store_id
        meta_title
        meta_description
        description
      }
      meta_title
      meta_description
      description
      brand_additional_products {
        product_id
        position
      }
      extension_attributes {
        disable_new_arrival_section
        disable_best_seller_section
        parent_category
        menu_css
        content_css
        brand_image_url
        position
        product_collections {
          brand_collection_id
          brand_id
          url
          content
          identification
          name
          description
          brand_collection_products {
            product_id
            position
          }
          position
          deep_link
          is_official
          collection_products_textarea
        }
        product_count
        product_name_special
        hide_product_original_price
        hide_t1c_redeemable_amount
        allow_product_review
        banners
        sort_orders {
          field
          direction
        }
      }
    }
  }
`;
