import { MagentoT1PassportDataSource } from './MagentoT1PassportDataSource';
import { searchCriteriaBuilder } from '../../../utils/magento.utils';
import { IConditionType } from '../../../types/graphql';
import configs from '../../../configs/vars';
import { T1GetTokenPayload } from './MagentoT1PassportRequest';

jest.mock('../../../configs/vars');

class MagentoT1PassportDataSourceTest extends MagentoT1PassportDataSource {
  get() {
    return jest.fn() as any;
  }
  post() {
    return jest.fn() as any;
  }
  put() {
    return jest.fn() as any;
  }
}

describe('MagentoT1PassportDataSource', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const MagentoT1PassportDataSource = new MagentoT1PassportDataSourceTest();

  const params = {};

  it(`getMdcId should run properly`, async () => {
    MagentoT1PassportDataSource.initialize({
      context: { token: '1' },
    });
    const t1number = '1';
    const filter = {
      filterGroups: [
        { filters: [{ field: 't1c_number', value: t1number.toString(), conditionType: IConditionType.Eq }] },
        { filters: [{ field: 't1_api_version', value: '2', conditionType: IConditionType.Eq }] },
      ],
    };
    const searchCriteria = searchCriteriaBuilder(filter);
    const path = `/V1/customers/search?${searchCriteria}`;
    const init = {
      headers: {
        Authorization: `Bearer ${MagentoT1PassportDataSource.context.token}`,
      },
    };
    jest.spyOn(MagentoT1PassportDataSource, 'get').mockReturnValue(Promise.resolve({}) as any);
    await MagentoT1PassportDataSource.getMdcId(t1number);
    expect(MagentoT1PassportDataSource.get).toBeCalledWith(path, params, init);
  });

  it(`getCustomerByEmail should run properly`, async () => {
    MagentoT1PassportDataSource.initialize({
      context: { token: '1' },
    });
    const email = 'minhvb@smartosc.com';
    const filter = {
      filterGroups: [{ filters: [{ field: 'email', value: 'minhvb@smartosc.com', conditionType: IConditionType.Eq }] }],
    };
    const searchCriteria = searchCriteriaBuilder(filter);
    const path = `/V1/customers/search?${searchCriteria}`;
    const init = {
      headers: {
        Authorization: `Bearer ${MagentoT1PassportDataSource.context.token}`,
      },
    };
    jest.spyOn(MagentoT1PassportDataSource, 'get').mockReturnValue(Promise.resolve({}) as any);
    await MagentoT1PassportDataSource.getCustomerByEmail(email);
    expect(MagentoT1PassportDataSource.get).toBeCalledWith(path, params, init);
  });

  it('getToken', async () => {
    const payload: T1GetTokenPayload = {
      userInfo: {
        grant_type: 'MOCK',
        code: 'MOCK',
        redirect_uri: 'MOCK',
      },
    };
    const path = `/V1/t1p2/auth/token`;
    const headers = { ['Authorization']: `Bearer ${configs.magento.token}` };

    jest.spyOn(MagentoT1PassportDataSource, 'post').mockReturnValue(Promise.resolve(true) as any);
    const response = await MagentoT1PassportDataSource.getToken(payload);
    expect(MagentoT1PassportDataSource.post).toBeCalledWith(path, payload, { headers });
    expect(response).toEqual(true);
  });

  it('redeemProfile', async () => {
    const token = '1234';
    const path = `/V1/t1p2/profile`;
    const headers = { ['x-authorization-key']: token, ['Authorization']: `Bearer ${configs.magento.token}` };

    jest.spyOn(MagentoT1PassportDataSource, 'get').mockReturnValue(Promise.resolve(true) as any);
    const response = await MagentoT1PassportDataSource.redeemProfile(token);
    expect(MagentoT1PassportDataSource.get).toBeCalledWith(path, {}, { headers });
    expect(response).toEqual(true);
  });

  it('loginByMDC', async () => {
    const path = `/V1/integration/customer/login/t1_login`;
    const params = {
      token: '1234',
      email: 'abcd@central.tech',
    };
    const init = {
      headers: {
        Authorization: `Bearer ${configs.magento.token}`,
      },
    };
    jest.spyOn(MagentoT1PassportDataSource, 'post').mockReturnValue(Promise.resolve({}) as any);
    await MagentoT1PassportDataSource.loginByMDC(params);
    expect(MagentoT1PassportDataSource.post).toBeCalledWith(path, params, init);
  });

  it('updateById', async () => {
    MagentoT1PassportDataSource.initialize({
      context: { token: '1' },
    });
    const data = {
      id: '2222',
      email: 'test@fakemail.co',
      firstname: 'test',
      lastname: 'last',
      website_id: 1,
      custom_attributes: [
        { attribute_code: 't1c_number', value: '11111' },
        { attribute_code: 't1_api_version', value: '2' },
      ],
    };
    const params = {
      customer: { ...data },
    };
    const path = `/V1/customers/2222`;
    const init = {
      headers: {
        Authorization: `Bearer ${MagentoT1PassportDataSource.context.token}`,
      },
    };
    jest.spyOn(MagentoT1PassportDataSource, 'put').mockReturnValue(Promise.resolve(true) as any);
    await MagentoT1PassportDataSource.updateById(data);
    expect(MagentoT1PassportDataSource.put).toBeCalledWith(path, params, init);
  });

  it('refreshToken', async () => {
    const refreshToken = 'MOCK';
    const path = `/V1/t1p2/auth/token/refresh`;
    const headers = { ['Authorization']: `Bearer ${configs.magento.token}` };
    const payload = {
      refresh_token: refreshToken,
    };
    jest.spyOn(MagentoT1PassportDataSource, 'post').mockReturnValue(Promise.resolve(true) as any);
    const response = await MagentoT1PassportDataSource.refreshToken(refreshToken);
    expect(MagentoT1PassportDataSource.post).toBeCalledWith(path, payload, { headers });
    expect(response).toEqual(true);
  });
});
