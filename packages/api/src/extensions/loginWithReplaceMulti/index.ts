import { sign } from 'jsonwebtoken';
import { pick, uniqBy } from 'lodash';
import { ILoginResponse, IMutationResolvers } from '../../types/graphql';
import { ResolverContext } from '../../types';
import typeDef from './types.graphql';
import { SocialLoginVersion } from '../../dataSource/magento/auth/MagentoAuthParams';
import configs from '../../configs/vars';
import { ApplicationError } from '../../error/ApplicationError';
import { MagentoCartRequestMultiCartItem } from '../../dataSource/magento/cart/MagentoCartRequest';
import { MDCCart } from '../../dataSource/magento/cart/MagentoCartResponse';
import { CoreAPIDataSources } from '../../dataSource';

export async function getCartOrCreateCartMine(userToken, storeCode, dataSources: CoreAPIDataSources) {
  try {
    return await dataSources.magento.cart.getCartMine(storeCode);
  } catch {
    try {
      await dataSources.magento.cart.createCartMine(userToken, storeCode);
      return dataSources.magento.cart.getCartMine(storeCode);
    } catch (e) {}
  }
}

export async function replaceMulti(cartMine, guestToken, storeCode, dataSources: CoreAPIDataSources, isReplaceCart) {
  try {
    const cartGuest = await dataSources.magento.cartGuest.getCartGuest(guestToken, storeCode);
    if (cartGuest.items.length === 0) return;
    if (isReplaceCart) {
      const cartItems: MagentoCartRequestMultiCartItem[] = cartGuest.items
        .filter(({ price }) => price !== 0)
        .map(item => pick(item, ['sku', 'qty']));
      await dataSources.magento.cart.replaceCartItem(cartItems);
      await dataSources.magento.cart.clearBillingAddress(cartMine.id);
    } else {
      const cartItems: MagentoCartRequestMultiCartItem[] = uniqBy(
        [...cartMine.items, ...cartGuest.items]
          .filter(({ price }) => price !== 0)
          .map(item => pick(item, ['sku', 'qty'])),
        'sku',
      );
      await dataSources.magento.cart.replaceCartItem(cartItems);
      await dataSources.magento.cart.clearBillingAddress(cartMine.id);
    }
  } catch (e) {}
}

const Mutation: IMutationResolvers<ResolverContext> = {
  async login(
    _source,
    { input: { username, password, guestToken, guest_token, is_jwt, isReplaceCart } },
    context,
  ): Promise<ILoginResponse> {
    const { dataSources, storeCode } = context;
    const guestTokenInput = guest_token || guestToken;
    const replaceCart = isReplaceCart || false;
    let data;
    try {
      data = await dataSources.magento.auth.getCustomerToken({
        username,
        password,
      });
      context.customerToken = `Bearer ${data}`;
    } catch (e) {
      let errorStatus;
      try {
        errorStatus = e.extensions.response.status;
      } catch (_e) {}

      if (errorStatus === 401) {
        throw ApplicationError.create(e);
      }
      throw e;
    }

    const cartMine: MDCCart = await getCartOrCreateCartMine(data, storeCode, dataSources);

    if (guestTokenInput && cartMine) {
      await replaceMulti(cartMine, guestTokenInput, storeCode, dataSources, replaceCart);
    }

    if (is_jwt) {
      data = sign({ token: data }, configs.jwt.secret);
    }

    return {
      token: data,
    };
  },
  async socialLogin(_, { input: { provider, token, is_jwt, guest_token, isReplaceCart } }, context) {
    const { dataSources, storeCode } = context;
    const replaceCart = isReplaceCart || false;
    let data = await dataSources.magento.auth.socialLogin(
      {
        provider,
        token,
      },
      SocialLoginVersion.V2,
    );
    context.customerToken = `Bearer ${data}`;

    const cartMine: MDCCart = await getCartOrCreateCartMine(data, storeCode, dataSources);

    if (guest_token && cartMine) {
      await replaceMulti(cartMine, guest_token, storeCode, dataSources, replaceCart);
    }

    if (is_jwt) {
      data = sign({ token: data }, configs.jwt.secret);
    }
    return {
      token: data,
    };
  },
};

const resolver = {
  Mutation,
};

export { typeDef, resolver };
