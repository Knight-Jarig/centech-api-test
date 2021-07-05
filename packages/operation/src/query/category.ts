import gql from 'graphql-tag';

export const category = gql`
  query category($categoryId: ID!) {
    category(id: $categoryId) {
      id
      parent_id
      name
      is_active
      position
      level
      children
      created_at
      updated_at
      include_in_menu
      meta_title
      meta_keywords
      meta_description
      children_count
      url_key
      url_path
      is_virtual_category
      virtual_category_root
      description
      path {
        name
        url_key
        url_path
        id
      }
      extension_attributes
      custom_attributes
      is_hide_display_price
    }
  }
`;
