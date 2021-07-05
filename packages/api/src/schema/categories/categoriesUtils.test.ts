import { buildCategoriesTree, transformMagentoCategory } from './categoriesUtils';
import { mockMagentoCategoriesFlat, mockCategoriesTree } from '../../extensions/schemaV2/category/__mocks__/Categories';

describe('CategoriesUtils', () => {
  describe(`buildCategoriesTree`, () => {
    it(`should categories tree`, () => {
      const categoriesBuilded = buildCategoriesTree(mockMagentoCategoriesFlat as any);
      expect(categoriesBuilded).toEqual(mockCategoriesTree);
    });
  });

  describe(`transformMagentoCategory`, () => {
    it(`should create id`, () => {
      const mockCategoryBeforeTransform = {
        entity_id: '1',
        parent_id: '260',
        name: 'test 1',
        is_active: '1',
        position: null,
        level: '2',
      };

      const categoriesTransformed = transformMagentoCategory(mockCategoryBeforeTransform as any);

      expect(categoriesTransformed).toHaveProperty('id');
      expect(categoriesTransformed.id).toEqual('1');
    });
  });
});
