import gql from 'graphql-tag';
import { categoriesFragment } from '../fragment/categoriesFragment';

export const categoriesTree = gql`
query categoriesTree {
    categoriesTree {
      ...categoriesFragment
      children_data {
        ...categoriesFragment
        children_data {
          ...categoriesFragment
          children_data {
            ...categoriesFragment
          }
        }
      }
    }
  }
  ${categoriesFragment}
`;
