import { ResolverContext } from '../../types';
import { extendItemsOfListWithProductInformation } from '../../utils/product.utils';
import {
  IConditionType,
  IMutationResolvers,
  IProduct,
  IQueryResolvers,
  IWishlist,
  IWishlistItem,
  IWishlistItemResolvers,
  IWishlists,
} from '../../types/graphql';
import productModel from '../../transform/product.model';
import get from 'lodash/get';
import findIndex from 'lodash/findIndex';
import map from 'lodash/map';
import isEqual from 'lodash/isEqual';
import { ApplicationError } from '../../error/ApplicationError';

const WishlistItem: IWishlistItemResolvers<ResolverContext> = {
  async product(_source, data, { dataSources, storeCode }): Promise<IProduct> {
    try {
      const id = _source.product_id;
      const searchCriteria = {
        filterGroups: [{ filters: [{ field: 'entity_id', value: String(id) }] }],
        page: 1,
        size: 1,
      };
      const productSearch = await dataSources.magento.product.search(searchCriteria, storeCode);
      const foundProductSku = get(productSearch, 'items[0].sku', null);

      if (!foundProductSku) {
        return null;
      }

      const product = await dataSources.magento.product.findBySku({ sku: foundProductSku, storeCode });

      if (product.type_id === 'configurable') {
        const configurableProductChildren = get(product, 'extension_attributes.configurable_product_links', []);
        const filter = {
          filterGroups: [
            {
              filters: [
                { field: 'entity_id', value: configurableProductChildren.toString(), conditionType: IConditionType.In },
              ],
            },
          ],
        };

        const { products } = await dataSources.magento.catalogService.find(filter, storeCode);
        product.configurable_product_items = map(products, value => productModel.transform(value));
      }

      return productModel.transform(product);
    } catch (error) {
      return null;
    }
  },
};

const Query: IQueryResolvers<ResolverContext> = {
  async wishlists(_source, { filter }, { dataSources, customerToken, storeCode }): Promise<IWishlists> {
    if (!customerToken) {
      throw new ApplicationError('no permission');
    }

    const customer = await dataSources.magento.customer.getCustomer(storeCode);
    const indexOfCustomerIdObject = findIndex(filter.filterGroups, group => {
      return group?.filters?.[0]?.field === 'customer_id';
    });
    if (indexOfCustomerIdObject >= 0) {
      filter.filterGroups.splice(indexOfCustomerIdObject, 1);
    }
    filter.filterGroups = [
      ...filter.filterGroups,
      {
        filters: [{ field: 'customer_id', value: String(customer.id) }],
      },
    ];

    return await dataSources.magento.wishlist.search(filter);
  },
};

const Mutation: IMutationResolvers<ResolverContext> = {
  async createWishlist(
    _source,
    { input: { name, customer_id, items } },
    { dataSources, storeCode },
  ): Promise<IWishlist> {
    const newWishlist = await dataSources.magento.wishlist.createWishlist({
      name,
      customer_id,
      items: items as any,
    });
    const wishlist = await dataSources.magento.wishlist.getWishlist(newWishlist.wishlist_id);

    // TODO: remove this line
    wishlist.items = await extendItemsOfListWithProductInformation(wishlist, dataSources, storeCode);

    return wishlist;
  },
  async updateWishlist(_source, { input: { wishlist_id, name, visibility, items } }, { dataSources, storeCode }) {
    await dataSources.magento.wishlist.updateWishlist(wishlist_id, {
      name,
      visibility,
      // eslint-disable-next-line
      // @ts-ignore
      items, // TODO : CHECK THIS TYPE
    });
    const wishlist = await dataSources.magento.wishlist.getWishlist(wishlist_id);

    // TODO: remove this line
    wishlist.items = await extendItemsOfListWithProductInformation(wishlist, dataSources, storeCode);

    return wishlist;
  },
  async deleteWishlist(_source, { id: wishlistId }, { dataSources, customerToken, storeCode }): Promise<string[]> {
    if (!customerToken) {
      throw new ApplicationError('no permission');
    }

    const customer = await dataSources.magento.customer.getCustomer(storeCode);
    const wishlist = await dataSources.magento.wishlist.getWishlist(wishlistId);
    const allowToDeleteWishlist = wishlist.customer_id === customer.id;

    if (allowToDeleteWishlist) {
      return await dataSources.magento.wishlist.deleteWishlist(wishlistId);
    } else {
      throw new ApplicationError('no permission');
    }
  },
  async createWishlistItem(
    _source,
    { input: { wishlist_id, product_id, store_id, qty, custom_attributes } },
    { dataSources, storeCode }: ResolverContext,
  ): Promise<IWishlistItem> {
    let localWishlistId = wishlist_id;
    if (!localWishlistId) {
      // if localWishlistId not exist fetch customer and create one if has auth token
      const { id: customerId } = await dataSources.magento.customer.getCustomer(storeCode);
      if (!customerId) throw new Error('customer_id was not specified');

      const wishlistSearchResult = await dataSources.magento.wishlist.selectForUser(customerId);
      if (wishlistSearchResult.items.length === 0) {
        const items = [{ product_id, store_id, qty }];
        const newWishlist = await dataSources.magento.wishlist.createWishlist({
          name: 'default',
          customer_id: customerId,
          items,
        });
        if (newWishlist && newWishlist.items) {
          return newWishlist.items[0];
        }
        throw new Error('Wishlist is not exists and creation is failed');
      } else {
        localWishlistId = wishlistSearchResult.items[0].wishlist_id;
      }
    }
    const magentoCustomAttributes = custom_attributes?.length > 0 ? { custom_attributes } : {};

    const wishlist = await dataSources.magento.wishlist.getWishlist(localWishlistId);
    const wishlistItem = wishlist?.items?.find(value => {
      const magentoCustomAttributesWithName = magentoCustomAttributes?.custom_attributes?.map(item => ({
        ...item,
        ...(!item?.name ? { name: item?.attribute_code } : {}),
      }));

      return product_id === value.product_id && isEqual(magentoCustomAttributesWithName, value.custom_attributes);
    });
    if (wishlistItem) {
      return wishlistItem;
    }

    return dataSources.magento.wishlist.createWishlistItem({
      wishlist_id: localWishlistId,
      product_id,
      store_id,
      qty,
      ...magentoCustomAttributes,
    });
  },
  async updateWishlistItem(
    _source,
    { input: { wishlist_item_id, product_id, store_id, qty, custom_attributes } },
    { dataSources },
  ): Promise<IWishlistItem> {
    const magentoCustomAttributes = custom_attributes?.length > 0 ? { custom_attributes } : {};

    return await dataSources.magento.wishlist.updateWishlistItem(wishlist_item_id, {
      product_id,
      store_id,
      qty,
      ...magentoCustomAttributes,
    });
  },
  async deleteWishlistItem(
    _source,
    { id: wishlistItemId },
    { dataSources, storeCode, customerToken },
  ): Promise<string[]> {
    if (!customerToken) {
      throw new ApplicationError('no permission');
    }

    const customer = await dataSources.magento.customer.getCustomer(storeCode);
    const wishlistItems = await dataSources.magento.wishlist.getWishlistItem(wishlistItemId);
    const wishlist = await dataSources.magento.wishlist.getWishlist(wishlistItems.wishlist_id);
    const allowToDeleteWishlistItem = wishlist.customer_id === customer.id;

    if (allowToDeleteWishlistItem) {
      return await dataSources.magento.wishlist.deleteWishlistItem(wishlistItemId);
    } else {
      throw new ApplicationError('no permission');
    }
  },
};

export default {
  Query,
  Mutation,
  WishlistItem,
};
