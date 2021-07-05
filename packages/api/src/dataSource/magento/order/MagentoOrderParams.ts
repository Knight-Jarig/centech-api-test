export interface OrderFilter {
  field: string;
  value: string;
}

export interface OrderSort {
  field: string;
  direction: string;
}

export interface OrderSearchCriteria {
  filters: OrderFilter[];
  sortOrders: OrderSort[];
  pageSize: number;
  currentPage: number;
}

export interface Filters {
  filters: Filter[];
}

export interface Filter {
  field: string;
  value: string;
  conditionType: string;
}

export interface FilterCriteria {
  filterGroups: Filters[];
  sortOrders?: OrderSort[];
  page: number;
  size: number;
}
