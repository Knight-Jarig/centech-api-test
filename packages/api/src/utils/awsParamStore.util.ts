import awsParamStore from 'aws-param-store';
import configs from '../configs/vars';
import { ApplicationError } from '../error/ApplicationError';
const { get, find } = require('lodash');

const findKey = awsPath => {
  return awsParamStore.getParametersByPathSync(awsPath, {
    region: 'ap-southeast-1',
  });
};

const getValue = (awsPath, awsParam, key) => {
  const value = find(awsParam, val => val.Name === `${awsPath}${key}`);
  return get(value, 'Value', '');
};

export const getAccessToken = () => {
  const environment = configs.appEnv;
  if (environment === 'development') {
    return configs.instagram.token;
  } else {
    if (configs.instagram.token) {
      return configs.instagram.token;
    } else {
      const awsPath = configs.instagram.aws_params_path;
      try {
        const awsParam = findKey(awsPath);
        const token = getValue(awsPath, awsParam, 'instagram_token');
        configs.instagram.token = token;
        return configs.instagram.token;
      } catch (err) {
        throw new ApplicationError(`Please check on environment variables`);
      }
    }
  }
};

export const getAccessT1 = () => {
  const environment = configs.appEnv;
  if (environment === 'development') {
    return {
      accessKey: configs.t1Passport.accessKey,
      secretKey: configs.t1Passport.secretKey,
    };
  } else {
    if (configs.t1Passport.accessKey && configs.t1Passport.secretKey) {
      return {
        accessKey: configs.t1Passport.accessKey,
        secretKey: configs.t1Passport.secretKey,
      };
    } else {
      const awsPath = configs.t1Passport.aws_params_path;
      try {
        const awsParam = findKey(awsPath);
        const accessKeyValue = getValue(awsPath, awsParam, 'accessKey');
        const secretKeyValue = getValue(awsPath, awsParam, 'secretKey');
        configs.t1Passport.accessKey = accessKeyValue;
        configs.t1Passport.secretKey = secretKeyValue;
        return {
          accessKey: configs.t1Passport.accessKey,
          secretKey: configs.t1Passport.secretKey,
        };
      } catch (err) {
        throw new ApplicationError(`Please check on environment variables`);
      }
    }
  }
};
