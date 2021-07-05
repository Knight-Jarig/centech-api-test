import { CategoryResolver } from './CategoryResolver';
import { createDataSources } from '../../../dataSource/';

jest.mock('../../../dataSource');
jest.mock('../../../dataSource/magento/MagentoDataSource');

describe('Category Resolvers', () => {
    const dataSources = createDataSources();
    dataSources.categoryUseCase = {
        getCategories: jest.fn(),
        setValidatePin: jest.fn(),
    } as any;
    describe(`Query: v2Categories`, () => {
        const v2Categories = CategoryResolver.Query.v2Categories as Function;
        it(`Query: v2Categories`, async () => {
            await v2Categories(null, null, { dataSources });
            expect(dataSources.categoryUseCase.getCategories).toHaveBeenCalled();
        });
    });
});
