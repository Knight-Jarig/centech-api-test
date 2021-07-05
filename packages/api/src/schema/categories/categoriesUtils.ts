import { ICategoryFlat } from '../../types/graphql';
import { MagentoCategoryFlat } from '../../dataSource/magento/category/MagentoCategoryResponse';

export function buildCategoriesTree(categories: ICategoryFlat[] = []): ICategoryFlat[] {
  const categoriesTree = categories.filter(cat => cat.level === '2');

  return categoriesTree.map(cateFromTree => ({
    ...cateFromTree,
    children_data: parentCategorySelector(cateFromTree.entity_id, categories),
  }));
}

function parentCategorySelector(parentCateId: string, categories: ICategoryFlat[] = []) {
  return categories
    .filter(cate => cate.parent_id === parentCateId)
    .map(childCate => ({
      ...childCate,
      children_data: parentCategorySelector(childCate.entity_id, categories),
    }));
}

export function transformMagentoCategory(category: MagentoCategoryFlat): ICategoryFlat {
  return {
    ...category,
    id: String(category.entity_id),
    position: Number(category.position),
  };
}
