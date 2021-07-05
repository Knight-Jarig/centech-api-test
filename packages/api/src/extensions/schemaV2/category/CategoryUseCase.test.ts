import { CategoryUseCase } from './CategoryUseCase';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import {
    mockCategoriesFromMDC,
    mockCategoriesFlatFromMDC,
    mockCategoriesFlatTransform,
    mockCategoriesMerged,
    mockCategoriesMergedResult
} from './__mocks__/Categories';

const secureBaseMediaUrl = 'secureBaseMediaUrl/';
jest.mock('../../../dataSource/magento/MagentoDataSource');

describe('CategoryUseCase', () => {
    it('Should return merged categories successfully', async () => {
        const magento = new MagentoDataSource();
        const categoryUseCase = new CategoryUseCase({ magento });
        const context = {
            bu: 'cds',
            store: {
                secure_base_media_url: secureBaseMediaUrl,
            },
            locale: 'th',
        };
        categoryUseCase.initialize({ context })
        const categoriesUtils = require('../../../schema/categories/categoriesUtils');
        const categoryTransformer = require('./CategoryTransformer');
        jest.mock('../../../schema/categories/categoriesUtils');
        jest.mock('./CategoryTransformer');
        jest.spyOn(magento.category, 'find').mockReturnValue(Promise.resolve(mockCategoriesFlatFromMDC));
        jest.spyOn(magento.category, 'all').mockReturnValue(Promise.resolve(mockCategoriesFromMDC));
        jest.spyOn(categoriesUtils, 'transformMagentoCategory').mockReturnValue(Promise.resolve(mockCategoriesFlatTransform));
        jest.spyOn(categoryTransformer, 'mergeCategories').mockReturnValue(Promise.resolve(mockCategoriesMerged))
        const merged = await categoryUseCase.getCategories();
        expect(merged).toEqual(mockCategoriesMergedResult);
    })
})