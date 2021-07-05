import gql from 'graphql-tag';

export const withStoreConfig = gql`
  query withStoreConfig {
    storeConfigs {
      id
      code
      website_id
      locale
      base_url
      base_media_url
      extension_attributes {
        google_tag_manager_key
      }
    }
    #    activeConfig {
    #      id
    #      code
    #      website_id
    #      locale
    #      base_url
    #      base_media_url
    #      extension_attributes {
    #        google_tag_manager_key
    #      }
    #    }
  }
`;
