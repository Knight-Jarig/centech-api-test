export interface MagentoAuthGetCustomerTokenParams {
  username: string | number;
  password: string | number;
}

export interface MagentoAuthRegisterParams {
  customer: any;
  storeCode: string;
}

export type MagentoAuthLazyRegisterParams = any;

export interface MagentoAuthFacebookLoginParams {
  social_id: string | number;
  social_type: string;
}

export interface MagentoAuthSocialLoginParams {
  token: string | number;
  provider: string;
}

export interface MagentoAuthForgotPasswordParams {
  email: string;
  storeCode: string;
}

export interface MagentoAuthResetPasswordParams {
  email: string;
  newPassword: string;
  resetToken: string;
}

export enum SocialLoginVersion {
  V1 = 'V1',
  V2 = 'V2',
}
