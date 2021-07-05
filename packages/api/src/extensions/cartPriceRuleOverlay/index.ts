import { IProductResolvers, IResolvers } from '../../types/graphql';
import { ResolverContext } from '../../types';
import productModel from '../../transform/product.model';

const typeDef = ``;

const Product: IProductResolvers<ResolverContext> = {
  async cart_price_rule_overlays({ id }, _, { dataSources }) {
    const overlays = await dataSources.magento.product.getSaleRuleOverlays(id);

    return overlays?.map(productModel.transformPriceRuleOverlay) ?? [];
  },
};

const resolver: IResolvers = {
  Product,
};

export { typeDef, resolver };
