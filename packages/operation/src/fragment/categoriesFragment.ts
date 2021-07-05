import gql from 'graphql-tag';

export const categoriesFragment = gql`
  fragment categoriesFragment on CategoryFlat {
    entity_id
    parent_id
    name
    is_active
    position
    level
    path
    include_in_menu
    product_count
    children
    children_count
    url_key
    url_path
    virtual_category_root
    segment_information
    image_icon_tablet
    image_mobile
    image
    icon
  }
`;
