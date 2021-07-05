import { BaseRESTDataSource } from '../../BaseRESTDataSource';
import { searchCriteriaBuilder } from '../../../utils/magento.utils';
import { IConditionType } from '../../../types/graphql';
import { MDCGetCustomer } from '../../../dataSource/magento/customer/MagentoCustomerResponse';
import { MDCGetItems, T1AccessTokenResponse, T1RedeemProfile, T1LoginByMDCResponse } from './MagentoT1PassportResponse';
import { T1GetTokenPayload, T1LoginByMDCPayload, T1CustomerProfilePayload } from './MagentoT1PassportRequest';
import configs from '../../../configs/vars';

export class MagentoT1PassportDataSource extends BaseRESTDataSource {
  getMdcId(t1number: string): Promise<MDCGetItems> {
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
        Authorization: `Bearer ${this.context.token}`,
      },
    };
    return this.get(path, {}, init);
  }

  getCustomerByEmail(email: string): Promise<MDCGetItems> {
    const filter = {
      filterGroups: [{ filters: [{ field: 'email', value: email, conditionType: IConditionType.Eq }] }],
    };
    const searchCriteria = searchCriteriaBuilder(filter);
    const path = `/V1/customers/search?${searchCriteria}`;
    const init = {
      headers: {
        Authorization: `Bearer ${this.context.token}`,
      },
    };

    return this.get(path, {}, init);
  }

  getToken(payload: T1GetTokenPayload): Promise<T1AccessTokenResponse> {
    const path = `/V1/t1p2/auth/token`;
    const init = {
      headers: {
        Authorization: `Bearer ${configs.magento.token}`,
      },
    };

    return this.post(path, payload, init);
  }

  redeemProfile(token: string): Promise<T1RedeemProfile> {
    const path = `/V1/t1p2/profile`;
    const init = {
      headers: {
        Authorization: `Bearer ${configs.magento.token}`,
        'x-authorization-key': token,
      },
    };

    return this.get(path, {}, init);
  }

  loginByMDC(payload: T1LoginByMDCPayload): Promise<T1LoginByMDCResponse> {
    const path = `/V1/integration/customer/login/t1_login`;
    const init = {
      headers: {
        Authorization: `Bearer ${configs.magento.token}`,
      },
    };

    return this.post(path, payload, init);
  }

  updateById(customerPayload: T1CustomerProfilePayload): Promise<MDCGetCustomer> {
    const data = {
      customer: { ...customerPayload },
    };
    const init = {
      headers: {
        Authorization: `Bearer ${this.context.token}`,
      },
    };
    return this.put(`/V1/customers/${customerPayload?.id}`, data, init);
  }

  refreshToken(refreshToken: string): Promise<T1AccessTokenResponse> {
    const path = `/V1/t1p2/auth/token/refresh`;
    const init = {
      headers: {
        Authorization: `Bearer ${configs.magento.token}`,
      },
    };

    const payload = {
      refresh_token: refreshToken,
    };

    return this.post(path, payload, init);
  }
}
