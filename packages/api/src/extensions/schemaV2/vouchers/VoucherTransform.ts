import { IV2Voucher, IV2VouchersResponse } from '../../../types/graphql';
import { IResponseVouchers } from '../../../dataSource/camp/CaMPDataSourceParams';
import { transformReward } from '../rewards/RewardTransform'

export const transformVoucherList = (vouchers: IResponseVouchers): IV2VouchersResponse => {
  return {
    from: vouchers.from,
    to: vouchers.to,
    currentPage: vouchers.current_page,
    total: vouchers.total,
    perPage: vouchers.per_page,
    lastPage: vouchers.last_page,
    data:
      vouchers.data?.map(voucher => {
        return {
          issuedAt: voucher.issued_at,
          reservedExpiresAt: voucher.reserved_expires_at,
          state: voucher.state,
          voucherCode: voucher.voucher_code,
          voucherExpiresAt: voucher.voucher_expires_at,
          voucherKey: voucher.voucher_key,
          voucherStartsAt: voucher.voucher_starts_at,
          reward: voucher.reward ? transformReward(voucher.reward): null,
        };
      }) || [],
  };
};
