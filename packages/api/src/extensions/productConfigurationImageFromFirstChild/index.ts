/**
 * @title product config image
 * @desc user did not set product config image overwrite image by product simple
 **/
import get from 'lodash/get';
import productModel from '../../transform/product.model';
import customFields from './customFields';
import productResolvers from '../../schema/products/productsResolvers';

const typeDef = ``;

const resolver = {
  ProductSearch: {
    products: async (_source, _, { dataSources, storeCode }) => {
      const productList = get(_source, 'products', []).map(item => {
        const product = productModel.transform(item);
        return customFields.getDataFromProductSimple(product, dataSources, storeCode);
      });

      return productList;
    },
  },
  Query: {
    product: async (_source, input, context) => {
      const transformed = await (productResolvers.Query.product as any)(_source, input, context);
      return customFields.getDataFromProductSimple(transformed, context.dataSources, context.storeCode);
    },
  },
};

export { typeDef, resolver };
