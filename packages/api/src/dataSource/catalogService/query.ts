import { gql } from 'apollo-server';
import { introspectionQuery } from 'graphql';

export const SCHEMA = gql`
  ${introspectionQuery}
`;

const CONFIGURABLE_PRODUCT_FRAGMENT = gql`
  fragment CONFIGURABLE_PRODUCT_FRAGMENT on ConfigurableProduct {
    suggest_promotions {
      promotion_name
      full_condition
      start_datetime
      end_datetime
      label
      short_description
    }
    shipping_delivery_methods {
      shipping_method
      shipping_method_code
      delivery_method
      delivery_method_code
    }
    id
    sku
    name
    price
    breadcrumbs {
      category_id
      level
      name
      url
    }
    categories {
      id
      name
    }
    status
    visibility
    type_id
    created_at
    configurable_product_links
    brand_id
    brand_name
    brand_url
    color_shade_name
    color_group_name
    image
    url_key
    special_price
    special_from_date
    special_to_date
    is_in_stock
    new_tag
    only_at_tag
    promo_tag
    recommended
    flash_deal
    discount_amount
    updated_at
    product_type
    preorder_shipping_date
    max_sale_qty
    min_sale_qty
    collection
    online_exclusive_tag
    marketplace_product_type_option
    marketplace_seller_option
    flash_deal_enable
    flash_deal_qty
    flash_deal_sold_qty
    flash_deal_from
    flash_deal_to
    is_hide_original_price
    is_show_special_product_name
    overlay {
      mobile_status
      end_date
      image
      status
      start_date
    }
    ranking
    flash_deal_position
    recommened_sort_order
    manual_boosting
    size
    allow_cc
    allow_cod
    allow_express
    allow_gift_wrapping
    allow_installment
    allow_return
    bu
    color
    color_shade_id
    color_shade_name
    gift_message_available
    gift_wrapping_available
    installment_plans
    homepage_new
    manage_stock
    min_qty
    payment_methods
    product_id
    product_links {
      sku
      link_type
      linked_product_sku
      linked_product_type
    }
    product_sell_type
    product_status
    shipping_methods
    size_type
    stock_id
    t1c_earn_points_estimate
    t1c_redeemable_points
    thumbnail
    online_salable
    offline_salable
    media_gallery_entries {
      id
      types
      file
      media_type
      label
      position
      disabled
    }
    marketplace {
      seller
      product_type
      offer_id
    }
    overall_rating {
      rating_id
      rating
      category
      option_id
      total_vote
      five_star
      four_star
      three_star
      two_star
      one_star
      rounded_rating
    }
    brand {
      brand_id
      name
      website_ids
      url_key
      logo
      is_featured
      extension_attributes {
        menu_css
        parent_category
        position
        product_count
        product_name_special
        hide_product_original_price
        hide_t1c_redeemable_amount
        allow_product_review
      }
    }
  }
`;

const PRODUCT_FILED_FRAGMENT = gql`
  fragment PRODUCT_FILED_FRAGMENT on Product {
    suggest_promotions {
      promotion_name
      full_condition
      start_datetime
      end_datetime
      label
      short_description
    }
    configurable_products {
      ...CONFIGURABLE_PRODUCT_FRAGMENT
    }
    shipping_delivery_methods {
      shipping_method
      shipping_method_code
      delivery_method
      delivery_method_code
    }
    configurable_product_options {
      id
      attribute_id
      label
      values {
        value_index
        extension_attributes {
          label
          products
          frontend_type
          frontend_value
        }
      }
    }
    id
    sku
    name
    price
    breadcrumbs {
      category_id
      level
      name
      url
    }
    categories {
      id
      name
    }
    status
    visibility
    type_id
    created_at
    configurable_product_links
    brand_id
    brand_name
    brand_url
    color_shade_name
    color_group_name
    image
    url_key
    special_price
    special_from_date
    special_to_date
    is_in_stock
    new_tag
    only_at_tag
    promo_tag
    recommended
    flash_deal
    discount_amount
    updated_at
    product_type
    preorder_shipping_date
    max_sale_qty
    min_sale_qty
    collection
    online_exclusive_tag
    marketplace_product_type_option
    marketplace_seller_option
    flash_deal_enable
    flash_deal_qty
    flash_deal_sold_qty
    flash_deal_from
    flash_deal_to
    is_hide_original_price
    is_show_special_product_name
    news_from_date
    overlay {
      mobile_status
      end_date
      image
      status
      start_date
    }
    ranking
    flash_deal_position
    recommened_sort_order
    manual_boosting
    size
    allow_cc
    allow_cod
    allow_express
    allow_gift_wrapping
    allow_installment
    allow_return
    bu
    color
    color_shade_id
    color_shade_name
    gift_message_available
    gift_wrapping_available
    installment_plans
    homepage_new
    manage_stock
    min_qty
    payment_methods
    product_id
    product_links {
      sku
      link_type
      linked_product_sku
      linked_product_type
    }
    product_sell_type
    product_status
    shipping_methods
    size_type
    stock_id
    t1c_earn_points_estimate
    t1c_redeemable_points
    thumbnail
    online_salable
    offline_salable
    media_gallery_entries {
      id
      types
      file
      media_type
      label
      position
      disabled
    }
    marketplace {
      seller
      product_type
      offer_id
    }
    overall_rating {
      rating_id
      rating
      category
      option_id
      total_vote
      five_star
      four_star
      three_star
      two_star
      one_star
      rounded_rating
    }
    brand {
      brand_id
      name
      website_ids
      url_key
      logo
      is_featured
      extension_attributes {
        menu_css
        parent_category
        position
        product_count
        product_name_special
        hide_product_original_price
        hide_t1c_redeemable_amount
        allow_product_review
      }
    }
  }
`;

const PRODUCT_FRAGMENT = gql`
  fragment PRODUCT_FRAGMENT on Product {
    ...PRODUCT_FILED_FRAGMENT
    configurable_products {
      ...CONFIGURABLE_PRODUCT_FRAGMENT
    }
  }
`;

const PRODUCT_DETAIL_FRAGMENT = gql`
  fragment PRODUCT_DETAIL_FRAGMENT on Product {
    ...PRODUCT_FILED_FRAGMENT
    description
    short_description
    meta_description
    meta_keyword
    meta_title
    category_paths {
      parent_id
      category_id
      name
      level
    }
    categories {
      parent_id
      id
      name
      url_path
    }
    extension_attributes_installment_plans {
      period
      interest_type
      min_amount
      valid_from
      active
      update
      valid_until
      bank_id
      name
      customer_rate
      installmentplan_id
      max_amount
      create
      currency
      merchant_rate
      bank {
        color
        bank_id
        bank_image
        name
        icon
        active
        create
        update
      }
    }
    reviews {
      region_id
      review_id
      nickname
      created_at
      rating_items {
        rating_id
        rating
        category
        option_id
        total_vote
        five_star
        four_star
        three_star
        two_star
        one_star
      }
      title
      detail
      is_validate
      extension_attributes {
        email
        images
      }
    }
    media_gallery_entries_video {
      id
      store_id
      provider
      url
      title
      description
      metadata
    }
    configurable_products {
      ...CONFIGURABLE_PRODUCT_FRAGMENT
      description
      short_description
      meta_description
      meta_keyword
      meta_title
      category_paths {
        parent_id
        category_id
        name
        level
      }
      categories {
        parent_id
        id
        name
        url_path
      }
      extension_attributes_installment_plans {
        period
        interest_type
        min_amount
        valid_from
        active
        update
        valid_until
        bank_id
        name
        customer_rate
        installmentplan_id
        max_amount
        create
        currency
        merchant_rate
        bank {
          color
          bank_id
          bank_image
          name
          icon
          active
          create
          update
        }
      }
      reviews {
        region_id
        review_id
        nickname
        created_at
        rating_items {
          rating_id
          rating
          category
          option_id
          total_vote
          five_star
          four_star
          three_star
          two_star
          one_star
        }
        title
        detail
        is_validate
        extension_attributes {
          email
          images
        }
      }
      media_gallery_entries_video {
        id
        store_id
        provider
        url
        title
        description
        metadata
      }
    }
  }
`;

export const FIND_BY_URL_KEY = gql`
  query findByUrlKey($url: String!, $locale: String!) {
    findByUrlKey(locale: $locale, url_key: $url) {
      product {
        ...PRODUCT_DETAIL_FRAGMENT
      }
    }
  }

  ${PRODUCT_FILED_FRAGMENT}
  ${PRODUCT_DETAIL_FRAGMENT}
  ${CONFIGURABLE_PRODUCT_FRAGMENT}
`;

export const LEGACY_SEARCH_AGGREGATION = gql`
  query search(
    $store: String!
    $locale: String!
    $keyword: String
    $sort_orders: DynamicSort
    $pagination: Pagination
    $filter: Filter
    $filter_groups: [CommonFilter]
    $sort: Sort
  ) {
    search(
      store: $store
      locale: $locale
      keyword: $keyword
      sort_orders: $sort_orders
      pagination: $pagination
      filter: $filter
      filter_groups: $filter_groups
      sort: $sort
    ) {
      total
      aggregations {
        label
        field
        value
        position
        buckets {
          key
          doc_count
        }
      }
      category_aggregations {
        id
        name
        parent_id
        level
        url_path
        doc_count
        url_key
      }
    }
  }
`;

export const LEGACY_SEARCH = gql`
  query search(
    $store: String!
    $locale: String!
    $keyword: String
    $sort_orders: DynamicSort
    $pagination: Pagination
    $filter: Filter
    $filter_groups: [CommonFilter]
    $sort: Sort
  ) {
    search(
      store: $store
      locale: $locale
      keyword: $keyword
      sort_orders: $sort_orders
      pagination: $pagination
      filter: $filter
      filter_groups: $filter_groups
      sort: $sort
    ) {
      total
      products {
        id
        sku
        name
        status
        visibility
        type_id
        created_at
        updated_at
        brand_name
        brand_url
        image
        url_key
        is_in_stock
        price
        special_price
        special_from_date
        special_to_date
        discount_amount
        new_tag
        only_at_tag
        promo_tag
        online_exclusive_tag
        recommended
        best_sellers
        collection
        min_sale_qty
        max_sale_qty
        preorder_shipping_date
        product_type
        flash_deal
        flash_deal_qty
        flash_deal_sold_qty
        flash_deal_from
        flash_deal_to
        marketplace_product_type_option
        marketplace_seller_option
        color_group_name
        size
        homepage_new
        news_from_date
        online_salable
        offline_salable
        overall_rating {
          rating_id
          rating
          category
          option_id
          total_vote
          five_star
          four_star
          three_star
          two_star
          one_star
          rounded_rating
        }
        overlay {
          image
          status
          mobile_status
          start_date
          end_date
        }
        breadcrumbs {
          category_id
          level
          name
          url
        }
        categories {
          id
          name
          parent_id
          url_path
        }
        configurable_product_links
        configurable_products {
          id
          sku
          name
          status
          visibility
          type_id
          created_at
          updated_at
          brand_name
          brand_url
          image
          url_key
          is_in_stock
          price
          special_price
          special_from_date
          special_to_date
          discount_amount
          new_tag
          only_at_tag
          promo_tag
          online_exclusive_tag
          recommended
          best_sellers
          collection
          min_sale_qty
          max_sale_qty
          preorder_shipping_date
          product_type
          flash_deal
          flash_deal_qty
          flash_deal_sold_qty
          flash_deal_from
          flash_deal_to
          marketplace_product_type_option
          marketplace_seller_option
          size
          color_group_name
          online_salable
          offline_salable
          overlay {
            image
            status
            mobile_status
            start_date
            end_date
          }
          breadcrumbs {
            category_id
            level
            name
            url
          }
          categories {
            id
            name
            parent_id
            url_path
          }
          shipping_delivery_methods {
            shipping_method
            shipping_method_code
            delivery_method
            delivery_method_code
          }
        }
        configurable_product_options {
          attribute_id
          label
          values {
            value_index
            extension_attributes {
              frontend_type
              frontend_value
              label
              products
            }
          }
        }
        shipping_delivery_methods {
          shipping_method
          shipping_method_code
          delivery_method
          delivery_method_code
        }
      }
      aggregations {
        field
        value
        buckets {
          key
          doc_count
        }
      }
      category_aggregations {
        id
        name
        level
        parent_id
        url_path
        doc_count
        url_key
      }
    }
  }
`;

export const findBySkus = gql`
  query findBySkus($store: String!, $locale: String!, $values: [String]!, $pagination: Pagination) {
    products: findBySkus(store: $store, locale: $locale, pagination: $pagination, skus: $values) {
      products {
        ...PRODUCT_FRAGMENT
      }
    }
  }

  ${PRODUCT_FILED_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  ${CONFIGURABLE_PRODUCT_FRAGMENT}
`;

export const findByIds = gql`
  query findByIds($store: String!, $locale: String!, $values: [String]!, $pagination: Pagination) {
    products: findByIds(store: $store, locale: $locale, pagination: $pagination, ids: $values) {
      products {
        ...PRODUCT_FRAGMENT
      }
    }
  }

  ${PRODUCT_FILED_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  ${CONFIGURABLE_PRODUCT_FRAGMENT}
`;

export const findProductDetailByIds = gql`
  query findByIds($store: String!, $locale: String!, $values: [String]!, $pagination: Pagination) {
    products: findByIds(store: $store, locale: $locale, pagination: $pagination, ids: $values) {
      products {
        ...PRODUCT_DETAIL_FRAGMENT
      }
    }
  }

  ${PRODUCT_FILED_FRAGMENT}
  ${PRODUCT_DETAIL_FRAGMENT}
  ${CONFIGURABLE_PRODUCT_FRAGMENT}
`;

export const findProductDetailBySkus = gql`
  query findProductDetailBySkus($store: String!, $locale: String!, $values: [String]!, $pagination: Pagination) {
    products: findBySkus(store: $store, locale: $locale, pagination: $pagination, skus: $values) {
      products {
        ...PRODUCT_DETAIL_FRAGMENT
      }
    }
  }

  ${PRODUCT_FILED_FRAGMENT}
  ${PRODUCT_DETAIL_FRAGMENT}
  ${CONFIGURABLE_PRODUCT_FRAGMENT}
`;

export const SEARCH = gql`
  query search(
    $store: String!
    $locale: String!
    $keyword: String
    $sort_orders: DynamicSort
    $pagination: Pagination
    $filter: Filter
    $filter_groups: [CommonFilter]
    $sort: Sort
  ) {
    search(
      store: $store
      locale: $locale
      keyword: $keyword
      sort_orders: $sort_orders
      pagination: $pagination
      filter: $filter
      filter_groups: $filter_groups
      sort: $sort
    ) {
      total
      products {
        ...PRODUCT_FRAGMENT
      }
      aggregations {
        label
        field
        value
        position
        buckets {
          key
          doc_count
        }
      }
      category_aggregations {
        id
        name
        parent_id
        level
        url_path
        doc_count
        url_key
      }
    }
  }

  ${PRODUCT_FILED_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  ${CONFIGURABLE_PRODUCT_FRAGMENT}
`;

export const SEARCH_PRODUCT_DETAIL = gql`
  query searchProductDetail(
    $store: String!
    $locale: String!
    $keyword: String
    $sort_orders: DynamicSort
    $pagination: Pagination
    $filter: Filter
    $filter_groups: [CommonFilter]
    $sort: Sort
  ) {
    search(
      store: $store
      locale: $locale
      keyword: $keyword
      sort_orders: $sort_orders
      pagination: $pagination
      filter: $filter
      filter_groups: $filter_groups
      sort: $sort
    ) {
      total
      products {
        ...PRODUCT_DETAIL_FRAGMENT
      }
      aggregations {
        label
        field
        value
        position
        buckets {
          key
          doc_count
        }
      }
      category_aggregations {
        id
        name
        parent_id
        level
        url_path
        doc_count
        url_key
      }
    }
  }

  ${PRODUCT_FILED_FRAGMENT}
  ${PRODUCT_DETAIL_FRAGMENT}
  ${CONFIGURABLE_PRODUCT_FRAGMENT}
`;

export const SUGGEST_SEARCH = gql`
  query suggestSearch($store: String!, $locale: String!, $keyword: String!, $product_size: Int, $category_size: Int) {
    suggestSearch(
      store: $store
      locale: $locale
      keyword: $keyword
      product_size: $product_size
      category_size: $category_size
    ) {
      products {
        ...PRODUCT_FRAGMENT
      }
      categories {
        id
        name
        parent_id
        url_path
        is_gtm
      }
    }
  }

  ${PRODUCT_FILED_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  ${CONFIGURABLE_PRODUCT_FRAGMENT}
`;
