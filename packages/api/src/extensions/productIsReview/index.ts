import { IProductResolvers } from '../../types/graphql';

const typeDef = ``;

const Product: IProductResolvers = {
  async isReview({ sku }, data, { dataSources, storeCode, customerToken }) {
    if (!customerToken) {
      return false;
    }

    const customer = await dataSources.magento.customer.getCustomer(storeCode);
    const { email } = customer;

    const result = await dataSources.magento.product.isReviewByEmail(sku, email);
    return result?.is_review;
  },
};

const resolver = {
  Product,
};

export { typeDef, resolver };
