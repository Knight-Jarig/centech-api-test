import gql from 'graphql-tag';

export const stockItem = gql`
  query stockItem($sku: String!) {
    stockItem(sku: $sku) {
      qty
      is_in_stock
      use_config_min_qty
      min_qty
      use_config_min_sale_qty
      min_sale_qty
      use_config_max_sale_qty
      max_sale_qty
      item_id
      product_id
      stock_id
      is_qty_decimal
      backorders
      use_config_backorders
      low_stock_date
      notify_stock_qty
      use_config_notify_stock_qty
      manage_stock
      use_config_manage_stock
      stock_status_changed_auto
      qty_increments
      use_config_qty_increments
      enable_qty_increments
      use_config_enable_qty_increments
      is_decimal_divided
      show_default_notification_message
    }
  }
`;
