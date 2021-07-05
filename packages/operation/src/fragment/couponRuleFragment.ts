import gql from 'graphql-tag';

export const couponRuleFragment = gql`
  fragment couponRuleFragment on CouponRuleData {
    rule_id
    name
    store_labels
    description
    website_ids
    customer_group_ids
    from_date
    to_date
    uses_per_customer
    is_active
    condition {
      condition_type
      conditions {
        condition_type
        operator
        attribute_name
        value
      }
      aggregator_type
      operator
      value
    }
    action_condition {
      condition_type
      aggregator_type
      operator
      value
    }
    stop_rules_processing
    is_advanced
    sort_order
    simple_action
    discount_amount
    discount_step
    apply_to_shipping
    times_used
    is_rss
    coupon_type
    use_auto_generation
    uses_per_coupon
    extension_attributes {
      term_and_condition
      coupon_image
      reward_points_delta
      ampromo_rule {
        sku
        type
        after_product_banner_show_gift_images
        top_banner_show_gift_images
        minimal_items_price
        apply_tax
        apply_shipping
      }
      amrules {
        promo_cats
        promo_skus
        apply_discount_to
        eachm
        priceselector
        nqty
        max_discount
        skip_rule
      }
      t1c_special_rate {
        entity_id
        salesrule_id
        redemption_rate
        maximum_point_rate
      }
      central_salesrulemaxdiscount_rule {
        entity_id
        rule_id
        max_discount_amount
      }
      discount_code
      promotion_mdid
    }
    promotion_mdid
  }
`;
