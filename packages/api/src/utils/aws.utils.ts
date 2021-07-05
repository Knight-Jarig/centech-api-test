import aws4 from 'aws4';
import { URLSearchParams, URLSearchParamsInit } from 'apollo-server-env';
import { getAccessT1 } from './awsParamStore.util';
import configs from './../configs/vars'

export enum AWSServiceMethod {
  GET = 'get',
  POST = 'post',
}
interface IAWSserviceConfig {
  host: string;
  region: string;
  service: string;
  accessKey: string;
  secretKey: string;
  apiKey: string;
}

interface IAWSSign4Option {
  host: string;
  service: string;
  region: string;
  path: string;
  headers: Record<string, unknown>;
  body?: string;
}

interface IAWSSign4RequestHeader {
  [key: string]: string;
}

export const awsSign4RequestHeader = (
  method: AWSServiceMethod,
  config: IAWSserviceConfig,
  path: string,
  headers: Record<string, unknown> = undefined,
  payload: URLSearchParamsInit = undefined,
): IAWSSign4RequestHeader => {
  const { host, region, service } = config;
  const { accessKey, secretKey } = getAccessT1();
  const opts: IAWSSign4Option = {
    host,
    service,
    region,
    path,
    headers: {
      'x-api-key': config.apiKey,
      ...headers,
    },
  };
  if (payload) {
    if (method === AWSServiceMethod.GET) {
      opts.path += `?${new URLSearchParams(payload).toString()}`;
    } else {
      opts.body = new URLSearchParams(payload).toString();
    }
  }

  const awsSigned = aws4.sign(opts, { accessKeyId: accessKey, secretAccessKey: secretKey });
  const { headers: responseHeader } = awsSigned;

  return responseHeader;
};

export const awsSign4CampRequestHeader = (
  method: AWSServiceMethod,
  config: IAWSserviceConfig,
  path: string,
  headers: Record<string, unknown> = undefined,
  payload: URLSearchParamsInit = undefined,
): IAWSSign4RequestHeader => {
  const { host, region, service } = config;
  const { accessKey, secretKey } = configs.camp;
  const opts: IAWSSign4Option = {
    host,
    service,
    region,
    path,
    headers: {
      'x-api-key': config.apiKey,
      ...headers,
    },
  };
  if (payload) {
    if (method === AWSServiceMethod.GET) {
      opts.path += `?${new URLSearchParams(payload).toString()}`;
    } else {
      opts.body = new URLSearchParams(payload).toString();
    }
  }

  const awsSigned = aws4.sign(opts, { accessKeyId: accessKey, secretAccessKey: secretKey });
  const { headers: responseHeader } = awsSigned;

  return responseHeader;
};

