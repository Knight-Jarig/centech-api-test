import { VoucherResolvers } from './VoucherResolvers';
import { createDataSources } from '../../../dataSource';
import {
  mockDataEmpty,
  mockDataNull,
  mockResponseDataNull,
  mockDataArray,
  mockResponseDataArray,
} from './__mocks__/voucher';

jest.mock('../../../dataSource');

describe('VouchersV2', () => {
  describe('Query: V2Vouchers', () => {
    const context = {
      dataSources: createDataSources(),
      locale: 'en',
      bu: 'cds',
      customerToken: 'test',
    };
    const v2Vouchers = VoucherResolvers.Query.v2Vouchers as Function;

    it('result should return data as expect 1', async () => {
      const input = {
        filters: [
          { id: 'test', optionIds: ['a'] },
          { id: 'test-a', optionIds: ['a'] },
        ],
        sort: {
          id: 'id',
          direction: 'desc',
        },
        userId: '123',
      };
      jest.spyOn(context.dataSources.camp, 'getVouchers').mockReturnValue(Promise.resolve({} as any));
      jest
        .spyOn(context.dataSources.magento.customer, 'getCustomer')
        .mockReturnValue(Promise.resolve({ id: '123' } as any));

      const result = await v2Vouchers(null, { input }, context);

      expect(result).toEqual(mockDataEmpty);
    });

    it('result should return data as expect 2', async () => {
      const input = {
        filters: null,
      };
      jest.spyOn(context.dataSources.camp, 'getVouchers').mockReturnValue(Promise.resolve({} as any));
      jest
        .spyOn(context.dataSources.magento.customer, 'getCustomer')
        .mockReturnValue(Promise.resolve({ id: '123' } as any));

      const result = await v2Vouchers(null, { input }, context);

      expect(result).toEqual(mockDataEmpty);
    });

    it('result should return data as expect 3', async () => {
      jest.spyOn(context.dataSources.camp, 'getVouchers').mockReturnValue(Promise.resolve(mockDataNull as any));
      jest
        .spyOn(context.dataSources.magento.customer, 'getCustomer')
        .mockReturnValue(Promise.resolve({ id: '123' } as any));

      const result = await v2Vouchers(null, {}, context);

      expect(result).toEqual(mockResponseDataNull);
    });

    it('result should return data as expect 4', async () => {
      jest.spyOn(context.dataSources.camp, 'getVouchers').mockReturnValue(Promise.resolve(mockDataArray as any));
      jest
        .spyOn(context.dataSources.magento.customer, 'getCustomer')
        .mockReturnValue(Promise.resolve({ id: '123' } as any));

      const result = await v2Vouchers(null, {}, context);

      expect(result).toEqual(mockResponseDataArray);
    });

    it('expect throw exception', async () => {
      jest.spyOn(context.dataSources.camp, 'getVouchers').mockReturnValue(Promise.resolve({} as any));
      jest
        .spyOn(context.dataSources.magento.customer, 'getCustomer')
        .mockReturnValue(Promise.resolve({ id: null } as any));

      expect(async () => await v2Vouchers(null, {}, context)).rejects.toThrow();
    });

    it('expect throw exception', async () => {
      const context = {
        dataSources: createDataSources(),
        locale: 'en',
        bu: 'cds',
      };
      jest.spyOn(context.dataSources.camp, 'getVouchers').mockReturnValue(Promise.resolve({} as any));

      expect(async () => await v2Vouchers(null, {}, context)).rejects.toThrow();
    });
  });
});
