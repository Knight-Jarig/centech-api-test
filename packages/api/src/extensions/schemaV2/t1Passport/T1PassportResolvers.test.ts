import { ApolloError } from 'apollo-server';
import { ApplicationError } from '../../../error/ApplicationError';
import { T1PassportResolvers } from './T1PassportResolvers';

const mockDataSources = {
  t1PassportUseCase: {
    v2ConnectT1Profile: () => new Promise(resolve => resolve(true)),
    v2GetT1CustomerProfile: () => new Promise(resolve => resolve(true)),
    v2DeleteT1Profile: () => new Promise(resolve => resolve(true)),
    v2CheckEmailRegistered: () => new Promise(resolve => resolve(true)),
    v2LoginT1PassportCaseToken: () => new Promise(resolve => resolve(true)),
    v2LoginT1PassportCaseEmail: () => new Promise(resolve => resolve(true)),
    v2LoginT1PassportCasePassword: () => new Promise(resolve => resolve(true)),
  },
};

const dataSourcesT1Passport = {
  t1PassportUseCase: mockDataSources.t1PassportUseCase,
};

describe('t1Passport', () => {
  const t1PassportConnectT1Profile = T1PassportResolvers.Mutation.v2ConnectT1Profile as Function;
  const t1PassportGetT1CustomerProfile = T1PassportResolvers.Query.v2GetT1CustomerProfile as Function;
  const t1PassportDeleteT1Profile = T1PassportResolvers.Mutation.v2DeleteT1Profile as Function;
  const t1PassportCheckEmailRegistered = T1PassportResolvers.Query.v2CheckEmailRegistered as Function;
  const t1PassportLoginT1Passport = T1PassportResolvers.Mutation.v2LoginT1Passport as Function;
  const v2T1ProfileDataCards = T1PassportResolvers.V2T1ProfileData.card as Function;

  const _source = {};
  const params = {
    t1Token: '1',
    email: 'minhvb@smartosc.com',
  };
  const dataSources = dataSourcesT1Passport;

  const err = {
    extensions: {
      response: {
        status: 404,
      },
    },
  };
  const expectedErr = new ApolloError('');

  it('v2ConnectT1Profile should run properly', async () => {
    jest.spyOn(dataSources.t1PassportUseCase, 'v2ConnectT1Profile').mockReturnValue(Promise.resolve([]));
    await t1PassportConnectT1Profile(_source, params, { dataSources });
    expect(dataSources.t1PassportUseCase.v2ConnectT1Profile).toBeCalled();
  });

  it('v2ConnectT1Profile throw error', async () => {
    jest.spyOn(dataSources.t1PassportUseCase, 'v2ConnectT1Profile').mockImplementation(() => {
      throw new Error();
    });
    expect(async () => await t1PassportConnectT1Profile(_source, params, { dataSources })).rejects.toThrowError(
      new Error(),
    );
  });

  it('v2ConnectT1Profile throw error 404', async () => {
    jest.spyOn(dataSources.t1PassportUseCase, 'v2ConnectT1Profile').mockImplementation(() => {
      throw err;
    });
    expect(async () => await t1PassportConnectT1Profile(_source, params, { dataSources })).rejects.toThrowError(
      ApplicationError.create(expectedErr),
    );
  });

  it('v2GetT1CustomerProfile should run properly', async () => {
    jest.spyOn(dataSources.t1PassportUseCase, 'v2GetT1CustomerProfile').mockReturnValue(Promise.resolve([]));
    await t1PassportGetT1CustomerProfile(_source, params, { dataSources });
    expect(dataSources.t1PassportUseCase.v2GetT1CustomerProfile).toBeCalled();
  });

  it('v2GetT1CustomerProfile throw error', async () => {
    jest.spyOn(dataSources.t1PassportUseCase, 'v2GetT1CustomerProfile').mockImplementation(() => {
      throw new Error();
    });
    expect(async () => await t1PassportGetT1CustomerProfile(_source, params, { dataSources })).rejects.toThrowError(
      new Error(),
    );
  });

  it('v2GetT1CustomerProfile throw error 404', async () => {
    jest.spyOn(dataSources.t1PassportUseCase, 'v2GetT1CustomerProfile').mockImplementation(() => {
      throw err;
    });
    expect(async () => await t1PassportGetT1CustomerProfile(_source, params, { dataSources })).rejects.toThrowError(
      ApplicationError.create(expectedErr),
    );
  });

  it('v2DeleteT1Profile should run properly', async () => {
    jest.spyOn(dataSources.t1PassportUseCase, 'v2DeleteT1Profile').mockReturnValue(Promise.resolve([]));
    await t1PassportDeleteT1Profile(_source, params, { dataSources });
    expect(dataSources.t1PassportUseCase.v2DeleteT1Profile).toBeCalled();
  });

  it('v2DeleteT1Profile throw error', async () => {
    jest.spyOn(dataSources.t1PassportUseCase, 'v2DeleteT1Profile').mockImplementation(() => {
      throw new Error();
    });
    expect(async () => await t1PassportDeleteT1Profile(_source, params, { dataSources })).rejects.toThrowError(
      new Error(),
    );
  });

  it('v2DeleteT1Profile throw error', async () => {
    jest.spyOn(dataSources.t1PassportUseCase, 'v2DeleteT1Profile').mockImplementation(() => {
      throw err;
    });
    expect(async () => await t1PassportDeleteT1Profile(_source, params, { dataSources })).rejects.toThrowError(
      ApplicationError.create(expectedErr),
    );
  });

  it('v2CheckEmailRegistered should run properly', async () => {
    jest.spyOn(dataSources.t1PassportUseCase, 'v2CheckEmailRegistered').mockReturnValue(Promise.resolve([]));
    await t1PassportCheckEmailRegistered(_source, params, { dataSources });
    expect(dataSources.t1PassportUseCase.v2CheckEmailRegistered).toBeCalled();
  });

  it('v2CheckEmailRegistered throw error', async () => {
    jest.spyOn(dataSources.t1PassportUseCase, 'v2CheckEmailRegistered').mockImplementation(() => {
      throw new Error();
    });
    expect(async () => await t1PassportCheckEmailRegistered(_source, params, { dataSources })).rejects.toThrowError(
      new Error(),
    );
  });

  it('v2CheckEmailRegistered throw error 404', async () => {
    jest.spyOn(dataSources.t1PassportUseCase, 'v2CheckEmailRegistered').mockImplementation(() => {
      throw err;
    });
    expect(async () => await t1PassportCheckEmailRegistered(_source, params, { dataSources })).rejects.toThrowError(
      ApplicationError.create(expectedErr),
    );
  });

  it('v2T1ProfileDataCards should run properly', async () => {
    const root = {
      card: [
        {
          cardNo: '1234',
          pointsBalance: '100',
          pointsExpiryThisYear: '2020',
        },
      ],
    };
    const expected = {
      cardNo: root?.card[0]?.cardNo,
      pointsBalance: root?.card[0]?.pointsBalance,
      pointsExpiryThisYear: root?.card[0]?.pointsExpiryThisYear,
    };
    const result = await v2T1ProfileDataCards(root);
    expect(result).toEqual(expected);
  });

  it('v2LoginT1Passport should run properly case token', async () => {
    const params = {
      t1Token: '1',
    };
    jest.spyOn(dataSources.t1PassportUseCase, 'v2LoginT1PassportCaseToken').mockReturnValue(Promise.resolve([]));
    await t1PassportLoginT1Passport(_source, { input: params }, { dataSources });
    expect(dataSources.t1PassportUseCase.v2LoginT1PassportCaseToken).toBeCalled();
  });

  it('v2LoginT1Passport should run properly case email', async () => {
    const params = {
      t1Token: '1',
      email: '1',
    };
    jest.spyOn(dataSources.t1PassportUseCase, 'v2LoginT1PassportCaseEmail').mockReturnValue(Promise.resolve([]));
    await t1PassportLoginT1Passport(_source, { input: params }, { dataSources });
    expect(dataSources.t1PassportUseCase.v2LoginT1PassportCaseEmail).toBeCalled();
  });

  it('v2LoginT1Passport should run properly case password', async () => {
    const params = {
      t1Token: '1',
      email: '1',
      password: '1',
    };
    jest.spyOn(dataSources.t1PassportUseCase, 'v2LoginT1PassportCasePassword').mockReturnValue(Promise.resolve([]));
    await t1PassportLoginT1Passport(_source, { input: params }, { dataSources });
    expect(dataSources.t1PassportUseCase.v2LoginT1PassportCasePassword).toBeCalled();
  });

  it('v2LoginT1Passport throw error', async () => {
    const params = {
      t1Token: '1',
    };
    jest.spyOn(dataSources.t1PassportUseCase, 'v2LoginT1PassportCaseToken').mockImplementation(() => {
      throw new Error();
    });
    expect(
      async () => await t1PassportLoginT1Passport(_source, { input: params }, { dataSources }),
    ).rejects.toThrowError(new Error());
  });

  it('v2LoginT1Passport throw error', async () => {
    const params = {
      t1Token: '1',
    };
    jest.spyOn(dataSources.t1PassportUseCase, 'v2LoginT1PassportCaseToken').mockImplementation(() => {
      throw err;
    });
    expect(
      async () => await t1PassportLoginT1Passport(_source, { input: params }, { dataSources }),
    ).rejects.toThrowError(ApplicationError.create(expectedErr));
  });
});
