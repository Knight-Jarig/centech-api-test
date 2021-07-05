export interface IVipListResponse {
  status: boolean;
  urls: string[];
}

export interface IVipValidateResponse {
  status: boolean;
  url: string;
  email: string;
  phone: string;
  name: string;
  ids: string;
  need_assistance: number;
  t1No: string;
}

export interface IVipInterestResponse {
  status: boolean;
  email: string;
  phone: string;
  name: string;
  ids: string;
  need_assistance: number;
}

export interface IVipNeedAssistanceResponse {
  status: boolean;
  urls: string[];
}

export interface IVipValidateInput {
  url: string;
  email: string;
  phone: string;
  t1No: string;
}

export interface IVipNeedAssistanceInput {
  url: string;
  t1No: string;
}

export interface IVipInterestInput {
  url: string;
  t1No: string;
  ids: string;
}
