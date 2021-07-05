const typeDef = ``;
import { IResolvers } from '../../types/graphql';

function getItemsQty({ items_qty, extension_attributes }) {
  const freeItemQty = extension_attributes?.free_items_qty || 0;
  return items_qty - freeItemQty;
}

const resolver: IResolvers = {
  Cart: {
    items_qty: async ({ items_qty, extension_attributes }) => {
      return getItemsQty({ items_qty, extension_attributes });
    },
  },
  CartMini: {
    items_qty: async ({ items_qty, extension_attributes }) => {
      return getItemsQty({ items_qty, extension_attributes });
    },
  },
};

export { typeDef, resolver };
