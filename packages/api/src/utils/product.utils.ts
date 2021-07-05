// DEPRECATED WAITING FOR REFAGTER

import productModel from '../transform/product.model';
import map from 'lodash/map';

export const extendItemWithProductInformation = async (item, dataSources, storeCode) => {
  const product = await dataSources.magento.product.findBySku({ storeCode, sku: item.sku });

  const transformed = {
    ...productModel.transform(product),
    store_code: storeCode,
    extension_attributes: {
      ...item.extension_attributes,
    },
  };

  return Object.assign(item, transformed);
};

export const extendItemsOfListWithProductInformation = async (list, dataSources, storeCode) => {
  if (list.items) {
    const items = [...list.items];
    return await Promise.all(
      map(items, async extendedItem => {
        return await extendItemWithProductInformation(extendedItem, dataSources, storeCode);
      }),
    );
  }
  return [];
};

export const getProductsByPagination = (products, page: number, limit: number) => {
  const startIndex = page * limit - limit;
  const endIndex = startIndex + limit;

  return products.slice(startIndex, endIndex);
};
