import configs from '../../configs/vars';
import { Request } from 'apollo-datasource-rest';
import cache from '../../configs/cache';
import { BaseRESTDataSource } from '../BaseRESTDataSource';
import { ElasticSearchParamsKeywordSuggestion } from './ElasticSearchDataSourceParams';
import { ElasticSearchKeywordSuggestion } from './ElasticSearchDataSourceResponse';

class ElasticSearch extends BaseRESTDataSource {
  baseURL = configs.elasticSearch.base_url;

  willSendRequest(request) {
    super.setCacheOptions(request);
  }

  protected cacheKeyFor(request: Request): string {
    const requestData = request as any;
    return `${request.url}:${requestData.body.toString()}`;
  }

  searchKeywordSuggestion(keyword: string, size: number): Promise<ElasticSearchKeywordSuggestion> {
    const body: ElasticSearchParamsKeywordSuggestion = {
      id: 'search-keyword-suggestion-final',
      params: {
        prefix: keyword,
        size: `${size}`,
      },
    };

    return this.post(`/cds_v3_autocomplete/_search/template`, body, {
      cacheOptions: { ttl: cache.ElasticSearch.searchKeywordSuggestion },
    });
  }
}

export default ElasticSearch;
