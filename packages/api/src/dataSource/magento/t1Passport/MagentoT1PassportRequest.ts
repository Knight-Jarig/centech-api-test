export interface T1GetTokenUserInfo {
  grant_type: string;
  code?: string;
  redirect_uri?: string;
}

export interface T1GetTokenPayload {
  userInfo: T1GetTokenUserInfo;
}

export interface T1LoginByMDCPayload {
  token: string;
  email?: string;
}
export interface T1CustomerProfilePayload {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  website_id: number;
  custom_attributes: CustomAttributes[];
}

export interface CustomAttributes {
  attribute_code: string;
  value: any;
}
