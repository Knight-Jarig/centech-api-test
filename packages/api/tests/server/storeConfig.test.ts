import { storeConfigs as GET_STORE_CONFIG } from '@central-tech/operation';
import { IStoreConfig } from "../../src/types/graphql";
import { createClient } from './lib/testClient';
import { getFieldsFromDocumentNode } from './lib/util';

it('StoreConfig', async () => {
  const { query } = createClient();
  const fields : string[] = getFieldsFromDocumentNode(GET_STORE_CONFIG);

  // run query against the server and snapshot the output
  const { data } = await query({ query: GET_STORE_CONFIG});
  const storeConfigs: IStoreConfig[] = data.storeConfigs;

  fields.forEach(expect(storeConfigs[0]).toHaveProperty);
});
