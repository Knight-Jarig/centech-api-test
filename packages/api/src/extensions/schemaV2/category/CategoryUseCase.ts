import { MDCStoreConfig } from '../types/mdc-store-config';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { IV2Category } from '../../../types/graphql';
import { transformMagentoCategory } from '../../../schema/categories/categoriesUtils';
import { mergeCategories } from './CategoryTransformer';
interface CategoryUseCaseOptions {
  magento: MagentoDataSource;
}
export class CategoryUseCase {
  private store?: MDCStoreConfig;
  private magento: MagentoDataSource;

  constructor({ magento }: CategoryUseCaseOptions) {
    this.magento = magento;
  }

  initialize(config): void {
    this.store = config.context.store;
  }

  async getCategories(): Promise<IV2Category[]> {
    const [dataCategoryFlat, dataCategory] = await Promise.all([
      this.magento.category.find(this.store.code),
      this.magento.category.all(this.store.code),
    ]);
    const transformedCategoryFlat = dataCategoryFlat.items.map(transformMagentoCategory);
    const mergedCategories = mergeCategories(dataCategory, transformedCategoryFlat);
    return mergedCategories;
  }
}
