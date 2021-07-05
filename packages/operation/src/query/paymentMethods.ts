import gql from 'graphql-tag';
import { installmentPlansFragment } from '../fragment/installmentPlansFragment';

export const paymentMethods = gql`
  query paymentMethods($cartId: String, $isGuest: Boolean, $childrenIds: [String!]) {
    paymentInformations(isGuest: $isGuest, cartId: $cartId, childrenIds: $childrenIds) {
      payment_methods {
        code
        title
      }
      installment_plans {
        ...installmentPlansFragment
        extension_attributes {
          p2c2p_ipp_amount_per_month
        }
      }
      extension_attributes {
        is_payment_promotion_locked
        p2c2p_payment_options {
          payment
          code
        }
        p2c2p_payment_agents {
          agent_id
          name
          code
          type
          channel
          agent_image
        }
        p2c2p_credit_card_promotions {
          promotion_id
          bank
          description
          card_type
          card_name
          card_image
          banner
          promotion_code
          payment_method
          ipp_plan
          bank_color
          bank_icon
          simple_action
          discount_amount
        }
        p2c2p_installment_unavailable_message
      }
    }
  }
  ${installmentPlansFragment}
`;
