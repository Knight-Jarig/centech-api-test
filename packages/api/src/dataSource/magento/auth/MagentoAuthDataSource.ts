import {
  MagentoAuthFacebookLoginParams,
  MagentoAuthForgotPasswordParams,
  MagentoAuthGetCustomerTokenParams,
  MagentoAuthLazyRegisterParams,
  MagentoAuthRegisterParams,
  MagentoAuthResetPasswordParams,
  MagentoAuthSocialLoginParams,
  SocialLoginVersion,
} from './MagentoAuthParams';
import { BaseRESTDataSource } from '../../BaseRESTDataSource';

export class MagentoAuthDataSource extends BaseRESTDataSource {
  getCustomerToken(params: MagentoAuthGetCustomerTokenParams): Promise<any> {
    const path = '/V1/integration/customer/token';

    return this.post(path, params);
  }

  register({ customer, storeCode }: MagentoAuthRegisterParams): Promise<any> {
    const path = `/${storeCode}/V1/customers`;
    const params = customer;

    return this.post(path, params);
  }

  lazyRegister(input: MagentoAuthLazyRegisterParams): Promise<any> {
    const path = `/V1/checkout/lazy-register`;
    const params = input;

    return this.post(path, params);
  }

  facebookLogin(params: MagentoAuthFacebookLoginParams): Promise<any> {
    return this.socialLogin(params, SocialLoginVersion.V1);
  }

  socialLogin(
    params: MagentoAuthFacebookLoginParams | MagentoAuthSocialLoginParams,
    version: SocialLoginVersion = SocialLoginVersion.V1,
  ) {
    const path = `/${version}/integration/customer/social_token`;
    return this.post(path, params);
  }

  forgotPassword({ email, storeCode }: MagentoAuthForgotPasswordParams): Promise<any> {
    const path = `/${storeCode}/V1/customers/password`;
    const params = {
      email: email,
      template: 'email_reset',
    };

    return this.put(path, params);
  }

  resetPassword({ email, newPassword, resetToken }: MagentoAuthResetPasswordParams): Promise<any> {
    const path = `/V1/customers/resetPassword`;
    const params = { email, newPassword, resetToken };

    return this.post(path, params);
  }
}
