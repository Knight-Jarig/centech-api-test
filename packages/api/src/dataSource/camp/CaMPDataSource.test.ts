import { CaMPDataSource } from './CaMPDataSource';
import configs from '../../configs/vars';

jest.mock('../../configs/vars');
jest.mock('../../utils/aws.utils');

class CaMPDataSourceTest extends CaMPDataSource {
  get() {
    return jest.fn() as any;
  }
  awsSign4RequestHeader() {
    return jest.fn() as any;
  }
}

describe('CaMPDataSource', () => {
  const camp = new CaMPDataSourceTest();
  camp.initialize({
    context: {
      bu: 'cds',
    },
  });

  it('getVouchers', async () => {
    jest.spyOn(camp, 'get').mockReturnValue(Promise.resolve({} as any));
    jest.spyOn(camp, 'awsSign4RequestHeader').mockReturnValue({
      'x-api-key': 'api key',
      'user-id': '1234',
      'bu-code': 'cds',
      Host: 'sit-cm.central.tech',
      'X-Amz-Date': '20210205T100720Z',
      Authorization: 'token authen',
    }); 

    const request = { userId: '123' };
    const queryParams = {};
    const vouchers = await camp.getVouchers(request, queryParams);
    expect(vouchers).toEqual({});
  });

  it('getVouchers queryParams is null', async () => {
    jest.spyOn(camp, 'get').mockReturnValue(Promise.resolve({} as any));
    jest.spyOn(camp, 'awsSign4RequestHeader').mockReturnValue({
      'x-api-key': 'api key',
      'user-id': '1234',
      'bu-code': 'cds',
      Host: 'sit-cm.central.tech',
      'X-Amz-Date': '20210205T100720Z',
      Authorization: 'token authen',
    }); 
    const request = { userId: '123' };
    const vouchers = await camp.getVouchers(request, null);
    expect(vouchers).toEqual({});
  });

});
