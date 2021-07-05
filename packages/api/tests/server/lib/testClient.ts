import { createServer } from '../../../src';
import { BaseContext } from '../../../src/types';
import config from '../../../src/configs/vars';
import { createTestClient } from 'apollo-server-testing';

export const server = createServer({
  apolloConfig: {
    context: ({ req }): BaseContext => ({
      token: config.magento.token,
      customerToken: null,
      client: 'web',
      bu: config.bu,
      storeCode: 'en',
      productCustomAttributes: '',
      productCustomAttributesOption: 'w',
    }),
  },
});
export const client = createTestClient(server);

export const createClient = (customContext = {}) => {
  return createTestClient(
    createServer({
      apolloConfig: {
        context: ({ req }): BaseContext => ({
          token: config.magento.token,
          customerToken: null,
          client: 'web',
          bu: config.bu,
          storeCode: 'en',
          productCustomAttributes: '',
          productCustomAttributesOption: 'w',
          ...customContext,
        }),
      },
    }),
  );
};
export const { query } = client;
export const { mutate } = client;
