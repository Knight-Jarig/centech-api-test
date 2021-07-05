import gql from 'graphql-tag';

export const productBrandFragment = gql`
  fragment productBrandFragment on ProductsExtensionAttributesBrand {
    brand_id
    name
    url_key
    logo
    extension_attributes {
      parent_category
      menu_css
      hide_t1c_redeemable_amount
      hide_product_original_price
      product_name_special
    }
  }
`;
