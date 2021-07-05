import { BrandUseCase } from "./BrandUseCase";
import { MagentoDataSource } from "../../../dataSource/magento/MagentoDataSource";
import { CatalogServiceDataSource } from "../../../dataSource/catalogService/CatalogServiceDataSource";
import { mockFindOneResponse, mockFindResponse, mockCallBackFuncInFind, mockFindInBrandUseCase } from "./__mocks__/brand";

const secureBaseMediaUrl = 'secureBaseMediaUrl/';

describe('BrandUseCase', () => {
    const magento = new MagentoDataSource();
    const catalogService = new CatalogServiceDataSource();
    const brandUseCase = new BrandUseCase({ catalogService, magento});

    const context = {
        store: {
          secure_base_media_url: secureBaseMediaUrl,
        },
        locale: 'th',
    };

    brandUseCase.initialize({ context });

    describe('findOne', () => {
        it('should return data as expect', async () => {
            const brandId = "2549";

            jest.spyOn(magento.brand, 'findOne').mockReturnValue(Promise.resolve(mockFindOneResponse as any));

            const response = await brandUseCase.findOne({ brandId });

            expect(response).toEqual(mockFindOneResponse);
        });
    });

    describe('find', () => {
        it('should return data as expect', async () => {
            const filterGroups = [];
            const page = 1;
            const size = 1;
            const sortOrders = [];

            jest.spyOn(magento.brand, 'find').mockReturnValue(Promise.resolve(mockFindResponse as any));
            jest.spyOn(magento.brand, 'findOne').mockReturnValue(Promise.resolve(mockCallBackFuncInFind as any));

            const response = await brandUseCase.find({ filterGroups, page, size, sortOrders });

            expect(response).toEqual(mockFindInBrandUseCase);
        });
    });
});