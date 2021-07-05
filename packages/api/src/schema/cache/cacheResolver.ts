import { ResolverContext } from '../../types';
import { IClearCacheBySkuResponse, IMutationResolvers } from '../../types/graphql';
import { ApplicationError } from '../../error/ApplicationError';
import { generateTagKeyBySku } from '../../utils/cache';

const Mutation: IMutationResolvers<ResolverContext> = {
  async clearCacheBySku(_source, { input }, { redisClient, dataSources }): Promise<IClearCacheBySkuResponse> {
    if (!redisClient) {
      throw new ApplicationError('redisClient has not been created.');
    }

    const { sku, username, password } = input;

    try {
      await dataSources.magento.admin.requestAdminToken(username, password);

      const tagKey = generateTagKeyBySku(sku);
      const cachedKeys = await redisClient.smembers(tagKey);

      cachedKeys.forEach(key => {
        redisClient.delete(key);
      });
      redisClient.delete(tagKey);
    } catch (error) {
      throw ApplicationError.create(error);
    }

    return {
      isSuccess: true,
    };
  },
};

export default {
  Mutation,
};
