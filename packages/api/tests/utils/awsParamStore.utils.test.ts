import { getAccessT1, getAccessToken } from '../../src/utils/awsParamStore.util';
import awsParamStore from 'aws-param-store';
import * as config from '../../src/configs/vars';
const mockParamsStore = [
  { 
    Name: '/falcon/cds/nonprod/t1/accessKey',
    Value: 'accessKeyParams',
  },
  { 
    Name: '/falcon/cds/nonprod/t1/secretKey',
    Value: 'secretKeyParams'
  }
]

const mockParamsStoreInstagram = [
  { 
    Name: '/falcon/nonprod/instagram_token',
    Value: 'instagram_token'
  }
]
const mockResponse = { accessKey: 'accessKeyParams', secretKey: 'secretKeyParams' }
const mockResponseEnv = {accessKey: 'accessKey_env', secretKey: 'secretKey_env'}
const mockResponseInstagram = "instagram_token"
jest.mock('../../src/configs/vars', () => {
  return {
    appEnv: "test",
    instagram: {
      aws_params_path: '/falcon/nonprod/'
    },
    t1Passport: {
      aws_params_path: '/falcon/cds/nonprod/t1/'
    }
  }
});
describe('awsParamsStore', () => {
  it('getAccessT1 success', () => {
    jest.spyOn(awsParamStore, 'getParametersByPathSync').mockReturnValue(mockParamsStore);
    const response = getAccessT1();
    expect(response).toEqual(mockResponse)
  })
  it('getAccessT1 env', () => {
    config.default.t1Passport.accessKey = 'accessKey_env';
    config.default.t1Passport.secretKey = 'secretKey_env';
    jest.spyOn(awsParamStore, 'getParametersByPathSync').mockReturnValue(mockParamsStore);
    const response = getAccessT1();
    expect(response).toEqual(mockResponseEnv)
  })

  it('getAccessToken', () => {
    jest.spyOn(awsParamStore, 'getParametersByPathSync').mockReturnValue(mockParamsStoreInstagram);
    const response = getAccessToken();
    expect(response).toEqual(mockResponseInstagram)
  })

  it('getAccessToken env', () => {
    config.default.instagram.token = 'token_env';
    const response = getAccessToken();
    expect(response).toEqual('token_env')
  })
})

