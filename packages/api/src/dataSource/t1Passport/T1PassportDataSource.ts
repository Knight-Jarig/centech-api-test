import { BaseRESTDataSource } from '../BaseRESTDataSource';
import { T1ProfileResponse } from './T1PassportDataSourceParams';
import configs from '../../configs/vars';
import { awsSign4RequestHeader, AWSServiceMethod } from '../../utils/aws.utils';

export const getT1ProfilePath = `/t1p2/${configs.t1Passport.member_service}/partner/accounts/user/profile`;

export class T1PassportDataSource extends BaseRESTDataSource {
  constructor() {
    super();
    this.baseURL = configs.t1Passport.base_url;
  }

  async getT1Profile(t1Token: string): Promise<T1ProfileResponse> {
    const headers = {
      'x-authorization-key': `Bearer ${t1Token}`,
    };
    const signedHeader = awsSign4RequestHeader(AWSServiceMethod.GET, configs.t1Passport, getT1ProfilePath, headers);

    return await this.get(
      getT1ProfilePath,
      {},
      {
        headers: { ...signedHeader },
      },
    );
  }

  async signout(t1Token: string): Promise<boolean> {
    const path = `/t1p2/${configs.t1Passport.auth_service}/api/sessions/user/signout`;
    const headers = {
      'x-authorization-key': `Bearer ${t1Token}`,
    };
    const signedHeader = awsSign4RequestHeader(AWSServiceMethod.GET, configs.t1Passport, path, headers);

    return this.get(
      path,
      {},
      {
        headers: { ...signedHeader },
      },
    );
  }
}
