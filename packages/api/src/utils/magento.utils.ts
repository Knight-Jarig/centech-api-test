import map from 'lodash/map';
import { IFiltersQuery } from '../types/graphql';

export const searchCriteriaBuilder = ({ filterGroups, page, size, sortOrders }: IFiltersQuery) => {
  const pageSizeCriteria = size ? `searchCriteria[pageSize]=${size}` : '';
  const currentPageCriteria = page ? `searchCriteria[currentPage]=${page}` : '';
  const sortCriteria = map(sortOrders, (sort, index) => {
    let sortItem = '';
    sortItem += `searchCriteria[sortOrders][${index}][field]=${sort.field}`;
    sortItem += `&searchCriteria[sortOrders][${index}][direction]=${sort.direction}`;

    if (`${index}` !== '0') {
      return `&${sortItem}`;
    }

    return sortItem;
  }).join('&');

  const filterCriteria = filterGroups
    .map((group, groupIndex) => {
      return group.filters
        .map((filter, filterIndex) => {
          let filterCriteriaItem = '';
          if (filter.field === 'search_term') {
            filter.value = encodeURIComponent(filter.value); // encode special characters ( , / ? : @ & = + $ # )
          }
          filterCriteriaItem += `searchCriteria[filter_groups][${groupIndex}][filters][${filterIndex}][field]=${filter.field}`;
          filterCriteriaItem += `&searchCriteria[filter_groups][${groupIndex}][filters][${filterIndex}][value]=${filter.value}`;
          if (filter.conditionType) {
            filterCriteriaItem += `&searchCriteria[filter_groups][${groupIndex}][filters][${filterIndex}][condition_type]=${filter.conditionType}`;
          }

          return filterCriteriaItem;
        })
        .join('&');
    })
    .join('&');

  const criteriaArr = [];
  if (pageSizeCriteria) criteriaArr.push(pageSizeCriteria);
  if (currentPageCriteria) criteriaArr.push(currentPageCriteria);
  if (sortCriteria) criteriaArr.push(sortCriteria);
  if (filterCriteria) criteriaArr.push(filterCriteria);
  return criteriaArr.join('&');
};
