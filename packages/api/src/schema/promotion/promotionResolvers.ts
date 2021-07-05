import { ResolverContext } from '../../types';
import { IPromotionSuggestion, IQueryResolvers } from '../../types/graphql';
import { TierPricePromotion, tierPromotionTypeMap } from './promotionClassTransformer';
import { transformAndValidate } from 'class-transformer-validator';
import * as Sentry from '@sentry/node';
import config from '../../configs/vars';
import { TransformationError } from '../../error/TransformationError';

const PromotionSuggestionExtensionAttribute = {
  async tier_price(root) {
    const result = Object.keys(tierPromotionTypeMap).flatMap(key => {
      return (
        root[key]?.map(item => ({
          ...item,
          type: tierPromotionTypeMap[key],
        })) || []
      );
    });
    return transformAndValidate(TierPricePromotion, result).catch(errors => {
      if (config.sentry.dsn) {
        Sentry.captureException(new TransformationError(errors));
      }
      return [];
    });
  },
};
const Query: IQueryResolvers<ResolverContext> = {
  async promotionSuggestion(_source, { filter }, { dataSources }): Promise<IPromotionSuggestion[]> {
    return dataSources.magento.promotion.suggestion(filter);
  },
};

export default {
  Query,
  PromotionSuggestionExtensionAttribute,
};
