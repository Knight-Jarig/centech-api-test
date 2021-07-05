import CmsBlockResolvers from './cmsBlockResolvers';
import { MagentoDataSource } from '../../dataSource/magento/MagentoDataSource';
import { cmsBlockResponse } from './__mocks__/cmsBlock';

jest.mock('../../dataSource/magento/MagentoDataSource');
const magento = new MagentoDataSource();
const dataSources = {
  magento,
};

describe('cms block Resolvers', () => {
  const cmsBlocks = CmsBlockResolvers.Query.cmsBlocks as Function;
  const cmsBlock = CmsBlockResolvers.Query.cmsBlock as Function;
  const cmsBlockByIdentifier = CmsBlockResolvers.Query.cmsBlockByIdentifier as Function;
  const storeCode = 'cds';
  const context = {
    dataSources,
    storeCode,
  };
  it(`cmsBlocks should return properly`, async () => {
    jest.spyOn(dataSources.magento.cmsBlock, 'find').mockReturnValue(Promise.resolve(cmsBlockResponse));
    const filterByidentifier = [
      {
        filters: [{ field: 'is_active', value: '1' }],
      },
    ];
    const params = {
      filterGroups: filterByidentifier,
      page: 1,
      size: 0,
      sortOrders: [],
    };
    await cmsBlocks(null, { input: params }, { dataSources: dataSources });
    expect(context.dataSources.magento.cmsBlock.find).toBeCalledWith(params);
  });

  it(`cmsBlock should return properly`, async () => {
    jest.spyOn(dataSources.magento.cmsBlock, 'findOne').mockReturnValue(Promise.resolve(cmsBlockResponse));
    const params = {
      id: '1',
    };
    await cmsBlock(null, params, { dataSources: dataSources });
    expect(context.dataSources.magento.cmsBlock.findOne).toBeCalledWith(params.id);
  });

  it(`cmsBlockByIdentifier should return properly`, async () => {
    jest.spyOn(dataSources.magento.cmsBlock, 'find').mockReturnValue(Promise.resolve(cmsBlockResponse));
    const params = {
      identifier: 'test',
      store_id: '2',
    };
    const filterByidentifier = [
      {
        filters: [{ field: 'identifier', value: params.identifier }],
      },
      {
        filters: [{ field: 'store_id', value: params.store_id }],
      },
      {
        filters: [{ field: 'is_active', value: '1' }],
      },
    ];
    const paramsFind = {
      filterGroups: filterByidentifier,
      page: 1,
      size: 0,
      sortOrders: [],
    };
    await cmsBlockByIdentifier(null, params, { dataSources: dataSources });
    expect(context.dataSources.magento.cmsBlock.find).toBeCalledWith(paramsFind);
  });
});
