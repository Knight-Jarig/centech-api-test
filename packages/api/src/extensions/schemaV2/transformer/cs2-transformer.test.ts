import { DateTime } from 'luxon';
import {
  getDiscount,
  getFlags,
  transformHierarchySubCategoriesByCategoryId,
  transformHierarchyCategories,
  getHierarchyCategory,
  checkWhiteListMainCategory,
} from './cs2-transformer';
import { IV2ProductFlag as IProductFlag } from '../../../types/graphql';

jest.mock('../../../configs/category');

describe('cs2-transformer', () => {
  describe('getFlags', () => {
    it('Should return data as expect', () => {
      const input = {
        new_tag: '1',
        only_at_tag: '1',
        online_exclusive_tag: '1',
        marketplace: {
          product_type: 'marketplace',
        },
        allow_gift_wrapping: '1',
        is_in_stock: true,
        categories: [{ name: 'beauty' }],
        allow_return: '1',
        allow_express: '1',
        preorder_shipping_date: '2120-06-22 17:00:00',
        product_sell_type: '2120-06-22 17:00:00',
        product_type: 'by order',
        online_salable: true,
        offline_salable: true,
        brand: {
          extension_attributes: {
            hide_product_original_price: false,
          },
        },
      };

      const expected = [
        IProductFlag.New,
        IProductFlag.OnlyAtCentral,
        IProductFlag.OnlineExclusive,
        IProductFlag.Marketplace,
        IProductFlag.GiftWrapping,
        IProductFlag.InStock,
        IProductFlag.Beauty,
        IProductFlag.AllowReturn,
        IProductFlag.AllowExpress,
        IProductFlag.PreOrder,
        IProductFlag.ByOrder,
        IProductFlag.OnlineSalable,
        IProductFlag.OfflineSalable,
        IProductFlag.ShowProductOriginalPrice,
      ];

      const result = getFlags(input);
      expect(result).toEqual(expected);
    });

    it('Should return flag is empty', () => {
      const input = {
        new_tag: '0',
        only_at_tag: '0',
        online_exclusive_tag: '0',
        marketplace: {
          product_type: '',
        },
        allow_gift_wrapping: '0',
        is_in_stock: false,
        categories: [{ name: 'women' }],
        allow_return: '0',
        allow_express: '0',
        preorder_shipping_date: '2000-06-22 17:00:00',
        product_sell_type: null,
        product_type: '',
        online_salable: false,
        offline_salable: false,
        brand: {
          extension_attributes: {
            hide_product_original_price: true,
          },
        },
      };

      const expected = [];

      const result = getFlags(input);
      expect(result).toEqual(expected);
    });
  });

  describe('getDiscount', () => {
    const prevDate = DateTime.utc().minus({ days: 1 }).toFormat('yyyy-MM-dd HH:mm:ss');
    const nextDate = DateTime.utc().plus({ days: 1 }).toFormat('yyyy-MM-dd HH:mm:ss');

    it('Should return discount = null when has `special_price` = 0', () => {
      const input = {
        special_price: 0,
        special_from_date: prevDate,
        special_to_date: nextDate,
        price: 3000,
      };

      const result = getDiscount(input);
      expect(result).toBeNull();
    });

    it('Should return discount = null when `price` = 0', () => {
      const input = {
        special_price: 325,
        special_from_date: null,
        special_to_date: null,
        price: 0,
      };

      const result = getDiscount(input);
      expect(result).toBeNull();
    });

    it('Should return discount with `effectiveDateRange` = null when has `special_price` greater than 0, and `special_from_date`, `special_to_date` is null', () => {
      const input = {
        special_price: 100,
        special_from_date: null,
        special_to_date: null,
        price: 201,
      };

      const result = getDiscount(input);
      expect(result).toEqual({
        amount: 101,
        percentage: 50,
        effectiveDateRange: null,
      });
    });

    describe('effective case', () => {
      it('Should return discount when has `special_price` greater than 0, `special_from_date` is not null and `special_to_date` is null', () => {
        const input = {
          special_price: 325,
          special_from_date: prevDate,
          special_to_date: null,
          price: 3000,
        };

        const result = getDiscount(input);

        expect(result).not.toBeNull();
        expect(result.effectiveDateRange.from).not.toBeNull();
        expect(result.effectiveDateRange.to).toBeNull();
      });

      it('Should return discount when has `special_price` greater than 0, `special_from_date` is null and `special_to_date` in not null', () => {
        const input = {
          special_price: 325,
          special_from_date: null,
          special_to_date: nextDate,
          price: 3000,
        };

        const result = getDiscount(input);

        expect(result).not.toBeNull();
        expect(result.effectiveDateRange.from).toBeNull();
        expect(result.effectiveDateRange.to).not.toBeNull();
      });

      it('Should return discount when has `special_price` greater than 0, `special_from_date` and `special_to_date` in not null', () => {
        const input = {
          special_price: 325,
          special_from_date: prevDate,
          special_to_date: nextDate,
          price: 3000,
        };

        const result = getDiscount(input);

        expect(result).not.toBeNull();
        expect(result.effectiveDateRange.from).not.toBeNull();
        expect(result.effectiveDateRange.to).not.toBeNull();
      });
    });

    describe('non-effective case', () => {
      it('Should return discount = null when has `special_price` greater than 0, `special_from_date` is greater than current date', () => {
        const input = {
          special_price: 325,
          special_from_date: nextDate,
          special_to_date: null,
          price: 3000,
        };

        const result = getDiscount(input);

        expect(result).toBeNull();
      });

      it('Should return discount = null when has `special_price` greater than 0, `special_to_date` is less than current date', () => {
        const input = {
          special_price: 325,
          special_from_date: null,
          special_to_date: prevDate,
          price: 3000,
        };

        const result = getDiscount(input);

        expect(result).toBeNull();
      });

      it('Should return discount = null when has `special_price` greater than 0, `special_from_date` and `special_to_date` is out of range', () => {
        const input = {
          special_price: 325,
          special_from_date: nextDate,
          special_to_date: nextDate,
          price: 3000,
        };

        const result = getDiscount(input);

        expect(result).toBeNull();
      });
    });
  });

  describe('transformHierarchySubCategoriesByCategoryId', () => {
    it('Should return data as expect', () => {
      const categories = [
        {
          id: '2222',
          name: 'women',
          parent_id: '3333',
          level: '2',
          url_path: 'root/women',
          doc_count: 64,
          url_key: 'women',
        },
        {
          id: '2221',
          name: 'clothing',
          parent_id: '2222',
          level: '3',
          url_path: 'root/women/clothing',
          doc_count: 64,
          url_key: 'clothing',
        },
      ];
      const baseCategoryId = '2222';

      const expected = [
        {
          id: '2221',
          label: 'clothing',
          level: '3',
          productCount: 64,
          urlPath: 'root/women/clothing',
          children: [],
        },
      ];

      const result = transformHierarchySubCategoriesByCategoryId(categories, baseCategoryId);
      expect(result).toEqual(expected);
    });

    it('Should return empty array when baseCategoryId not found in cate list', () => {
      const categories = [
        {
          id: '2222',
          name: 'women',
          parent_id: '3333',
          level: '2',
          url_path: 'root/women',
          doc_count: 64,
          url_key: 'women',
        },
        {
          id: '2221',
          name: 'clothing',
          parent_id: '2222',
          level: '3',
          url_path: 'root/women/clothing',
          doc_count: 64,
          url_key: 'clothing',
        },
      ];
      const baseCategoryId = '2223';

      const expected = [];

      const result = transformHierarchySubCategoriesByCategoryId(categories, baseCategoryId);
      expect(result).toEqual(expected);
    });

    it('Should return empty array when baseCategoryId level 1 and subcate not found in whiteListMainCategory', () => {
      const categories = [
        {
          id: '1111',
          name: 'root',
          parent_id: '',
          level: '1',
          url_path: 'root',
          doc_count: 64,
          url_key: 'root',
        },
        {
          id: '2221',
          name: 'test',
          parent_id: '1111',
          level: '2',
          url_path: 'root/test',
          doc_count: 64,
          url_key: 'test',
        },
      ];
      const baseCategoryId = '2223';

      const expected = [];

      const result = transformHierarchySubCategoriesByCategoryId(categories, baseCategoryId);
      expect(result).toEqual(expected);
    });
  });

  describe('transformHierarchyCategories', () => {
    it('Should return data as expect', () => {
      const categories = [
        {
          id: '2222',
          name: 'women',
          parent_id: '3333',
          level: '2',
          url_path: 'root/women',
          doc_count: 64,
          url_key: 'women',
        },
        {
          id: '2221',
          name: 'clothing',
          parent_id: '2222',
          level: '3',
          url_path: 'root/women/clothing',
          doc_count: 64,
          url_key: 'clothing',
        },
      ];

      const expected = [
        {
          id: '2222',
          label: 'women',
          level: '2',
          productCount: 64,
          urlPath: 'root/women',
          children: [{
            id: '2221',
            label: 'clothing',
            level: '3',
            productCount: 64,
            urlPath: 'root/women/clothing',
            children: [],
          }],
        },
      ];

      const result = transformHierarchyCategories(categories);
      expect(result).toEqual(expected);
    });

    it('Should return data as expect and filter out dirty categoty', () => {
      const categories = [
        {
          id: '2222',
          name: 'women',
          parent_id: '3333',
          level: '2',
          url_path: 'root/women',
          doc_count: 64,
          url_key: 'women',
        },
        {
          id: '5555',
          name: 'root',
          parent_id: '3312',
          level: '2',
          url_path: 'root/root',
          doc_count: 64,
          url_key: 'root',
        },
        {
          id: '2221',
          name: 'clothing',
          parent_id: '2222',
          level: '3',
          url_path: 'root/women/clothing',
          doc_count: 64,
          url_key: 'clothing',
        },
      ];

      const expected = [
        {
          id: '2222',
          label: 'women',
          level: '2',
          productCount: 64,
          urlPath: 'root/women',
          children: [{
            id: '2221',
            label: 'clothing',
            level: '3',
            productCount: 64,
            urlPath: 'root/women/clothing',
            children: [],
          }],
        },
      ];

      const result = transformHierarchyCategories(categories);
      expect(result).toEqual(expected);
    });

    it('Should return empty children when not found children', () => {
      const categories = [
        {
          id: '2222',
          name: 'women',
          parent_id: '3333',
          level: '2',
          url_path: 'root/women',
          doc_count: 64,
          url_key: 'women',
        },
        {
          id: '2221',
          name: 'clothing',
          parent_id: '4444',
          level: '3',
          url_path: 'root/women/clothing',
          doc_count: 64,
          url_key: 'clothing',
        },
      ];

      const expected = [{
        id: '2222',
        label: 'women',
        level: '2',
        productCount: 64,
        urlPath: 'root/women',
        children: [],
      },];

      const result = transformHierarchyCategories(categories);
      expect(result).toEqual(expected);
    });
  });

  describe('getHierarchyCategory', () => {
    it('Should return data as expect', () => {
      const categories = [
        {
          id: '2222',
          name: 'women',
          parent_id: '3333',
          level: '2',
          url_path: 'root/women',
          doc_count: 64,
          url_key: 'women',
        },
        {
          id: '2221',
          name: 'clothing',
          parent_id: '2222',
          level: '3',
          url_path: 'root/women/clothing',
          doc_count: 64,
          url_key: 'clothing',
        },
      ];

      const category = {
        id: '2222',
        name: 'women',
        parent_id: '3333',
        level: '2',
        url_path: 'root/women',
        doc_count: 64,
        url_key: 'women',
      };

      const expected = {
        id: '2222',
        label: 'women',
        level: '2',
        productCount: 64,
        urlPath: 'root/women',
        children: [
          {
            id: '2221',
            label: 'clothing',
            level: '3',
            productCount: 64,
            urlPath: 'root/women/clothing',
            children: [],
          },
        ],
      };

      const result = getHierarchyCategory(category, categories);
      expect(result).toEqual(expected);
    });

  });


  describe('checkWhiteListMainCategory', () => {
    it('should return true when found url_key of category in whiteListMainCategory', () => {
      const category = {
        id: '2222',
        name: 'women',
        parent_id: '3333',
        level: '2',
        url_path: 'root/women',
        doc_count: 64,
        url_key: 'women',
      };

      const result = checkWhiteListMainCategory(category);
      expect(result).toEqual(true);
    });

    it('should return false when not found url_key of category in whiteListMainCategory', () => {
      const category = {
        id: '2222',
        name: 'test',
        parent_id: '3333',
        level: '2',
        url_path: 'root/test',
        doc_count: 64,
        url_key: 'test',
      };

      const result = checkWhiteListMainCategory(category);
      expect(result).toEqual(false);
    });
  });
});
