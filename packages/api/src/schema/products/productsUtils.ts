import { IProduct } from '../../types/graphql';

interface IPriceMinMax {
  sale_price_min: number;
  sale_price_max: number;
  price_min: number;
  price_max: number;
}

export function findMinMaxPrice(products: IProduct[] = []): IPriceMinMax {
  switch (products.length) {
    case 0: {
      return { sale_price_min: 0, sale_price_max: 0, price_min: 0, price_max: 0 };
    }
    case 1: {
      const sale_price = products[0].special_price || products[0].price;
      const price = products[0].price;

      return { sale_price_min: sale_price, sale_price_max: sale_price, price_min: price, price_max: price };
    }
    default: {
      const sortedSalePrices = products.map(({ special_price, price }) => special_price || price).sort((a, b) => a - b);
      const sortedPrices = products.map(({ price }) => price).sort((a, b) => a - b);
      const price_min = sortedPrices[0];
      const price_max = sortedPrices[sortedPrices.length - 1];
      const sale_price_min = sortedSalePrices[0];
      const sale_price_max = sortedSalePrices[sortedSalePrices.length - 1];

      return {
        sale_price_min: sale_price_min,
        sale_price_max: sale_price_max,
        price_min: price_min,
        price_max: price_max,
      };
    }
  }
}
