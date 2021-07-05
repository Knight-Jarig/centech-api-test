import { ICategoryFlat, IV2Category } from 'types/graphql';
import { MagentoCategory } from '../../../dataSource/magento/category/MagentoCategoryResponse';
import { reduce, isEmpty, map, find } from 'lodash';
interface CategoryFlatFormatted {
  id: string;
  parentId: string;
  name: string;
  isActive: boolean;
  position: number;
  level: string;
  path: string;
  urlKey: string;
  urlPath: string;
  childrenCount: number;
  includeInMenu: string;
  productCount: number;
  virtualCategoryRoot: string;
  megaCmsBrand: string;
  megaCmsBanner: string;
  megaCmsMenu: string;
}

export function formattingCategoryFlatToV2CategorySchema(catagoryFlat: ICategoryFlat): CategoryFlatFormatted {
  if (!catagoryFlat) return {} as CategoryFlatFormatted;
  return {
    id: String(catagoryFlat.entity_id),
    parentId: String(catagoryFlat.parent_id),
    name: catagoryFlat.name,
    isActive: catagoryFlat.is_active === '1',
    position: catagoryFlat.position,
    level: catagoryFlat.level,
    path: catagoryFlat.path,
    urlKey: catagoryFlat.url_key,
    urlPath: catagoryFlat.url_path,
    childrenCount: parseInt(catagoryFlat.children_count),
    includeInMenu: String(catagoryFlat.include_in_menu),
    productCount: catagoryFlat.product_count,
    virtualCategoryRoot: catagoryFlat.virtual_category_root,
    megaCmsBrand: catagoryFlat.mega_cms_brand,
    megaCmsBanner: catagoryFlat.mega_cms_banner,
    megaCmsMenu: catagoryFlat.mega_cms_menu,
  };
}

export function formattingCategoryToV2CategorySchema(
  category: MagentoCategory,
  categoriesFlat: ICategoryFlat[],
): IV2Category {
  return {
    id: String(category.id),
    parentId: String(category.parent_id),
    name: category.name,
    position: category.position,
    level: String(category.level),
    isActive: category.is_active,
    productCount: category.product_count,
    childrenData: mergingCategoryChildrenData(category.children_data, categoriesFlat),
  };
}
export function mergingCategoryChildrenData(
  categories: MagentoCategory[],
  categoriesFlat: ICategoryFlat[],
): IV2Category[] {
  if (isEmpty(categories)) {
    return [];
  } else {
    return map(categories, cat => {
      const findCategoryFlat = find(categoriesFlat, c => c.entity_id === String(cat.id));
      const formatedCategoryFlat = formattingCategoryFlatToV2CategorySchema(findCategoryFlat);
      return {
        ...formatedCategoryFlat,
        ...formattingCategoryToV2CategorySchema(cat, categoriesFlat),
      };
    });
  }
}

export function mergeCategories(categories: MagentoCategory, categoriesFlat: ICategoryFlat[]): IV2Category[] {
  const merged: IV2Category[] = reduce(
    categories.children_data,
    (result, lv1) => {
      const findCategoryFlat = find(categoriesFlat, c => c.entity_id === String(lv1.id));
      const formatedCategoryFlat = formattingCategoryFlatToV2CategorySchema(findCategoryFlat);
      result.push({
        ...formatedCategoryFlat,
        ...formattingCategoryToV2CategorySchema(lv1, categoriesFlat),
      });
      return result;
    },
    [],
  );
  return merged;
}
