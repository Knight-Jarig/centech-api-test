import { findMinMaxPrice } from './productsUtils';

const products = [
  {
    price: 500,
    special_price: 300,
  },
  {
    price: 50,
    special_price: null,
  },
  {
    price: 1000,
    special_price: 30,
  },
];

const product = [
  {
    price: 500,
    special_price: 300,
  },
];

const productEmpty = [];

describe('ProductsUtils', () => {
  describe(`findMinMaxPrice`, () => {
    it(`should return correct sale_price_min, sale_price_max, price_min, price_max`, () => {
      const { sale_price_min, sale_price_max, price_min, price_max } = findMinMaxPrice(products);
      expect(sale_price_min).toEqual(30);
      expect(sale_price_max).toEqual(300);
      expect(price_min).toEqual(50);
      expect(price_max).toEqual(1000);
    });

    it(`only one product should return same value`, () => {
      const { sale_price_min, sale_price_max, price_min, price_max } = findMinMaxPrice(product);
      expect(sale_price_min).toEqual(300);
      expect(sale_price_max).toEqual(300);
      expect(price_min).toEqual(500);
      expect(price_max).toEqual(500);
    });

    it(`incase product empty should return 0`, () => {
      const { sale_price_min, sale_price_max, price_min, price_max } = findMinMaxPrice(productEmpty);
      expect(sale_price_min).toEqual(0);
      expect(sale_price_max).toEqual(0);
      expect(price_min).toEqual(0);
      expect(price_max).toEqual(0);
    });
  });
});
