import { sign } from 'jsonwebtoken';
import { IMutationResolvers } from '../../types/graphql';
import { ResolverContext } from '../../types';
import typeDef from './types.graphql';
import { SocialLoginVersion } from '../../dataSource/magento/auth/MagentoAuthParams';
import configs from '../../configs/vars';

const Mutation: IMutationResolvers<ResolverContext> = {
  async socialLogin(_, { input: { provider, token, is_jwt, guest_token } }, { dataSources, storeCode }) {
    let result = await dataSources.magento.auth.socialLogin(
      {
        provider,
        token,
      },
      SocialLoginVersion.V2,
    );

    if (is_jwt) {
      result = sign({ token: result }, configs.jwt.secret);
    }

    if (result) {
      if (guest_token) {
        try {
          await dataSources.magento.cart.mergeGuestCart(result, guest_token);
        } catch (error) {
          try {
            await dataSources.magento.cart.createCartMine(result, storeCode);
            await dataSources.magento.cart.mergeGuestCart(result, guest_token);
          } catch (err) {
            console.error(err);
          }
        }
      }
    }

    return {
      token: result,
    };
  },
};

const resolver = {
  Mutation,
};

export { typeDef, resolver };
