import { searchCriteriaBuilder } from '../../src/utils/magento.utils';
import { IConditionType, ISortDirection } from '../../src/types/graphql'

const mockSearchCriteria = {
  filterGroups: [
    {
      filters: [{ field: 'example', value: '1', conditionType: IConditionType.Eq }],
    },
  ],
  page: 1,
  size: 10,
  sortOrders: [{ field: 'price', direction: ISortDirection.Asc }],
};

describe('searchCriteriaBuilder', () => {
  it(`should return magento search criteria`, async () => {
    const criteria = searchCriteriaBuilder(mockSearchCriteria);
    const expectResult = `searchCriteria[pageSize]=10&searchCriteria[currentPage]=1&searchCriteria[sortOrders][0][field]=price&searchCriteria[sortOrders][0][direction]=ASC&searchCriteria[filter_groups][0][filters][0][field]=example&searchCriteria[filter_groups][0][filters][0][value]=1&searchCriteria[filter_groups][0][filters][0][condition_type]=eq`;
    expect(criteria).toEqual(expectResult);
  });

  it(`should return magento search criteria with out sort`, async () => {
    const criteriaWithNull = {
      ...mockSearchCriteria,
      sortOrders: null,
    };
    const criteria = searchCriteriaBuilder(criteriaWithNull);
    const expectResultWithoutSort = `searchCriteria[pageSize]=10&searchCriteria[currentPage]=1&searchCriteria[filter_groups][0][filters][0][field]=example&searchCriteria[filter_groups][0][filters][0][value]=1&searchCriteria[filter_groups][0][filters][0][condition_type]=eq`;
    expect(criteria).toEqual(expectResultWithoutSort);
  });

  it(`should return magento search criteria with multiple filterGroup index`, async () => {
    const criteriaConditionAnd = {
      ...mockSearchCriteria,
      filterGroups: [
        {
          filters: [{ field: 'example_1', value: '1', conditionType: IConditionType.Eq }],
        },
        {
          filters: [{ field: 'example_2', value: '2', conditionType: IConditionType.Eq }],
        },
      ],
    };
    const criteria = searchCriteriaBuilder(criteriaConditionAnd);
    const expectResultWithoutSort = `searchCriteria[pageSize]=10&searchCriteria[currentPage]=1&searchCriteria[sortOrders][0][field]=price&searchCriteria[sortOrders][0][direction]=ASC&searchCriteria[filter_groups][0][filters][0][field]=example_1&searchCriteria[filter_groups][0][filters][0][value]=1&searchCriteria[filter_groups][0][filters][0][condition_type]=eq&searchCriteria[filter_groups][1][filters][0][field]=example_2&searchCriteria[filter_groups][1][filters][0][value]=2&searchCriteria[filter_groups][1][filters][0][condition_type]=eq`;
    expect(criteria).toEqual(expectResultWithoutSort);
  });

  it(`should return magento search criteria with multiple filterGroup secound index`, async () => {
    const criteriaConditionAnd = {
      ...mockSearchCriteria,
      filterGroups: [
        {
          filters: [
            { field: 'example_1', value: '1', conditionType: IConditionType.Eq },
            { field: 'example_2', value: '2', conditionType: IConditionType.Eq },
          ],
        },
      ],
    };
    const criteria = searchCriteriaBuilder(criteriaConditionAnd);
    const expectResultWithoutSort = `searchCriteria[pageSize]=10&searchCriteria[currentPage]=1&searchCriteria[sortOrders][0][field]=price&searchCriteria[sortOrders][0][direction]=ASC&searchCriteria[filter_groups][0][filters][0][field]=example_1&searchCriteria[filter_groups][0][filters][0][value]=1&searchCriteria[filter_groups][0][filters][0][condition_type]=eq&searchCriteria[filter_groups][0][filters][1][field]=example_2&searchCriteria[filter_groups][0][filters][1][value]=2&searchCriteria[filter_groups][0][filters][1][condition_type]=eq`;
    expect(criteria).toEqual(expectResultWithoutSort);
  });
});
