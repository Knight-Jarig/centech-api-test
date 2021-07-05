import {
  ISearchConditionsSortersQuery,
  IV2SearchConditionsSortersQuery,
  ISearchConditionsFiltersQuery,
  IV2SearchConditionsFiltersQuery,
} from '../../types/graphql';

export interface IPayloadGetStoreListFilter {
  page_cur: number;
  page_size: number;
  searchConditions: ISearchConditions;
}

export interface ISearchConditions {
  filters: [ISearchConditionsFiltersQuery | IV2SearchConditionsFiltersQuery];
  sorters: [ISearchConditionsSortersQuery | IV2SearchConditionsSortersQuery];
}
