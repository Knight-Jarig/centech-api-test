export interface IResponseVouchers {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  data: [IResponseVoucher];
}


export interface ICampReward {
  id: number;
  reward_type: string;
  status: string;
  name: string;
  display_name: string;
  description: string;
  short_description: string;
  terms_condition: string;
  coupon_condition_description: string;
  image: string;
  tags: [string];
  category: [string];
  voucher_code_type: string;
}

export interface ICampRewards {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  data: [ICampReward];
}

interface IResponseVoucher {
  voucher_code: string;
  voucher_key: string;
  state: string;
  reserved_expires_at: string;
  voucher_starts_at: string;
  voucher_expires_at: string;
  issued_at: string;
  reward: IRewardInVoucher;
}

export interface IRewardInVoucher {
  id: number;
  reward_type: string;
  status: string;
  name: string;
  display_name: string;
  description: string;
  short_description: string;
  terms_condition: string;
  coupon_condition_description: string;
  image: string;
  tags: [string];
  category: [string];
  voucher_code_type: string;
}
