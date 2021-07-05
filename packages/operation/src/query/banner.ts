import gql from 'graphql-tag';

export const banner = gql`
  query banner($name: String!) {
    banner(
      input: {
        filterGroups: [
          { filters: [{ field: "name", value: $name, conditionType: eq }] }
          { filters: [{ field: "status", value: "1", conditionType: eq }] }
        ]
      }
    ) {
      id
      name
      animation_effect
      pause_time_between_transitions
      slide_transition_speed
      is_stop_animation_mouse_on_banner
      display_arrows
      display_bullets
      is_random_order_image
      slide_position
      extension_attributes {
        image_dir
        slides {
          id
          status
          store_ids
          img_alt
          img_title
          img_file
          img_url
          url
          is_open_url_in_new_window
          is_add_nofollow_to_url
          extension_attributes {
            cms_content
            cms_position
          }
        }
      }
    }
  }
`;
