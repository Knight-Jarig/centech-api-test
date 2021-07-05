/**
 * @title old structure overlay
 * @desc support old structure overlay in product list
 **/
import { IQueryResolvers, IWishlists } from '../../types/graphql';
import wishlistResolvers from '../../schema/wishlist/wishlistResolvers';

const typeDef = ``;

const Query: IQueryResolvers = {
  async wishlists(parentType, input, context, options) {
    // eslint-disable-next-line
    const wishlistsFunction = wishlistResolvers.Query.wishlists as Function;
    const wishlist: IWishlists = await wishlistsFunction(parentType, input, context, options);

    if (wishlist?.items?.length === 0) {
      const { id: customer_id } = await context.dataSources.magento.customer.getCustomer(context.storeCode);
      // eslint-disable-next-line
      const createWishlist = wishlistResolvers.Mutation.createWishlist as Function;
      const result = await createWishlist({}, { input: { customer_id } }, context, options);

      return {
        items: [result],
      };
    }

    return wishlist;
  },
};

const resolver = {
  Query,
};

export { typeDef, resolver };
