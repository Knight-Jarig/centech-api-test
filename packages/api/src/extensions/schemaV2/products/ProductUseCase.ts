import {
  transformConfigurableOption,
  transformHierarchyCategories,
  transformProduct,
} from '../transformer/cs2-transformer';
import { getSaleRuleOverlayImageUrl } from '../transformer/mdc-transformer';
import { MDCStoreConfig } from '../types/mdc-store-config';
import {
  IV2Breadcrumb,
  IV2ConfigurableOption as IConfigurableOption,
  IV2ConfigurableProduct,
  IV2SimpleProduct,
  IV2ProductRecommendInput,
  IV2ProductRecommendResult,
  IV2InventoryStock,
  IV2Product as IProduct,
  IV2ProductSearchFilterConditionInput,
  IV2ProductSearchInput as IProductSearchInput,
  IV2ProductSearchResult as IProductSearchResult,
  IV2ConfigurableProductChild as IConfigurableProductChild,
  IV2ProductType as IProductType,
  IV2ProductSimilarInput as IProductSimilarInput,
  IV2ProductSimilarResult as IProductSimilarResult,
  IV2ProductAssociationInput,
  IV2ProductAssociationResult,
} from '../../../types/graphql';
import { DataSource } from 'apollo-datasource';
import { CatalogServiceDataSource } from '../../../dataSource/catalogService';
import DataLakeRecommendationApi from '../../../dataSource/dataLakeRecommendationApi';
import DataLakeAppRecommendationApi from '../../../dataSource/dataLakeAppRecommendationApi';
import { CSProduct, CSQuerySearchArgs } from '../../../dataSource/catalogService/cs-graphql';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { Prime } from '../../../dataSource/prime';
import configs from '../../../configs/vars';
import { whiteListFilter, whiteListFilterEnable, whiteListFilterCS } from '../../../configs/filter';
import { ApplicationError } from '../../../error/ApplicationError';
import compact from 'lodash/compact';
import uniq from 'lodash/uniq';
import slice from 'lodash/slice';
import { getProductsByPagination } from '../../../utils/product.utils';

interface ProductUseCaseOptions {
  catalogService: CatalogServiceDataSource;
  magento: MagentoDataSource;
  prime: Prime;
  dataLakeRecommendation: DataLakeRecommendationApi;
  dataLakeAppRecommendation: DataLakeAppRecommendationApi;
}

export class ProductUseCase extends DataSource {
  private store?: MDCStoreConfig;
  private locale = 'en';
  private bu: string = configs.bu;

  private catalogService: CatalogServiceDataSource;
  private magento: MagentoDataSource;
  private prime: Prime;
  private dataLakeRecommendation: DataLakeRecommendationApi;
  private dataLakeAppRecommendation: DataLakeAppRecommendationApi;

  constructor({
    catalogService,
    magento,
    prime,
    dataLakeRecommendation,
    dataLakeAppRecommendation,
  }: ProductUseCaseOptions) {
    super();

    this.catalogService = catalogService;
    this.magento = magento;
    this.prime = prime;
    this.dataLakeRecommendation = dataLakeRecommendation;
    this.dataLakeAppRecommendation = dataLakeAppRecommendation;
  }

  initialize(config): void {
    this.bu = config.context.bu;
    this.store = config.context.store;
    this.locale = config.context.locale;
  }

  async search({ limit, page, filters, sort, keyword }: IProductSearchInput): Promise<IProductSearchResult> {
    const size = limit;
    const offset = (page - 1) * limit;
    const store = this.bu;
    const locale = this.locale;
    const pagination = { size, offset };
    const clientFilter = filters.map(f => ({ field: f.id, value: f.optionIds.join(','), operator: f.condition }));

    const filter_groups = clientFilter.filter(filter => whiteListFilterCS.includes(filter.field));
    const isInStockStockQuery = ['1', 'true'].includes(
      clientFilter.find(filter => filter.field === 'is_in_stock')?.value,
    );

    let response;
    const filterSKU = !isInStockStockQuery && filter_groups.find(filter => filter.field === 'sku');
    const filterID = !isInStockStockQuery && filter_groups.find(filter => filter.field === 'id');

    if (filterSKU || filterID) {
      const products = filterSKU
        ? await this.catalogService.findBySkusNew(uniq(filterSKU.value.split(',')))
        : await this.catalogService.findByIdsNew(uniq(filterID.value.split(',')));
      response = {
        products: slice(
          products.filter(product => product),
          offset,
          offset + size,
        ),
        total: products.length,
      };
    } else {
      const mapSort = {
        price_discount: 'discount_amount',
      };

      const sortId = sort ? mapSort[sort.id] || sort.id : null;
      const sort_orders = sort ? { field: sortId, order: sort.direction } : null;

      const variables: CSQuerySearchArgs = {
        store,
        locale,
        pagination,
        filter_groups,
        sort_orders,
        keyword,
      };

      response = (await this.catalogService.search(variables)) ?? {};
    }

    const aggregations = response.aggregations ?? [];

    const filterAggregations = aggregations
      .filter(
        agg =>
          ((agg.buckets && agg.buckets.length > 0) || agg.value) &&
          (whiteListFilterEnable ? whiteListFilter.includes(agg.field) : true),
      )
      .map(agg => {
        const label = agg.label ?? '';

        switch (agg.field) {
          case 'min_price':
            const minPriceData = agg;
            const maxPriceData = aggregations.find(aggregation => aggregation.field === 'max_price') || {};
            return {
              id: 'price',
              label,
              options: [
                { id: 'min', label: minPriceData.label ?? '', value: minPriceData.value },
                { id: 'max', label: maxPriceData.label ?? '', value: maxPriceData.value },
              ],
            };
          case 'max_price':
            return null;
          case 'categories.id':
            return null;
          /*
          case 'categories.id':
            const categoryAggregations = (response.category_aggregations ?? []).filter(
              categoryAgg => (+categoryAgg?.level || 0) >= 2,
            );
            const options = transformHierarchyCategories(categoryAggregations);

            return {
              id: agg.field,
              label,
              options,
              categoryAggregations,
            };
          */
          default:
            return {
              id: agg.field,
              label,
              options: (agg.buckets ?? []).map(bucket => ({
                id: bucket.key,
                label: bucket.key,
                productCount: bucket.doc_count,
              })),
            };
        }
      });

    let categoriesFilter = [];
    if (whiteListFilter.includes('categories.id') && response?.category_aggregations?.length > 0) {
      const categoryAggregations = response?.category_aggregations ?? [];
      const categories = categoryAggregations.filter(categoryAgg => (+categoryAgg?.level || 0) >= 2);

      categoriesFilter = [
        {
          id: 'categories.id',
          label: '',
          options: transformHierarchyCategories(categories),
          categoryAggregations,
        },
      ];
    }
    // this.checkEmptyChild(response.products);

    return {
      totalCount: response.total ?? 0,
      filters: compact([...categoriesFilter, ...filterAggregations]),
      products: (response.products ?? []).map(product => transformProduct(product, this.store)),
      sorts: [],
    };
  }

  async findSimilarProduct(
    breadcrumb: IV2Breadcrumb[],
    sku: string,
    children?: IConfigurableProductChild[],
  ): Promise<IProduct[]> {
    if (!breadcrumb || breadcrumb.length === 0) {
      return [];
    }

    const mapChildrenSku = (children ?? []).map(child => child.product.sku);
    const excludeSkus = [sku, ...mapChildrenSku];

    const category = breadcrumb[breadcrumb.length - 1];
    const limit = 10;
    const { products } = await this.search({
      limit: limit + 1, // support case filter out own sku(-1)
      page: 1,
      filters: [
        {
          id: 'visibility',
          condition: 'in' as IV2ProductSearchFilterConditionInput,
          optionIds: ['2', '4'],
        },
        {
          id: 'categories.id',
          condition: 'in' as IV2ProductSearchFilterConditionInput,
          optionIds: [category.id],
        },
      ],
    });

    const filterProductDuplicate = products.filter(product => {
      // filter out product in same parent
      let allSkus = [product.sku];
      if (product?.type?.toUpperCase() === IProductType.Configurable) {
        const childrenSkus =
          (product as IV2ConfigurableProduct)?.children.map(childProduct => childProduct.product.sku) || [];

        allSkus = [...allSkus, ...childrenSkus];
      }

      return allSkus.find(productsku => excludeSkus.indexOf(productsku) < 0);
    });

    return filterProductDuplicate.slice(0, limit);
  }

  async findProductChildren(sku: string): Promise<IProduct[]> {
    const product = await this.catalogService.findBySku(sku);
    return this.findByIds(product?.configurable_product_links?.map(link => link.toString()) ?? []);
  }

  async findProductConfigurableOptions(sku): Promise<IConfigurableOption[]> {
    const product = await this.catalogService.findBySku(sku);
    const options =
      product.configurable_product_options?.map(option => transformConfigurableOption(option, this.store!)) ?? [];

    const sortingOrder = {
      SWATCH_COLOR: 1,
      SWATCH_IMAGE: 2,
    };

    const majorTypes = options
      .filter(option => {
        return !!sortingOrder[option.values?.[0]?.type];
      })
      .sort((a, b) => (sortingOrder[a.values[0].type] < sortingOrder[b.values[0].type] ? -1 : 1));

    const otherTypes = options
      .filter(option => {
        return !!!sortingOrder[option.values?.[0]?.type];
      })
      .sort((a, b) => (a.values?.[0]?.type < b.values?.[0]?.type ? -1 : 1));

    return [...majorTypes, ...otherTypes];
  }

  async findByIds(ids: string[]): Promise<IProduct[]> {
    const products = await this.catalogService.findByIds(ids);

    return (products.filter(product => product && !(product instanceof Error)) as CSProduct[]).map(product =>
      transformProduct(product, this.store!),
    );
  }

  async findById(id: string): Promise<IProduct> {
    const result = await this.catalogService.findById(id);
    if (!result) {
      throw new ApplicationError('Product not found', { id });
    }

    return transformProduct(result, this.store!);
  }

  async findByIdNew(id: string): Promise<IV2SimpleProduct | IV2ConfigurableProduct> {
    const result = await this.catalogService.findByIdNew(id);
    if (!result) {
      throw new ApplicationError('Product not found', { id });
    }

    return transformProduct(result, this.store);
  }

  async findProductDetailBySKU(sku: string): Promise<IProduct> {
    const result = await this.catalogService.findProductDetailBySkuNew(sku);
    if (!result) {
      throw new ApplicationError('Product not found', { sku });
    }

    return transformProduct(result, this.store!);
  }

  async findProductDetailById(id: string): Promise<IProduct> {
    const result = await this.catalogService.findProductDetailByIdNew(id);
    if (!result) {
      throw new ApplicationError('Product not found', { id });
    }

    return transformProduct(result, this.store);
  }

  async findBySku(sku: string): Promise<IProduct> {
    const result = await this.catalogService.findBySku(sku);
    if (!result) {
      throw new ApplicationError('Product not found', { sku });
    }
    return transformProduct(result, this.store!);
  }

  async findBySkus(skus: string[]): Promise<IProduct[]> {
    const result = await this.catalogService.findBySkus(skus);
    return (result ?? [])
      .filter(product => product && !(product instanceof Error))
      .map(product => transformProduct(product, this.store!));
  }

  async findBySkusNew(skus: string[]): Promise<IProduct[]> {
    const result = await this.catalogService.findBySkusNew(skus);
    return (result ?? [])
      .filter(product => product && !(product instanceof Error))
      .map(product => transformProduct(product, this.store));
  }

  async findByUrlKey(urlKey: string): Promise<IProduct> {
    const response = await this.catalogService.findByUrl({ url: urlKey, locale: this.locale });
    if (!response.product) {
      throw new ApplicationError('Product not found', { urlKey });
    }

    // this.checkEmptyChild([response.product]);

    return transformProduct(response.product, this.store!);
  }

  async findInventoryStockBySku(sku): Promise<IV2InventoryStock> {
    return this.prime.getStockBySku(sku);
  }

  async findInventoryStockBySkus(skus): Promise<IV2InventoryStock[]> {
    const stocks = await this.prime.getStockBySkus(skus);
    if (!stocks) return null;

    return stocks
      .map(item => {
        if (item instanceof Error) return null;
        return item;
      })
      .filter(item => !!item);
  }

  async findCartPriceRuleOverlay(id: string): Promise<string> {
    const result = await this.magento.product.getSaleRuleOverlays(id);

    return getSaleRuleOverlayImageUrl(result, this.store);
  }

  async getOverlayImageUrl(id: string, overlayImageUrl: string): Promise<string> {
    try {
      const cartPriceRuleOverlayImageUrl = await this.findCartPriceRuleOverlay(id);

      return cartPriceRuleOverlayImageUrl || overlayImageUrl;
    } catch (e) {
      return overlayImageUrl;
    }
  }

  async findRecommendationByUser({
    customerId,
    page,
    limit,
    filters,
    sort,
    isViewBased,
  }: IV2ProductRecommendInput): Promise<IV2ProductRecommendResult> {
    let productRecommendation;
    if (isViewBased) {
      productRecommendation = await this.dataLakeAppRecommendation.productRecommendationByUser(this.locale, customerId);
    } else {
      productRecommendation = await this.dataLakeRecommendation.productRecommendationByUser(this.locale, customerId);
    }
    const skus = productRecommendation?.[0]?.data[0]?.item?.map(sku => sku.trim()) || [];
    const baseFilters = [
      {
        id: 'visibility',
        condition: 'in' as IV2ProductSearchFilterConditionInput,
        optionIds: ['2', '4'],
      },
      {
        id: 'sku',
        condition: 'in' as IV2ProductSearchFilterConditionInput,
        optionIds: skus,
      },
      {
        id: 'is_in_stock',
        condition: 'in' as IV2ProductSearchFilterConditionInput,
        optionIds: ['1'],
      },
    ];
    if (filters) {
      const baseFiltersKey = ['visibility', 'sku', 'is_in_stock'];
      filters = filters.filter(field => !baseFiltersKey.includes(field.id)); // filter base filters
    }
    return this.search({
      limit: limit ? limit : skus.length,
      page: page ? page : 1,
      filters: filters ? [...baseFilters, ...filters] : baseFilters,
      sort: sort ? sort : null,
    }) as any;
  }

  async findSimilarProductByDatalake({
    sku,
    limit = 0,
    page = 1,
  }: IProductSimilarInput): Promise<IProductSimilarResult> {
    if (sku === '') throw new ApplicationError('input sku is required');
    const productSimilar = await this.dataLakeRecommendation.productSimilarBySku(this.locale, sku);

    const skuSameBrand = productSimilar?.data?.find(dataItem => dataItem.code === 'same_brand')?.item || [];
    const skuDiffBrand = productSimilar?.data?.find(dataItem => dataItem.code === 'diff_brand')?.item || [];
    const skuFiller = productSimilar?.filler || [];

    const skus = this.trimAndFilterInputSku(sku, [...skuSameBrand, ...skuDiffBrand, ...skuFiller]);

    const limitSkus = skus.slice(0, 50); // fix limit to aviod case CS get bad gateway

    if (!limitSkus.length) {
      return {
        products: [],
        totalCount: 0,
      };
    }

    const { products, totalCount } = await this.search({
      limit: limitSkus.length,
      page: 1,
      filters: [
        {
          id: 'visibility',
          condition: 'in' as IV2ProductSearchFilterConditionInput,
          optionIds: ['2', '4'],
        },
        {
          id: 'sku',
          condition: 'in' as IV2ProductSearchFilterConditionInput,
          optionIds: limitSkus,
        },
        {
          id: 'is_in_stock',
          condition: 'in' as IV2ProductSearchFilterConditionInput,
          optionIds: ['1'],
        },
      ],
    });

    const { filteredProduct, totalCount: newTotalCount } = this.filterProductDuplicateParent(products, sku, totalCount);
    const allData = this.sortProductBySkuArray(filteredProduct, limitSkus);

    return {
      totalCount: newTotalCount,
      products: limit > 0 ? getProductsByPagination(allData, page, limit) : allData,
    };
  }

  async findProductAssociationBySku({
    sku,
    limit = 0,
    page = 1,
  }: IV2ProductAssociationInput): Promise<IV2ProductAssociationResult> {
    if (sku === '') throw new ApplicationError('input sku is required');
    const wholeProducts = await this.dataLakeRecommendation.productAssociationBySku(this.locale, sku);
    const productAsso = wholeProducts?.data?.find(data => data.code === 'product_asso')?.item || [];
    const productFiller = wholeProducts?.filler || [];

    const skuList = this.trimAndFilterInputSku(sku, [...productAsso, ...productFiller]);
    const limitSkuList = skuList.slice(0, 50);

    if (!limitSkuList.length) return { products: [], totalCount: 0 };

    const { products, totalCount } = await this.search({
      limit: limitSkuList.length,
      page: 1,
      filters: [
        {
          id: 'visibility',
          condition: 'in' as IV2ProductSearchFilterConditionInput,
          optionIds: ['2', '4'],
        },
        {
          id: 'sku',
          condition: 'in' as IV2ProductSearchFilterConditionInput,
          optionIds: limitSkuList,
        },
        {
          id: 'is_in_stock',
          condition: 'in' as IV2ProductSearchFilterConditionInput,
          optionIds: ['1'],
        },
      ],
    });

    const { filteredProduct, totalCount: newTotalCount } = this.filterProductDuplicateParent(products, sku, totalCount);

    return {
      totalCount: newTotalCount,
      products: limit > 0 ? getProductsByPagination(filteredProduct, page, limit) : filteredProduct,
    };
  }

  private trimAndFilterInputSku(inputSku: string, skus: string[]) {
    const trimSkus = skus.map(mapSku => mapSku.trim());
    return uniq(trimSkus).filter(datalakeSku => `${datalakeSku}`.toLowerCase() !== `${inputSku}`.toLowerCase());
  }

  private getAllProductSkusLowerCase = (product: IProduct) => {
    const childrenSkus =
      (product as IV2ConfigurableProduct)?.children?.map(childProduct => `${childProduct.product.sku}`.toLowerCase()) ||
      [];
    return [`${product?.sku}`.toLowerCase(), ...childrenSkus];
  };

  private sortProductBySkuArray = (products: IProduct[], skus: string[]) => {
    const findProductIndex = (lowerCaseSkus, product) => {
      return lowerCaseSkus.findIndex(sku => {
        const allSkus = this.getAllProductSkusLowerCase(product);

        return allSkus.includes(sku);
      });
    };

    return products.sort((a, b) => {
      const lowerCaseSkus = skus.map(sku => `${sku}`.toLowerCase());
      const skuA = findProductIndex(lowerCaseSkus, a);
      const skuB = findProductIndex(lowerCaseSkus, b);

      return skuA - skuB;
    });
  };

  private filterProductDuplicateParent = (products: IProduct[], skuInput: string, totalCount: number) => {
    let newTotalCount = totalCount;
    const filteredProduct = products.filter(product => {
      const allSkus = this.getAllProductSkusLowerCase(product);
      const isSkuDuplicate = allSkus.includes(`${skuInput}`.toLowerCase());
      if (isSkuDuplicate) newTotalCount = newTotalCount - 1;

      return !isSkuDuplicate;
    });

    return {
      filteredProduct,
      totalCount: newTotalCount,
    };
  };

  // private checkEmptyChild(products: CSProduct[]) {
  //   const productsEmptyChild = products?.filter(
  //     product => !product.configurable_products || product.configurable_products.length === 0,
  //   );
  //   if (productsEmptyChild) {
  //     Sentry.withScope(scope => {
  //       scope.setExtra(
  //         'Skus',
  //         productsEmptyChild.map(product => product.sku),
  //       );
  //       Sentry.captureMessage("Some product's children is empty");
  //     });
  //   }
  // }
}
