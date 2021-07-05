import ProductResolver from './productsResolvers';
import { createDataSources } from '../../dataSource';
import { 
  productSimple, 
  productConfigurable, 
  mockProductBySku,
 } from './__mocks__/Products';

describe('Product Resolver', () => {
  describe(`custom_attributes`, () => {
    const filterArrayInInput = { filter: ['size'] };
    const filterArrayInContext = { productCustomAttributes: 'price, description' };
    const custom_attributes = ProductResolver.Product.custom_attributes as Function;

    it(`should return all custom_attribute`, () => {
      const customAttributesValue = custom_attributes(productSimple, {}, {});
      expect(customAttributesValue).toEqual(productSimple.custom_attributes);
    });

    it(`should return only custom_attribute filterd in query`, () => {
      const customAttributesValue = custom_attributes(productSimple, filterArrayInInput, {});
      expect(customAttributesValue).toEqual({ size: 1 });
    });

    it(`should return only custom_attribute filterd in context`, () => {
      const customAttributesValue = custom_attributes(productSimple, {}, filterArrayInContext);
      expect(customAttributesValue).toEqual({
        price: 99,
        description: 'test description',
      });
    });

    it(`should return only custom_attribute filterd in query and not use filter from context`, () => {
      const customAttributesValue = custom_attributes(productSimple, filterArrayInInput, filterArrayInContext);
      expect(customAttributesValue).toEqual({ size: 1 });
    });
  });

  describe(`custom_attributes_option`, () => {
    const filterArrayInInput = { filter: ['size'] };
    const filterArrayInContext = { productCustomAttributesOption: 'price, description' };
    const custom_attributes_option = ProductResolver.Product.custom_attributes_option as Function;

    it(`should return all custom_attributes_option`, () => {
      const customAttributesValue = custom_attributes_option(productSimple, {}, {});
      expect(customAttributesValue).toEqual(productSimple.custom_attributes_option);
    });

    it(`should return only custom_attributes_option filterd in query`, () => {
      const customAttributesValue = custom_attributes_option(productSimple, filterArrayInInput, {});
      expect(customAttributesValue).toEqual({ size: 'SMALL' });
    });

    it(`should return only custom_attributes_option filterd in context`, () => {
      const customAttributesValue = custom_attributes_option(productSimple, {}, filterArrayInContext);
      expect(customAttributesValue).toEqual({
        price: 99,
        description: 'test description option',
      });
    });

    it(`should return only custom_attributes_option filterd in query and not use filter from context`, () => {
      const customAttributesValue = custom_attributes_option(productSimple, filterArrayInInput, filterArrayInContext);
      expect(customAttributesValue).toEqual({ size: 'SMALL' });
    });
  });

  describe(`price_min`, () => {
    const price_min = ProductResolver.Product.price_min as Function;

    it(`should return price_min 50`, async () => {
      const priceMin = await price_min(productConfigurable);
      expect(priceMin).toEqual(50);
    });
  });

  describe(`price_max`, () => {
    const price_max = ProductResolver.Product.price_max as Function;

    it(`should return price_max = 500`, async () => {
      const priceMax = await price_max(productConfigurable);
      expect(priceMax).toEqual(1000);
    });
  });

  describe(`sale_price_min`, () => {
    const sale_price_min = ProductResolver.Product.sale_price_min as Function;

    it(`should return sale_price_min 30`, async () => {
      const salePriceMin = await sale_price_min(productConfigurable);
      expect(salePriceMin).toEqual(30);
    });
  });

  describe(`sale_price_max`, () => {
    const sale_price_max = ProductResolver.Product.sale_price_max as Function;

    it(`should return sale_price_max = 300`, async () => {
      const salePriceMax = await sale_price_max(productConfigurable);
      expect(salePriceMax).toEqual(300);
    });
  });

  describe(`image`, () => {
    const image = ProductResolver.Product.image as Function;

    it(`should return image url from children - configurable product`, async () => {
      const imageUrl = await image(productConfigurable);
      expect(imageUrl).toEqual('image_url.jpg');
    });

    it(`should return image url from children - configurable product with "no_selection" value`, async () => {
      const productConfigurableWithNoValueImage = {
        ...productConfigurable,
        image: 'no_selection',
      };
      const imageUrl = await image(productConfigurableWithNoValueImage);
      expect(imageUrl).toEqual('image_url.jpg');
    });
  });

  describe(`media_gallery_entries`, () => {
    const media_gallery_entries = ProductResolver.Product.media_gallery_entries as Function;

    it(`should return media_gallery_entries url from first children that have data`, async () => {
      const imageGallery = await media_gallery_entries(productConfigurable);
      expect(imageGallery).toEqual([
        {
          disabled: false,
          file: 'image_gallery.jpg',
          id: 1,
          label: 'sample',
        },
      ]);
    });

    it(`should return empty array`, async () => {
      const productConfigTmp = productConfigurable.configurable_product_items.filter( item => item.media_gallery_entries.length === 0 );
      productConfigurable.configurable_product_items = productConfigTmp;
      const imageGallery = await media_gallery_entries(productConfigurable);
      expect(imageGallery).toEqual([]);
    });
  });

  describe(`product_tags`, () => {
    const product_tags = ProductResolver.Product.product_tags as Function;

    it(`should return product_tags from custom_attributes`, async () => {
      const productTags = await product_tags(productConfigurable);
      expect(productTags).toEqual('tag1, tag2, tag3');
    });
  });
});

describe('Product Query', () => {
  const context = {
    dataSources: createDataSources(),
    storeCode: 'cds_th',
  };
  const sku = 'CDS10836583';
  const url = 'test';
  const filter = {};
  const searchTermsInput = {
    productsSize: '1',
    termsSize: '1',
    storeCode: '1',
    keyword: '1',
  };

  it(`Query stockItem should called with expect args`, async () => {
    const stockItem = ProductResolver.Query.stockItem as Function;
    jest.spyOn(context.dataSources.magento.product, 'getStockItem').mockReturnValue(Promise.resolve([]));
    await stockItem(null, { sku }, context);
    expect(context.dataSources.magento.product.getStockItem).toBeCalledWith(context.storeCode, sku);
  });

  it(`Query compareProducts should called with expect args`, async () => {
    const sku = ['CDS10836583', 'CDS10836584'];
    const compareProducts = ProductResolver.Query.compareProducts as Function;
    jest.spyOn(context.dataSources.magento.product, 'compareProducts').mockReturnValue(Promise.resolve([]));
    await compareProducts(null, { input: { sku } }, context);
    expect(context.dataSources.magento.product.compareProducts).toBeCalledWith({
      storeCode: context.storeCode,
      sku: sku.join(','),
    });
  });

  it(`Query productBySku should called with expect args`, async () => {
    const productBySku = ProductResolver.Query.productBySku as Function;
    jest
      .spyOn(context.dataSources.magento.product, 'findBySku')
      .mockReturnValue(
        Promise.resolve({ type_id: 'configurable', extension_attributes: { configurable_product_links: '1' } }),
      );
    jest.spyOn(context.dataSources.magento.catalogService, 'find').mockReturnValue(Promise.resolve({ products: [] }));
    await productBySku(null, { sku, storeCode: context.storeCode }, context);
    expect(context.dataSources.magento.product.findBySku).toBeCalledWith({ storeCode: context.storeCode, sku });
  });

  it(`Query product should called with expect args`, async () => {
    const product = ProductResolver.Query.product as Function;
    jest
      .spyOn(context.dataSources.magento.product, 'findByUrl')
      .mockReturnValue(
        Promise.resolve({ type_id: 'configurable', extension_attributes: { configurable_product_links: '1' } }),
      );
    jest.spyOn(context.dataSources.magento.catalogService, 'find').mockReturnValue(Promise.resolve({ products: [] }));
    await product(null, { url, storeCode: context.storeCode }, context);
    expect(context.dataSources.magento.product.findByUrl).toBeCalledWith({ url, storeCode: context.storeCode });
  });

  it(`Query productSearch should called with expect args`, async () => {
    const productSearch = ProductResolver.Query.productSearch as Function;
    jest.spyOn(context.dataSources.magento.catalogService, 'find').mockReturnValue(Promise.resolve({ products: [] }));
    await productSearch(null, { filter, storeCode: context.storeCode }, context);
    expect(context.dataSources.magento.catalogService.find).toBeCalledWith(filter, context.storeCode);
  });

  it(`Query searchTrending should called with expect args`, async () => {
    const searchTrending = ProductResolver.Query.searchTrending as Function;
    jest.spyOn(context.dataSources.magento.catalogService, 'getSearchTrending').mockReturnValue(Promise.resolve([]));
    await searchTrending(null, { storeCode: context.storeCode }, context);
    expect(context.dataSources.magento.catalogService.getSearchTrending).toBeCalledWith(context.storeCode);
  });
});

describe('ProductLink', () => {
  const context = {
    dataSources: createDataSources(),
    storeCode: 'cds_th',
  };
  const sku = 'CDS10836583';

  it(`product should called with expect args`, async () => {
    const _source = { linked_product_sku: sku };
    const product = ProductResolver.ProductLink.product as Function;
    jest.spyOn(context.dataSources.magento.product, 'findBySku').mockReturnValue(Promise.resolve([]));
    await product(_source, {}, context);
    expect(context.dataSources.magento.product.findBySku).toBeCalledWith({ storeCode: context.storeCode, sku });
  });

  describe(`Query: productBySku`, () => {
    const productBySku = ProductResolver.Query.productBySku as Function;
    const sku = 'CDS10836583';
    const storeCode = 'cds_th';

    it(`Should return products`, async () => {

      jest
      .spyOn(context.dataSources.magento.product, 'findBySku')
      .mockReturnValue(Promise.resolve(mockProductBySku));

      await productBySku(null, { sku, storeCode }, context);
      expect(context.dataSources.magento.product.findBySku).toBeCalledWith({ storeCode, sku });
    });
  });
});
