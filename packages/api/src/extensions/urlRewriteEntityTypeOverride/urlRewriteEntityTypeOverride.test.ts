import { resolver } from './index';

describe('urlRewriteEntityTypeOverride Resolvers', () => {
  const dataSources = {
    magento: { category: { find: jest.fn() } },
  };

  const entityType = resolver.UrlRewrite.entity_type as Function;

  it(`UrlRewrite should run properly`, async () => {
    const input = {
      entity_type: 'category',
      entity_id: '1',
    };
    const storeCode = 'CDS';

    jest
      .spyOn(dataSources.magento.category, 'find')
      .mockReturnValue({ items: [{ entity_id: '1', display_mode: 'PAGE' }] });
    const result = await entityType(input, null, { dataSources, storeCode });
    expect(dataSources.magento.category.find).toBeCalledWith(storeCode);
    expect(result).toEqual('category_landing_page');
  });

  it(`UrlRewrite should run properly when entity_type is not category`, async () => {
    const input = {
      entity_type: 'brand',
      entity_id: '1',
    };
    const storeCode = 'CDS';

    const result = await entityType(input, null, { dataSources, storeCode });
    expect(result).toEqual(input.entity_type);
  });
});
