import { sign } from 'jsonwebtoken';
import { typeDef, resolver } from './index';

jest.mock('jsonwebtoken');

const mockDataSources = {
  auth: {
    socialLogin: () => new Promise(resolve => resolve(true)),
  },
  cart: {
    mergeGuestCart: () => new Promise(resolve => resolve(true)),
    createCartMine: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesOrder = {
  magento: {
    auth: mockDataSources.auth,
    cart: mockDataSources.cart,
  },
};

describe('cartWithLineItem', () => {
  const socialLogin = resolver.Mutation.socialLogin as Function;

  const _source = {};
  const params = {};
  const dataSources = dataSourcesOrder;
  const storeCode = 'cds_th';

  it('cartWithLineItem should run properly with guest status', async () => {
    const input = {
      provider: '1',
      token: '1',
      is_jwt: false,
      guest_token: '1',
    };
    jest.spyOn(dataSources.magento.auth, 'socialLogin').mockReturnValue(Promise.resolve([]));
    await socialLogin(_source, { input }, { dataSources, storeCode });
    expect(dataSources.magento.auth.socialLogin).toBeCalled();
  });

  it('cartWithLineItem should run properly with guest status', async () => {
    const input = {
      provider: '1',
      token: '1',
      is_jwt: false,
      guest_token: '1',
    };
    jest.spyOn(dataSources.magento.auth, 'socialLogin').mockReturnValue(Promise.resolve(1));
    jest.spyOn(dataSources.magento.cart, 'mergeGuestCart').mockImplementation(() => {
      throw new Error();
    });
    jest.spyOn(dataSources.magento.cart, 'createCartMine').mockReturnValue(Promise.resolve([]));
    await socialLogin(_source, { input }, { dataSources, storeCode });
    expect(dataSources.magento.auth.socialLogin).toBeCalled();
  });
});
