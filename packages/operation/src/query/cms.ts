import gql from 'graphql-tag';

export const cms = gql`
  query cms($filter: CmsFilterInput!) {
    cms(filter: $filter) {
      status
      cms_list {
        _id
        identifier
        name
        url_key
        updated_at
        status
        custom_field
        layout_type
        page_layout
        contents {
          css
          js
          html
          instagram
          meta
        }
        languages {
          en {
            css
            html
            meta
            lang_code
            _id
            contents
          }
          th {
            css
            html
            meta
            lang_code
            _id
            contents
          }
        }
      }
    }
  }
`;
