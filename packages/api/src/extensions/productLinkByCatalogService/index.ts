/**
 * @title
 * @desc user did not set product config image overwrite image by product simple
 **/
import productModel from '../../transform/product.model';
import { IConditionType } from '../../types/graphql';

const typeDef = ``;

const resolver = {
  ProductLink: {
    product: async ({ linked_product_sku }, _, { dataSources, storeCode }) => {
      if (!linked_product_sku) return null;
      try {
        const criteria = {
          filterGroups: [
            { filters: [{ field: 'sku', value: linked_product_sku }] },
            { filters: [{ field: 'status', value: '1' }] },
            { filters: [{ field: 'visibility', value: '2,4', conditionType: IConditionType.In }] },
            { filters: [{ field: 'price', value: '0', conditionType: IConditionType.Gt }] },
          ],
        };
        const { products } = await dataSources.magento.catalogService.find(criteria, storeCode);
        const product = products?.[0];
        if (!product) throw new Error('product not found');
        return productModel.transform(product);
      } catch (error) {
        return null;
      }
    },
  },
};

export { typeDef, resolver };
