import { searchCriteriaBuilder } from './magento.utils';
describe('magento utils', () => {
  it('search_term with special characters should be encode before send request', async () => {
    const testData = 'B&O';
    const request = {
      page: 1,
      size: 10,
      sortOrders: null,
      filterGroups: [{ filters: [{ field: 'search_term', value: testData, conditionType: 'eq' as any }] }],
    };
    const response = searchCriteriaBuilder(request);
    const expectResult = 'B%26O';
    const expectedResponse = `searchCriteria[pageSize]=10&searchCriteria[currentPage]=1&searchCriteria[filter_groups][0][filters][0][field]=search_term&searchCriteria[filter_groups][0][filters][0][value]=${expectResult}&searchCriteria[filter_groups][0][filters][0][condition_type]=eq`;
    expect(response).toBe(expectedResponse);
  });
});
