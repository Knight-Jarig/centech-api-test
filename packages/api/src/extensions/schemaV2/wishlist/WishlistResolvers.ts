import {
  IQueryResolvers,
  IResolvers,
  IMutationResolvers,
  IV2WishlistGroupResolvers as IWishlistGroupResolvers,
  IV2WishlistGroupItemResolvers as IWishlistGroupItemResolvers,
  IV2WishlistGroupItem,
  IV2Wishlist,
  IFilters,
  IV2ConfigurableProduct as IConfigurableProduct,
  IV2ProductType,
  IV2ResponseStatus,
  IV2WishlistGroupListItem,
} from '../../../types/graphql';
import { ResolverContext } from '../../../types';
import { ApplicationError } from '../../../error/ApplicationError';
import { transformWishlist, getWishlistItem, transformCustomAttribute } from './WishlistTransformer';
import isEqual from 'lodash/isEqual';
import isEqualWith from 'lodash/isEqualWith';
import map from 'lodash/map';
import { CoreAPIDataSources } from '../../../dataSource/index';

const WishlistGroupItem: IWishlistGroupItemResolvers<ResolverContext> = {
  parent: async ({ productId }, _, { dataSources }) => {
    const response = await dataSources.productUseCase.findByIdNew(productId);
    if (response.type.toUpperCase() === IV2ProductType.Configurable) {
      return response;
    }
    return null;
  },

  product: async ({ productId, productOptions }, _, { dataSources }) => {
    const productOptionsId = await Promise.all(
      map(productOptions, async option => {
        const { attribute_id } = await dataSources.magento.product.getAttributesByAttributeCode(option.attributeCode);
        return { ...option, attributeId: attribute_id };
      }),
    );

    const response = await dataSources.productUseCase.findByIdNew(productId);
    if (response.type.toUpperCase() === IV2ProductType.Configurable) {
      const configProduct = response as IConfigurableProduct;

      const configProductChildren = configProduct.children.find(childrenItem => {
        const optionChildren = childrenItem.options.map(option => {
          return { attributeId: option.id, value: option.value.id };
        });

        return isEqualWith(productOptionsId, optionChildren, (productOption, childrenOption) => {
          return productOption.attributeId == childrenOption.attributeId && productOption.value == childrenOption.value;
        });
      });

      return configProductChildren?.product || null;
    }
    return response;
  },

  productOptions: async ({ productId, productOptions }, _, { dataSources }) => {
    if (productOptions?.length > 0) {
      return productOptions;
    }
    let response = await dataSources.productUseCase.findByIdNew(productId);
    if (response.type.toUpperCase() === IV2ProductType.Configurable) {
      response = response as IConfigurableProduct;
      const options = response.options.map(option => {
        return { attributeCode: option.attributeCode, name: option.label, value: option.values[0].id };
      });
      return options;
    }
    return [];
  },
};

const WishlistGroup: IWishlistGroupResolvers<ResolverContext> = {
  items: async ({ id }, { input }, { dataSources }): Promise<IV2WishlistGroupListItem> => {
    const filter: IFilters[] = [{ field: 'wishlist_id', value: id }];
    const response = await dataSources.magento.wishlist.searchWishlistItems(filter, input?.page, input?.limit);

    return { totalCount: response?.total_count, data: response?.items.map(item => getWishlistItem(item)) };
  },
};

const Query: IQueryResolvers = {
  async v2Wishlists(_, { input = {} }, { dataSources, customerToken, storeCode }): Promise<IV2Wishlist> {
    if (!customerToken) {
      throw new ApplicationError('no permission');
    }

    const { id: customerId } = await dataSources.magento.customer.getCustomer(storeCode);
    if (!customerId) throw new ApplicationError('customer_id was not specified');

    const wishlistSearchResult = await dataSources.magento.wishlist.selectForUser(customerId);
    if (wishlistSearchResult.items.length === 0) {
      await dataSources.magento.wishlist.createWishlist({
        name: 'default',
        customer_id: customerId,
        items: [],
      });
    }

    const sorts = input.sorts;
    const filters = input.filters?.filter(filter => {
      return filter.id !== customerId;
    });
    const filterMapped = filters?.map(filter => ({
      field: filter.id,
      value: filter.optionIds.join(),
      conditionType: filter.condition,
    }));

    const params = {
      page: input.page ?? 1,
      size: input.limit ?? 0,
      filterGroups: [
        ...(filters ? [{ filters: filterMapped }] : []),
        { filters: [{ field: 'customer_id', value: `${customerId}` }] },
      ],
      sortOrders:
        sorts &&
        sorts.map(sort => ({
          field: sort.id,
          direction: sort.direction,
        })),
    };

    const result = await dataSources.magento.wishlist.search(params);

    return transformWishlist(result);
  },
};

async function createWishListItem({input:itemData}, dataSources:CoreAPIDataSources) {
  const { id, storeId, productId, quantity, customAttributes = [], description } = itemData;
  const localWishlistId = parseInt(id);

  const magentoCustomAttributes = customAttributes?.length > 0 ? { custom_attributes: customAttributes } : {};

  const wishlist = await dataSources.magento.wishlist.getWishlist(localWishlistId);

  const wishlistItem = wishlist?.items?.find(item => {
    const magentoCustomAttributesWithName = magentoCustomAttributes?.custom_attributes?.map(custom => ({
      ...custom,
      ...(!custom?.name ? { name: item?.attributeCode } : {}),
    }));

    return (
      parseInt(productId) === item.product_id &&
      isEqual(magentoCustomAttributesWithName, transformCustomAttribute(item.custom_attributes))
    );
  });

  if (wishlistItem) {
    return wishlistItem;
  }

  const response = await dataSources.magento.wishlist.createWishlistItem({
    wishlist_id: localWishlistId,
    product_id: parseInt(productId),
    store_id: storeId,
    qty: quantity,
    description,
    ...magentoCustomAttributes,
  });
  
  return response;
}


const Mutation: IMutationResolvers<ResolverContext> = {
  async v2CreateWishListItem(_source, { input: itemData }, { dataSources }): Promise<IV2WishlistGroupItem> {
    const response = await createWishListItem({input: itemData},dataSources);
    return getWishlistItem(response);
  },

  async v2DeleteWishListItem(
    _source,
    { id: wishlistItemId },
    { dataSources, storeCode, customerToken },
  ): Promise<IV2ResponseStatus> {
    if (!customerToken) {
      throw new ApplicationError('no permission');
    }

    const customer = await dataSources.magento.customer.getCustomer(storeCode);
    const wishlistItems = await dataSources.magento.wishlist.getWishlistItem(wishlistItemId);
    const wishlist = await dataSources.magento.wishlist.getWishlist(wishlistItems.wishlist_id);
    const allowToDeleteWishlistItem = wishlist.customer_id === customer.id;

    if (allowToDeleteWishlistItem) {
      try {
        await dataSources.magento.wishlist.deleteWishlistItem(wishlistItemId);
        return { status: true };
      } catch (e) {
        throw ApplicationError.create(e);
      }
    } else {
      throw new ApplicationError('no permission');
    }
  },

  async v2MoveItemToWishListItem(
    _source,
    { input: itemData },
    {dataSources}
  ): Promise<IV2ResponseStatus> {
    const { itemId } = itemData;
      
    await createWishListItem({ input: itemData }, dataSources);
      
    const removeResult = await dataSources.magento.cart.deleteCartMineItem(itemId);
 
    return {
      status:true,
    };
  }
};

export const WishlistResolvers: IResolvers = {
  Query,
  Mutation,
  V2WishlistGroup: WishlistGroup,
  V2WishlistGroupItem: WishlistGroupItem,
  V2WishlistFilterInputCondition: {
    EQ: 'eq',
    GT: 'gt',
    GTE: 'gteq',
    LT: 'lt',
    LTE: 'lteq',
    IN: 'in',
    LIKE: 'like',
    FINSET: 'finset',
    FROM: 'from',
    MOREQ: 'moreq',
    NEQ: 'neq',
    NIN: 'nin',
    NOTNULL: 'notnull',
    NULL: 'NULL',
  },
};
