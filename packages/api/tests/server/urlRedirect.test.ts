import { urlRedirect } from '@central-tech/operation/dist/query/urlRedirect';
import { categories } from '@central-tech/operation/dist/query/categories';
import {IUrlRedirect, IUrlRewrite} from '../../src/types/graphql';
import { createClient } from './lib/testClient';

describe('URL REDIRECT',  () => {
  const { query } = createClient();

  it('LIST CATEGORY & AND TRY TO REDIRECT BUT CAN\'T',async () => {
    // GET ALL categories
    const { data: dataCategory } = await query({
      query: categories,
    });

    const { data } = await query({
      query: urlRedirect,
      variables: {
        url: dataCategory.categories[1].url_path,
      },
    });
    const result: IUrlRedirect = data.IUrlRedirect;
    expect(result).toBeUndefined();
  });

});
