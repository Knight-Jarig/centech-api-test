import { ICategories, IStoreConfig } from '../../src/types/graphql';
import { createClient } from './lib/testClient';
import {  getFieldsFromDocumentNode } from './lib/util'
import { categories } from '@central-tech/operation';

it('CATEGORIES', async () => {
  // run query against the server and snapshot the output
  const { query } = createClient();

  const { data } = await query({ query: categories });
  const categoriesResult: ICategories[] = data.categories;
  const fields : string[] = getFieldsFromDocumentNode(categories);

  fields.forEach(expect(categoriesResult[0]).toHaveProperty);
});
