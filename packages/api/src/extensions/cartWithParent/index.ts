import typeDef from './types.graphql';
import { ResolverContext } from '../../types';
import { ApplicationError } from '../../error/ApplicationError';
import productModel from '../../transform/product.model';
import { ICartItemResolvers, IProduct } from '../../types/graphql';

const CartItem: ICartItemResolvers<ResolverContext> = {
  parent({ extension_attributes }, _, { dataSources }) {
    const { parent_sku: parentSku } = extension_attributes;
    return parentSku ? findBySku(parentSku, dataSources) : null;
  },
  product({ sku }, _, { dataSources }) {
    return sku ? findBySku(sku, dataSources) : null;
  },
};

async function findBySku(sku: string, dataSources): Promise<IProduct> {
  const result = await dataSources.catalogService.findBySkuNew(sku);
  if (!result) {
    throw new ApplicationError('Product not found');
  }

  return productModel.transform(result);
}

const resolver = {
  CartItem,
};

export { typeDef, resolver };
