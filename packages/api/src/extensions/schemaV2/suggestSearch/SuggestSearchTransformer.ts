import { ElasticSearchKeywordSuggestion } from '../../../dataSource/elasticSearch/ElasticSearchDataSourceResponse';
import get from 'lodash/get';

export function transformKeywordSuggestions(data: ElasticSearchKeywordSuggestion): string[] {
  return get(data, 'suggest.tag-suggest.0.options', []).map(option => (option?.text || '').trim());
}
