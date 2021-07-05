/**
 * @title MDC 2.2 salabble
 * @desc support salable MDC 2.2 by condition ( manage_stock && qty - min_qty < min_sale_qty )
 **/
const typeDef = ``;

const resolver = {
  ProductsExtensionAttributes: {
    salable: _source => {
      if (_source?.stock_item?.is_in_stock) {
        return true;
      } else {
        return false;
      }
    },
  },
};

export { typeDef, resolver };
