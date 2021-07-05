import './graphql';
import { IV2Breadcrumb } from './graphql';

declare module './graphql' {
  export interface IV2ConfigurableOptionValue {
    productIds: string[];
  }

  export interface IV2Reviewer {
    provinceId?: string;
  }

  export interface IV2ProductLinks {
    relatedSKUs: string[];
    crossSellSKUs: string[];
    upSellSKUs: string[];
    breadcrumbs: IV2Breadcrumb[];
  }
}
