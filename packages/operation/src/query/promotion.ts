import gql from 'graphql-tag';

export const promotion = gql`
  query promotion($filter: FiltersQuery) {
    promotionSuggestion(filter: $filter) {
      sku,
      extension_attributes {
        credit_card_promotions {
          promotion_id
          bank_icon
          bank_color
          simple_action
          is_active
          discount_amount
        }
        t1c {
          redemption_rate
          redeemable_points
          redeemable_amounts
          is_active
        }
        bundles {
          products {
            sku
          }
          discount_amount
          discount_qty
          discount_step
          is_active
          total_price
          total_discount_amount
          total_price_with_discount
        }
        free_items {
          freebies {
            sku
            qty
          }
          is_active
        }
        all_applicable_rules {
            rule_id
            name
            description
            extension_attributes
        }
        tier_price {
          id
          name
          amount
          extension_attributes {
            qty_from
            qty_to
            applicable_store_ids
          }
          type
        }
      }
    }
  }
`;
