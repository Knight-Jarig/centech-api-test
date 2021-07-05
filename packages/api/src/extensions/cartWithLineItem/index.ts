/**
 * @title Add to cart lines item
 * @desc Add to cart with allocated_store_id
 **/

import typeDef from './types.graphql';
import { IMutationResolvers } from '../../types/graphql';
import cartResolvers from '../../schema/cart/cartResolvers';

interface UpdateStoreInterface {
  updateData: {
    cart_id: string;
    quote_item_group: string;
    extension_attributes: {
      allocated_store_id: number;
    };
  };
}

const Mutation: IMutationResolvers = {
  async editCartItem(parent, input, context, info) {
    const { isGuest, input: editCartItemInput } = input;
    const {
      quote_id,
      extension_attributes: { allocated_store_id, quote_item_group },
    } = editCartItemInput;
    const { dataSources, storeCode } = context;

    const cartDataSources = isGuest ? dataSources.magento.cartGuest : dataSources.magento.cart;
    const updateStoreInput: UpdateStoreInterface = {
      updateData: {
        cart_id: quote_id,
        quote_item_group,
        extension_attributes: {
          allocated_store_id,
        },
      },
    };
    await cartDataSources.updateStore(updateStoreInput, storeCode);

    // TODO : check this type and remove ts-ignore
    // eslint-disable-next-line
    // @ts-ignore
    return cartResolvers.Mutation.editCartItem(parent, input, context, info);
  },
};

const resolver = {
  Mutation,
};

export { typeDef, resolver };
