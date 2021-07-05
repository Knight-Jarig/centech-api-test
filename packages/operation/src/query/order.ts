import gql from 'graphql-tag';
import { orderFragment } from '../fragment/orderFragment';

export const order = gql`
  query order($orderId: Int! $withShipment: Boolean = false) {
    order(orderId: $orderId) {
      ...orderFragment
      shipment @include(if: $withShipment) {
        con_no
        ref_no
        order_id
        status
        status_code
        status_desc
        status_date
        update_date
        location
      }
    }
  }
  ${orderFragment}
`;

export const trackOrder = gql`
  query trackOrder($incrementId: String!) {
    trackOrder(incrementId: $incrementId) {
      con_no
      status_code
      status_desc
      status_date
      update_date
      ref_no
      order_id
      status
      location
    }
  }
`
