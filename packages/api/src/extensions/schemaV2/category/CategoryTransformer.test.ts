import {
    formattingCategoryFlatToV2CategorySchema,
    formattingCategoryToV2CategorySchema,
    mergingCategoryChildrenData,
    mergeCategories
} from './CategoryTransformer';
import { 
    mockCategoryFlat,
    mockCategoriesFlatFormatted,
    mockCategories,
    mockCategory,
    mockCategoriesFlat,
    mockCategoriesFormatted,
    mockCategoriesFromMDC,
    mockCategoriesMerged,
    mockCategoryFlatFormatted
} from './__mocks__/Categories';

describe('CategoryTransformer', () => {
    describe('formattingCategoryFlatToV2CategorySchema', () => {
        it('Should return data formatted as expected, if categoriesFlat is not empty', () => {
            const formatted = formattingCategoryFlatToV2CategorySchema(mockCategoryFlat);
            expect(formatted).toEqual(mockCategoriesFlatFormatted);
        });
        it('Should return empty object, if categoriesFlat is empty', () => {
            const formatted = formattingCategoryFlatToV2CategorySchema(undefined);
            expect(formatted).toEqual({});
        });
    });

    describe('formattingCategoryToV2CategorySchema', () => {
        const categoryTransformer = require('./CategoryTransformer');
        jest.mock('./CategoryTransformer');
        jest.spyOn(categoryTransformer, 'mergingCategoryChildrenData').mockReturnValue(Promise.resolve([]));
        it('Should return data formatted as expected', () => {
            const formatted = formattingCategoryToV2CategorySchema(mockCategory, mockCategoriesFlat);
            expect(formatted).toEqual(mockCategoriesFormatted);
        });
    });

    describe('mergingCategoryChildrenData', () => {
        const categoryTransformer = require('./CategoryTransformer');
            jest.mock('./CategoryTransformer');
            jest.spyOn(categoryTransformer, 'formattingCategoryFlatToV2CategorySchema').mockReturnValue(Promise.resolve(mockCategoryFlatFormatted))
            jest.spyOn(categoryTransformer, 'formattingCategoryToV2CategorySchema').mockReturnValue(Promise.resolve(mockCategoriesFormatted))
        it('Should return merged childrenData categories as expected', () => {
            const mergedChildren = mergingCategoryChildrenData(mockCategories, mockCategoriesFlat);
            expect(mergedChildren).toEqual(mockCategoriesMerged)
        });
        it('Should return empty array childrenData categories as expected, if categories are empty', () => {
            const mergedChildren = mergingCategoryChildrenData([], mockCategoriesFlat);
            expect(mergedChildren).toEqual([])
        })
    });

    describe('mergeCategories', () => {
        it('Should return merged categories as expected', () => {
            const merged = mergeCategories(mockCategoriesFromMDC, mockCategoriesFlat);
            expect(merged).toEqual(mockCategoriesMerged);
        });
    });
});