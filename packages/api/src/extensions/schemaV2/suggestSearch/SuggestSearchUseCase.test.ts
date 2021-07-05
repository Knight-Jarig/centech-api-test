import { SuggestSearchUseCase } from './SuggestSearchUseCase';
import DataLakeApi from '../../../dataSource/dataLakeApi';
import ElasticSearch from '../../../dataSource/elasticSearch';
import { CatalogServiceDataSource } from '../../../dataSource/catalogService';
import {
  mockSearchSuggestionTermsDataLakeResult,
  mockSearchSuggestionTermsResult,
  mockSearchTrendingTermsDataLakeResult,
  mockSearchTrendingTermsResult,
  mockSuggestSearchCSResult,
  mockSuggestSearchResult,
  mockSearchKeywordSuggestionElasticSearchResult,
  mockSearchKeywordSuggestionResult,
} from './__mocks__/SuggestSearchUseCase';

jest.mock('../../../dataSource/catalogService');
jest.mock('../../../dataSource/dataLakeApi');
jest.mock('../../../dataSource/elasticSearch');

describe('SuggestSearch UseCase', () => {
  const catalogService = new CatalogServiceDataSource();
  const dataLake = new DataLakeApi();
  const elasticSearch = new ElasticSearch();
  const suggestSearchUseCase = new SuggestSearchUseCase({ catalogService, dataLake, elasticSearch });

  suggestSearchUseCase.initialize({
    context: {
      bu: 'cds',
      store: {
        id: 2,
        code: 'cds_th',
        website_id: 1,
        locale: 'th_TH',
        base_currency_code: 'THB',
        default_display_currency_code: 'THB',
        timezone: 'Asia/Bangkok',
        weight_unit: 'kgs',
        base_url: 'https://staging-mdc.central.co.th/',
        base_link_url: 'https://staging-mdc.central.co.th/',
        base_static_url: 'https://staging-mdc.central.co.th/static/version1600250695/',
        base_media_url: 'https://staging-mdc.central.co.th/media/',
        secure_base_url: 'https://staging-mdc.central.co.th/',
        secure_base_link_url: 'https://staging-mdc.central.co.th/',
        secure_base_static_url: 'https://staging-mdc.central.co.th/static/version1600250695/',
        secure_base_media_url: 'https://staging-mdc.central.co.th/media/',
        extension_attributes: {
          social_facebook_app_id: '352647465277569',
          social_facebook_app_secret: '9768519708aa71ac5fd03dd3ff5a2b82',
          google_tag_manager_cookies: [
            {
              identifier: 'search',
              experiment_id: 'FFMgDYYKQKqsInf494whLg',
              cookie_variant_id: '1',
              request_header_value: 'alternate',
            },
            {
              identifier: 'search',
              experiment_id: 'FFMgDYYKQKqsInf494whLg',
              cookie_variant_id: '0',
              request_header_value: 'prime',
            },
          ],
        },
      },
      locale: 'th',
    },
  });

  it('suggestSearch', async () => {
    const input = {
      keyword: 'converse',
      productSize: 1,
      categorySize: 2,
    };
    jest.spyOn(catalogService, 'suggestSearch').mockReturnValue(Promise.resolve(mockSuggestSearchCSResult));

    const suggestSearchResult = await suggestSearchUseCase.suggestSearch(input);
    expect(suggestSearchResult).toMatchObject(mockSuggestSearchResult);
    expect(suggestSearchResult.products).toHaveLength(input.productSize);
    expect(suggestSearchResult.categories).toHaveLength(1); // result from filterCategoryRules
  });

  it('searchSuggestionTerms', async () => {
    jest
      .spyOn(dataLake, 'searchSuggestionTerms')
      .mockReturnValue(Promise.resolve(mockSearchSuggestionTermsDataLakeResult));
    const size = 2;
    const keyword = 'converse';
    const searchSuggestionTermsResult = await suggestSearchUseCase.searchSuggestionTerms(keyword, size);
    expect(searchSuggestionTermsResult).toHaveLength(size);
    expect(searchSuggestionTermsResult).toMatchObject(mockSearchSuggestionTermsResult);
  });

  it('searchTrendingTerms', async () => {
    jest.spyOn(dataLake, 'searchTrendingTerms').mockReturnValue(Promise.resolve(mockSearchTrendingTermsDataLakeResult));
    const size = 1;
    const searchTrendingTermsResult = await suggestSearchUseCase.searchTrendingTerms(size);
    expect(searchTrendingTermsResult).toHaveLength(size);
    expect(searchTrendingTermsResult).toMatchObject(mockSearchTrendingTermsResult);
  });

  it('searchKeywordSuggestion', async () => {
    jest
      .spyOn(elasticSearch, 'searchKeywordSuggestion')
      .mockReturnValue(Promise.resolve(mockSearchKeywordSuggestionElasticSearchResult));
    const keyword = 'ผู้';
    const size = 3;

    const result = await suggestSearchUseCase.searchKeywordSuggestion(keyword, size);
    expect(result).toEqual(mockSearchKeywordSuggestionResult);
  });
});
