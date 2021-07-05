import {
  ISearchConditionsSortersQuery,
  ISearchConditionsQuery,
  ISearchConditionsFiltersQuery,
} from '../../types/graphql';
import { IPayloadGetStoreListFilter, ISearchConditions } from './cartResolverType';

export function buildPayloadFilterGroup(filtersGroups: ISearchConditionsQuery): IPayloadGetStoreListFilter {
  const payload = {} as IPayloadGetStoreListFilter;
  const searchCondition = {} as ISearchConditions;
  if (filtersGroups?.filters || filtersGroups?.sorters) {
    if (filtersGroups.filters) {
      searchCondition.filters = filtersGroups.filters as [ISearchConditionsFiltersQuery];
    }
    if (filtersGroups.sorters) {
      searchCondition.sorters = filtersGroups.sorters as [ISearchConditionsSortersQuery];
    }
    payload.searchConditions = searchCondition;
  }

  payload.page_cur = filtersGroups?.page || 1;
  if (filtersGroups?.limit) {
    payload.page_size = filtersGroups?.limit;
  }

  return payload;
}
