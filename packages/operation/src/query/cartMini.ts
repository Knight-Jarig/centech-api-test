import gql from 'graphql-tag';
import { cartFragment } from '../fragment/cartFragment';

export const cartMini = gql`
    query cartMini($isGuest: Boolean, $cartId: String) {
        cartMini(isGuest: $isGuest, cartId: $cartId) {
            ...cartFragment
        }
    }
    ${cartFragment}
`;
