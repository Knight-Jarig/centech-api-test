import { awsSign4RequestHeader, AWSServiceMethod } from '../../src/utils/aws.utils';
jest.mock('../../src/utils/awsParamStore.util');

const mockAWSSignedResponse = {
  host: 'sit-cm.central.tech',
  service: 'execute-api',
  region: 'ap-southeast-1',
  path: '/api/v1/vouchers?state=issued%2Cexpired&reward_tags=&sort_by=reward_name&order=ASC&page=0&per_page=100',
  headers: {
    'x-api-key': 'api key',
    'user-id': '1234',
    'bu-code': 'cds',
    Host: 'sit-cm.central.tech',
    'X-Amz-Date': '20210205T100720Z',
    Authorization: 'token authen',
  },
};
const mockParams = {
  state: 'issued,expired',
  reward_tags: '',
  sort_by: 'reward_name',
  order: 'ASC',
  page: 0,
  per_page: 100,
};
const mockHeader = {
  'user-id': '1234',
  'bu-code': 'cds',
}
const mockAWSSignedHeader = {
  'x-api-key': 'api key',
  'user-id': '1234',
  'bu-code': 'cds',
  Host: 'sit-cm.central.tech',
  'X-Amz-Date': '20210205T100720Z',
  Authorization: 'token authen',
}
const mockConfigs = {
  host: 'sit-cm.central.tech',
  region: 'ap-southeast-1',
  service: 'execute-api',
  accessKey: 'accessKey',
  secretKey: 'secretKey',
  apiKey: 'api key',
}

const mockValueAWSParamsStore = {
  accessKey: 'accessKey',
  secretKey: 'secretKey'
}

describe('awsSign4RequestHeader', () => {
  const awsParamsStore = require('../../src/utils/awsParamStore.util');
  jest.spyOn(awsParamsStore, 'getAccessT1').mockReturnValue(mockValueAWSParamsStore); 
  it(`should return aws signed header on method GET`, async () => {
    const aws4 = require('aws4');
    jest.spyOn(aws4, 'sign').mockReturnValue(mockAWSSignedResponse);
    const response = awsSign4RequestHeader(
      AWSServiceMethod.GET,
      mockConfigs,
      '/api/v1/vouchers',
      mockHeader,
      mockParams
    );
    expect(response).toEqual(mockAWSSignedHeader);
  });
  it(`should return aws signed header on method POST`, async () => {
    const response = awsSign4RequestHeader(
      AWSServiceMethod.POST,
      mockConfigs,
      '/api/v1/vouchers',
      mockHeader,
      mockParams,
    );
    expect(response).toEqual(mockAWSSignedHeader);
  });

  it(`should return aws signed header even no headers and params`, async () => {
    const response = awsSign4RequestHeader(AWSServiceMethod.GET, mockConfigs, '/api/v1/vouchers');
    expect(response).toEqual(mockAWSSignedHeader);
  });
});
