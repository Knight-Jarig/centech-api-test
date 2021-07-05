import gql from 'graphql-tag';

export const storeConfigFragment = gql`
  fragment storeConfigFragment on StoreConfig {
    id
    code
    website_id
    locale
    base_url
    base_media_url
    extension_attributes {
      google_tag_manager_key
      google_tag_manager_cookies {
        identifier
        experiment_id
        cookie_variant_id
        request_header_value
      }
      social_facebook_app_id
      review_image_upload {
        max_number_of_file_upload
        max_size_upload
        allow_extensions
        folder_upload
      }
    }
  }
`;
