import { urlRewrite } from '@central-tech/operation/dist/query/urlRewrite';
import {DocumentNode} from "graphql";
import { categories } from '@central-tech/operation/dist/query/categories';
import { IUrlRewrite } from '../../src/types/graphql';
import { createClient } from './lib/testClient';
import { getFieldsFromDocumentNode } from './lib/util';
import { gql } from 'apollo-server'

describe('URL REWRITE',  () => {
  const { query } = createClient();

  it('LIST CATEGORY & GET CATEGORY BY URL',async () => {
    // GET ALL categories
    const { data: dataCategory } = await query({
      query: categories,
    });

    // expect(dataCategory.categories[1]).toHaveProperty('url_path');

    const fields : string[] = getFieldsFromDocumentNode(urlRewrite);
    const { data } = await query({
      query: urlRewrite,
      variables: {
        url: dataCategory.categories[1].url_path,
      },
    });
    const result: IUrlRewrite = data.urlRewrite;
    fields.forEach(expect(result).toHaveProperty);
  });

});
