import { T1PassportDataSource } from './T1PassportDataSource';

jest.mock('apollo-server-env');
jest.mock('../../utils/aws.utils');

class T1PassportDataSourceTest extends T1PassportDataSource {
  get() {
    return jest.fn() as any;
  }
  awsSign4RequestHeader() {
    return jest.fn() as any;
  }
}

describe('T1PassportDataSource', () => {
  const t1PassportDataSource = new T1PassportDataSourceTest();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`should run T1PassportDataSource which call getT1Profile function with expect params`, async () => {
    const t1Token = '1';
    const signedHeader = undefined;
    const init = {
      headers: { ...signedHeader },
    };
    jest.spyOn(t1PassportDataSource, 'awsSign4RequestHeader').mockReturnValue(Promise.resolve(init) as any);
    jest.spyOn(t1PassportDataSource, 'get').mockReturnValue(Promise.resolve({}) as any);
    jest.spyOn(t1PassportDataSource, 'get').mockReturnValue(Promise.resolve({}) as any);
    await t1PassportDataSource.getT1Profile(t1Token);
    expect(t1PassportDataSource.get).toBeCalled();
  });

  it(`should run T1PassportDataSource which call signout function with expect params`, async () => {
    const t1Token = '1';
    const signedHeader = undefined;
    const init = {
      headers: { ...signedHeader },
    };
    jest.spyOn(t1PassportDataSource, 'awsSign4RequestHeader').mockReturnValue(Promise.resolve(init) as any);
    jest.spyOn(t1PassportDataSource, 'get').mockReturnValue(Promise.resolve({}) as any);
    await t1PassportDataSource.signout(t1Token);
    expect(t1PassportDataSource.get).toBeCalled();
  });
});
