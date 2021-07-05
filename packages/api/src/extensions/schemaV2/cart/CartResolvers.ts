import { ResolverContext } from '../../../types';
import { IV2CartResolvers } from '../../../types/graphql';
import {
  IQueryResolvers,
  IResolvers,
  IMutationResolvers,
  IV2ListStorePickUp,
  IV2CartDeleteGiftWrappingResponse,
  IV2AddCartItemResponse,
  IResponseMessage,
  IV2CartGiftWrapping
} from '../../../types/graphql';

const Query: IQueryResolvers<ResolverContext> = {
  async v2Cart(_, { input }, { dataSources }) {
    return dataSources.cartUseCase.getCart(input);
  },
  async v2CartMini(_, { input }, { dataSources }) {
    return dataSources.cartUseCase.getCartMini(input);
  },
  async v2StorePickUp(_, { input }, { dataSources }): Promise<IV2ListStorePickUp> {
    return dataSources.cartUseCase.getStorePickUp(input);
  },
  async v2CartGiftWrapping(_, { input }, { dataSources }): Promise<IV2CartGiftWrapping> {
    return dataSources.cartUseCase.getGiftWrappingMessage(input)
  }
};

const Mutation: IMutationResolvers<ResolverContext> = {
  async v2DeleteCartItem(_, { input }, { dataSources }): Promise<IResponseMessage> {
    return dataSources.cartUseCase.deleteCartItem(input);
  },
  async v2CartAddCoupon(_, { input }, { dataSources }) {
    return dataSources.cartUseCase.addCoupon(input);
  },
  async v2CartDeleteCoupon(_, { input }, { dataSources }) {
    return dataSources.cartUseCase.deleteCoupon(input);
  },
  async v2CartChangeQuantity(_, { input }, { dataSources }) {
    return dataSources.cartUseCase.changeQTY(input);
  },
  async v2CartChangeGiftWrapping(_, { input }, { dataSources }) {
    return dataSources.cartUseCase.changeGiftWrapMessage(input);
  },
  async v2CartDeleteGiftWrapping(_, { input }, { dataSources }): Promise<IV2CartDeleteGiftWrappingResponse> {
    return dataSources.cartUseCase.deleteGiftWrapping(input);
  },
  async v2CartAddGiftWrapping(_, { input }, { dataSources }) {
    return dataSources.cartUseCase.addGiftWrapMessage(input);
  },
  async v2AddCartItem(_, { input }, { dataSources }): Promise<IV2AddCartItemResponse> {
    return dataSources.cartUseCase.addCartItem(input);
  },
};

const V2Cart: IV2CartResolvers = {
  promotionCardName: async (root,  _, { dataSources }) => {
    if(root.isPaymentPromotionLocked) {
      const promotionCardName = await dataSources.cartUseCase.getPromotionCardName(root.guestId);
      return promotionCardName;
    }
    return null;
  }
}

export const CartResolvers: IResolvers = {
  Query,
  Mutation,
  V2Cart,
};
