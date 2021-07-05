/**
 * @title Add query storeSalableStockBySku for check stock on each store
 **/

import { IQueryResolvers, IStockLevelStatus } from '../../types/graphql';
import typeDef from './types.graphql';

const Query: IQueryResolvers = {
  async storeWithStockLevel(root, { sku }, { dataSources, storeCode }) {
    const stores = await dataSources.magento.storeLocator.getStores();
    const product = await dataSources.magento.product.findBySku({
      sku,
      storeCode,
    });
    const { stock_level_display } = product.extension_attributes;
    const inventoryList = await dataSources.magento.product.getSalableQtyByStock(sku);
    const inventoryListById =
      inventoryList?.reduce((result, item) => {
        return {
          ...result,
          [item.stock_id]: item.quantity,
        };
      }, {}) || {};

    return (
      stores?.items?.map(item => {
        const { value: inventory_stock } = item.custom_attributes.find(
          ({ attribute_code }) => attribute_code === 'inventory_stock',
        );
        const quantity = inventoryListById[inventory_stock] || 0;

        const status =
          [IStockLevelStatus.FullStock, IStockLevelStatus.MediumStock].find(
            key => quantity >= stock_level_display[`${key.toLowerCase()}_quantity`],
          ) || IStockLevelStatus.OutOfStock;

        return {
          ...item,
          id: `${item.id}-${sku}`,
          stock_level: status,
          stock_quantity: quantity,
        };
      }) || []
    );
  },
};

const resolver = {
  Query,
};

export { typeDef, resolver };
