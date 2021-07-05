import ElasticSearch from '.';
import cache from '../../configs/cache';

jest.mock('../../configs/vars');

class ElasticSearchTest extends ElasticSearch {
  post() {
    return jest.fn() as any;
  }
}

describe('Elastic Search DataSource', () => {
  const ElasticSearch = new ElasticSearchTest();

  it('searchKeywordSuggestion', async () => {
    const keyword = 'men';
    const size = 5;
    jest.spyOn(ElasticSearch, 'post').mockReturnValue(Promise.resolve({} as any));

    const body = {
      id: 'search-keyword-suggestion-final',
      params: {
        prefix: keyword,
        size: `${size}`,
      },
    };

    await ElasticSearch.searchKeywordSuggestion(keyword, size);
    expect(ElasticSearch.post).toBeCalledWith(`/cds_v3_autocomplete/_search/template`, body, {
      cacheOptions: { ttl: cache.ElasticSearch.searchKeywordSuggestion },
    });
  });
});
