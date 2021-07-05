import { transformCategory, transformProduct } from '../transformer/cs2-transformer';
import { MDCStoreConfig } from '../types/mdc-store-config';
import {
  IV2SuggestSearchInput as ISuggestSearchInput,
  IV2SuggestSearchResult as ISuggestSearchResult,
} from '../../../types/graphql';
import { DataSource } from 'apollo-datasource';
import { CatalogServiceDataSource } from '../../../dataSource/catalogService';
import DataLakeApi from '../../../dataSource/dataLakeApi';
import ElasticSearch from '../../../dataSource/elasticSearch';
import configVars from '../../../configs/vars';
import { transformKeywordSuggestions } from './SuggestSearchTransformer';

const excludeCategoryId = ['5451', '260'];
const excludeCategoryParentId = ['5451'];

export class SuggestSearchUseCase extends DataSource {
  private store?: MDCStoreConfig;
  private locale = 'en';
  private bu: string = configVars.bu;

  private catalogService: CatalogServiceDataSource;
  private dataLake: DataLakeApi;
  private elasticSearch: ElasticSearch;

  constructor({ catalogService, dataLake, elasticSearch }) {
    super();
    this.catalogService = catalogService;
    this.dataLake = dataLake;
    this.elasticSearch = elasticSearch;
  }

  initialize(config): void {
    this.bu = config.context.bu;
    this.store = config.context.store;
    this.locale = config.context.locale;
  }

  async suggestSearch({ keyword, productSize, categorySize }: ISuggestSearchInput): Promise<ISuggestSearchResult> {
    const { products, categories } = await this.catalogService.suggestSearch({
      store: this.bu,
      locale: this.locale,
      keyword,
      product_size: productSize,
      category_size: 10,
    });
    const transformProducts = products.map(product => transformProduct(product, this.store));
    const transformCategories = categories.map(category => transformCategory(category));
    const filterCategoryRules = category => {
      return !excludeCategoryId.includes(category.id) && !excludeCategoryParentId.includes(category.parentId);
    };
    const filterCategories = transformCategories.filter(filterCategoryRules);

    return {
      categories: filterCategories.slice(0, categorySize),
      products: transformProducts,
      suggestionTerms: [],
    };
  }

  async searchSuggestionTerms(keyword: string, size: number): Promise<string[]> {
    const result = await this.dataLake.searchSuggestionTerms(keyword, this.locale);
    return result.slice(0, size);
  }

  async searchTrendingTerms(size: number): Promise<string[]> {
    const result = await this.dataLake.searchTrendingTerms(this.locale);
    return result.slice(0, size);
  }

  async searchKeywordSuggestion(keyword: string, size: number): Promise<string[]> {
    const result = await this.elasticSearch.searchKeywordSuggestion(keyword, size);

    return transformKeywordSuggestions(result);
  }
}
