import gql from 'graphql-tag';

export const urlRewrite = gql`
  query urlRewrite($url: String!) {
    urlRewrite(url: $url) {
      description
      entity_id
      entity_type
      request_path
      target_path
      redirect_type
      store_id
      metadata {
        row_id
        entity_id
        attribute_set_id
        parent_id
        path
        position
        level
        children_count
        url_path
        product_count
        is_anchor
      }
    }
  }
`;
