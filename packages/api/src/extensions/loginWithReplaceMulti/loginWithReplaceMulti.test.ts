import { resolver } from './index';
import { ILoginInput, ISocialLoginInput, ISocialLoginInputProvider } from '../../types/graphql';
import { MagentoDataSource } from '../../dataSource/magento/MagentoDataSource';
import { sign } from 'jsonwebtoken';
import configs from '../../configs/vars';
import { ApplicationError } from '../../error/ApplicationError';
jest.mock('../../configs/vars');
afterEach(() => {
  jest.clearAllMocks();
});

describe('Login with Replace Multi', () => {
  const magento = new MagentoDataSource();
  const dataSources = {
    magento,
  };
  const storeCode = 'en';
  const userToken = 'USER_TOKEN';
  const mockCartMine = {
    id: 1,
    items: [
      {
        sku: 'CDS1',
        qty: 2,
      },
      {
        sku: 'CDS2',
        qty: 1,
      },
    ],
  };

  const mockCartGuest = {
    items: [
      {
        sku: 'CDS1',
        qty: 5,
      },
      {
        sku: 'CDS3',
        qty: 1,
      },
    ],
  };


  const mockCartGuestEmpty = {
    items: [],
  };

  const itemGuestReplaced = [
    { sku: "CDS1", qty: 5},
    { sku: "CDS3", qty: 1}
  ];

  const replaceCartArg = [
    { sku: 'CDS1', qty: 2 },
    { sku: 'CDS2', qty: 1 },
    { sku: 'CDS3', qty: 1 },
  ];

  it('socialLogin with jwt', async () => {
    const loginFunction = resolver.Mutation.socialLogin as Function;
    const socialLogin: ISocialLoginInput = {
      provider: ISocialLoginInputProvider.Facebook,
      token: 'FACEBOOK_TOKEN',
      is_jwt: true,
      isReplaceCart: false,
    };

    jest.spyOn(dataSources.magento.auth, 'socialLogin').mockReturnValue(Promise.resolve(userToken));

    const loginResponse = await loginFunction(null, { input: socialLogin }, { dataSources, storeCode });
    expect(loginResponse).toEqual({ token: sign({ token: userToken }, configs.jwt.secret) });
  });

  it('login without jwt', async () => {
    const loginFunction = resolver.Mutation.login as Function;
    const socialLogin: ILoginInput = {
      username: 'USERNAME',
      password: 'PASSWORD',
      guest_token: '',
      is_jwt: true,
      isReplaceCart: false,
    };

    jest.spyOn(dataSources.magento.auth, 'getCustomerToken').mockReturnValue(Promise.resolve(userToken));

    const loginResponse = await loginFunction(null, { input: socialLogin }, { dataSources, storeCode });
    expect(loginResponse).toEqual({ token: sign({ token: userToken }, configs.jwt.secret) });
  });

  it('login and got 401', async () => {
    const loginFunction = resolver.Mutation.login as Function;
    const socialLogin: ILoginInput = {
      username: 'USERNAME',
      password: 'PASSWORD',
      guest_token: '',
      is_jwt: true,
      isReplaceCart: false,
    };

    jest.spyOn(dataSources.magento.auth, 'getCustomerToken').mockReturnValue(
      Promise.reject({
        extensions: {
          response: {
            status: 401,
          },
        },
      }),
    );

    try {
      await loginFunction(null, { input: socialLogin }, { dataSources, storeCode });
    } catch (e) {
      expect(e).toBeInstanceOf(ApplicationError);
    }
  });

  it('login and got 401 with out e.extensions', async () => {
    const loginFunction = resolver.Mutation.login as Function;
    const socialLogin: ILoginInput = {
      username: 'USERNAME',
      password: 'PASSWORD',
      guest_token: '',
      is_jwt: true,
      isReplaceCart: false,
    };

    jest.spyOn(dataSources.magento.auth, 'getCustomerToken').mockReturnValue(Promise.reject({}));

    try {
      await loginFunction(null, { input: socialLogin }, { dataSources, storeCode });
    } catch (e) {
      expect(e).not.toBeNull();
    }
  });

  it('login and got 500', async () => {
    const loginFunction = resolver.Mutation.login as Function;
    const socialLogin: ILoginInput = {
      username: 'USERNAME',
      password: 'PASSWORD',
      guest_token: '',
      is_jwt: true,
      isReplaceCart: false,
    };

    const mock500Error = {
      extensions: {
        response: {
          status: 500,
        },
      },
    };
    jest.spyOn(dataSources.magento.auth, 'getCustomerToken').mockReturnValue(Promise.reject(mock500Error));
    try {
      await loginFunction(null, { input: socialLogin }, { dataSources, storeCode });
    } catch (e) {
      expect(e).toEqual(mock500Error);
    }
  });

  it('socialLogin without guest token', async () => {
    const loginFunction = resolver.Mutation.socialLogin as Function;
    const socialLogin: ISocialLoginInput = {
      provider: ISocialLoginInputProvider.Facebook,
      token: 'FACEBOOK_TOKEN',
      is_jwt: false,
      isReplaceCart: false,
    };

    jest.spyOn(dataSources.magento.auth, 'socialLogin').mockReturnValue(Promise.resolve(userToken));

    const loginResponse = await loginFunction(null, { input: socialLogin }, { dataSources, storeCode });
    expect(loginResponse).toEqual({ token: userToken });
  });

  it('socialLogin with guest token and create cart', async () => {
    const loginFunction = resolver.Mutation.socialLogin as Function;
    const socialLogin: ISocialLoginInput = {
      provider: ISocialLoginInputProvider.Facebook,
      token: 'FACEBOOK_TOKEN',
      guest_token: 'GUEST_TOKEN',
      is_jwt: false,
      isReplaceCart: false,
    };
    let getCartFirstTime = true;

    jest.spyOn(dataSources.magento.auth, 'socialLogin').mockReturnValue(Promise.resolve(userToken));
    jest.spyOn(dataSources.magento.cart, 'getCartMine').mockImplementation(() => {
      if (getCartFirstTime) {
        getCartFirstTime = false;
        return Promise.reject(404);
      }
      return Promise.resolve(mockCartMine as any);
    });
    jest.spyOn(dataSources.magento.cart, 'createCartMine').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cart, 'replaceCartItem').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cart, 'clearBillingAddress').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cartGuest, 'getCartGuest').mockReturnValue(Promise.resolve(mockCartGuest as any));

    const loginResponse = await loginFunction(null, { input: socialLogin }, { dataSources, storeCode });
    expect(loginResponse).toEqual({ token: userToken });
    expect(dataSources.magento.cart.createCartMine).toBeCalled();
    expect(dataSources.magento.cartGuest.getCartGuest).toBeCalled();
    expect(dataSources.magento.cart.replaceCartItem).toBeCalledWith(replaceCartArg);
    expect(dataSources.magento.cart.clearBillingAddress).toBeCalled();
  });

  it('socialLogin with guest token', async () => {
    const loginFunction = resolver.Mutation.socialLogin as Function;
    const socialLogin: ISocialLoginInput = {
      provider: ISocialLoginInputProvider.Facebook,
      token: 'FACEBOOK_TOKEN',
      guest_token: 'GUEST_TOKEN',
      is_jwt: false,
      isReplaceCart: false,
    };

    jest.spyOn(dataSources.magento.auth, 'socialLogin').mockReturnValue(Promise.resolve(userToken));
    jest.spyOn(dataSources.magento.cart, 'getCartMine').mockImplementation(() => {
      return Promise.resolve(mockCartMine as any);
    });
    jest.spyOn(dataSources.magento.cart, 'createCartMine').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cart, 'replaceCartItem').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cart, 'clearBillingAddress').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cartGuest, 'getCartGuest').mockReturnValue(Promise.resolve(mockCartGuest as any));

    const loginResponse = await loginFunction(null, { input: socialLogin }, { dataSources, storeCode });
    expect(loginResponse).toEqual({ token: userToken });
    expect(dataSources.magento.cart.createCartMine).not.toBeCalled();
    expect(dataSources.magento.cartGuest.getCartGuest).toBeCalled();
    expect(dataSources.magento.cart.replaceCartItem).toBeCalledWith(replaceCartArg);
    expect(dataSources.magento.cart.clearBillingAddress).toBeCalled();
  });

  it('login without guest token', async () => {
    const loginFunction = resolver.Mutation.login as Function;
    const socialLogin: ILoginInput = {
      username: 'USERNAME',
      password: 'PASSWORD',
      guest_token: '',
      isReplaceCart: false,
    };

    jest.spyOn(dataSources.magento.auth, 'getCustomerToken').mockReturnValue(Promise.resolve(userToken));

    const loginResponse = await loginFunction(null, { input: socialLogin }, { dataSources, storeCode });
    expect(loginResponse).toEqual({ token: userToken });
  });

  it('login with guest token and create cart mine', async () => {
    const loginFunction = resolver.Mutation.login as Function;
    const socialLogin: ILoginInput = {
      username: 'USERNAME',
      password: 'PASSWORD',
      guest_token: 'GUEST_TOKEN',
      isReplaceCart: false,
    };
    let getCartFirstTime = true;

    jest.spyOn(dataSources.magento.auth, 'getCustomerToken').mockReturnValue(Promise.resolve(userToken));
    jest.spyOn(dataSources.magento.cart, 'getCartMine').mockImplementation(() => {
      if (getCartFirstTime) {
        getCartFirstTime = false;
        return Promise.reject(404);
      }
      return Promise.resolve(mockCartMine as any);
    });
    jest.spyOn(dataSources.magento.cart, 'createCartMine').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cart, 'replaceCartItem').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cart, 'clearBillingAddress').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cartGuest, 'getCartGuest').mockReturnValue(Promise.resolve(mockCartGuest as any));

    const loginResponse = await loginFunction(null, { input: socialLogin }, { dataSources, storeCode });
    expect(loginResponse).toEqual({ token: userToken });
    expect(dataSources.magento.cart.createCartMine).toBeCalled();
    expect(dataSources.magento.cartGuest.getCartGuest).toBeCalled();
    expect(dataSources.magento.cart.replaceCartItem).toBeCalledWith(replaceCartArg);
    expect(dataSources.magento.cart.clearBillingAddress).toBeCalled();
  });

  it('login with guest token', async () => {
    const loginFunction = resolver.Mutation.login as Function;
    const socialLogin: ILoginInput = {
      username: 'USERNAME',
      password: 'PASSWORD',
      guest_token: 'GUEST_TOKEN',
      isReplaceCart: false,
    };

    jest.spyOn(dataSources.magento.auth, 'getCustomerToken').mockReturnValue(Promise.resolve(userToken));
    jest.spyOn(dataSources.magento.cart, 'getCartMine').mockImplementation(() => {
      return Promise.resolve(mockCartMine as any);
    });
    jest.spyOn(dataSources.magento.cart, 'createCartMine').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cart, 'replaceCartItem').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cart, 'clearBillingAddress').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cartGuest, 'getCartGuest').mockReturnValue(Promise.resolve(mockCartGuest as any));

    const loginResponse = await loginFunction(null, { input: socialLogin }, { dataSources, storeCode });
    expect(loginResponse).toEqual({ token: userToken });
    expect(dataSources.magento.cart.createCartMine).not.toBeCalled();
    expect(dataSources.magento.cartGuest.getCartGuest).toBeCalled();
    expect(dataSources.magento.cart.replaceCartItem).toBeCalledWith(replaceCartArg);
    expect(dataSources.magento.cart.clearBillingAddress).toBeCalled();
  });

  it('login with guest token but empty cart on guest', async () => {
    const loginFunction = resolver.Mutation.login as Function;
    const socialLogin: ILoginInput = {
      username: 'USERNAME',
      password: 'PASSWORD',
      guest_token: 'GUEST_TOKEN',
      isReplaceCart: false,
    };

    jest.spyOn(dataSources.magento.auth, 'getCustomerToken').mockReturnValue(Promise.resolve(userToken));
    jest.spyOn(dataSources.magento.cart, 'getCartMine').mockImplementation(() => {
      return Promise.resolve(mockCartMine as any);
    });
    jest.spyOn(dataSources.magento.cart, 'createCartMine').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cart, 'replaceCartItem').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cart, 'clearBillingAddress').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cartGuest, 'getCartGuest').mockReturnValue(Promise.resolve(mockCartGuestEmpty as any));

    const loginResponse = await loginFunction(null, { input: socialLogin }, { dataSources, storeCode });
    expect(loginResponse).toEqual({ token: userToken });
    expect(dataSources.magento.cart.createCartMine).not.toBeCalled();
    expect(dataSources.magento.cartGuest.getCartGuest).toBeCalled();
    expect(dataSources.magento.cart.replaceCartItem).not.toBeCalled();
    expect(dataSources.magento.cart.clearBillingAddress).not.toBeCalled();
  });

  it('login with guest token in checkout page', async () => {
    const loginFunction = resolver.Mutation.login as Function;
    const socialLogin: ILoginInput = {
      username: 'USERNAME',
      password: 'PASSWORD',
      guest_token: 'GUEST_TOKEN',
      isReplaceCart: true,
    };

    jest.spyOn(dataSources.magento.auth, 'getCustomerToken').mockReturnValue(Promise.resolve(userToken));
    jest.spyOn(dataSources.magento.cart, 'getCartMine').mockImplementation(() => {
      return Promise.resolve(mockCartMine as any);
    });
    jest.spyOn(dataSources.magento.cart, 'createCartMine').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cart, 'replaceCartItem').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cart, 'clearBillingAddress').mockReturnValue(Promise.resolve(true));
    jest.spyOn(dataSources.magento.cartGuest, 'getCartGuest').mockReturnValue(Promise.resolve(mockCartGuest as any));

    const loginResponse = await loginFunction(null, { input: socialLogin }, { dataSources, storeCode });
    expect(loginResponse).toEqual({ token: userToken });
    expect(dataSources.magento.cart.createCartMine).not.toBeCalled();
    expect(dataSources.magento.cartGuest.getCartGuest).toBeCalled();
    expect(dataSources.magento.cart.replaceCartItem).toBeCalledWith(itemGuestReplaced);
    expect(dataSources.magento.cart.clearBillingAddress).toBeCalled();
  });
});
