import { DateTime } from 'luxon';
import { CustomerUseCase } from './CustomerUseCase';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import {
  mockCustomerMe,
  mockCustomerMeTransform,
  mockUpdateProfileById,
  mockResponseUpdateT1,
} from './__mocks__/Customer';

describe('Address Usecase', () => {
  const magento = new MagentoDataSource();
  const customerUseCase = new CustomerUseCase({ magento });
  const store = 'cds_th';

  it('v2Customer should return properly', async () => {
    customerUseCase.initialize({
      context: { store },
    });
    const mdcToken = '1234';
    jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomerMe) as any);
    const result = await customerUseCase.customer(mdcToken);
    const expected = {
      ...mockCustomerMeTransform,
      createdAt: DateTime.fromFormat(mockCustomerMeTransform?.createdAt ?? '', 'yyyy-MM-dd HH:mm:ss', {
        zone: 'utc+0',
      }).toUTC(),
      updatedAt: DateTime.fromFormat(mockCustomerMeTransform?.updatedAt ?? '', 'yyyy-MM-dd HH:mm:ss', {
        zone: 'utc+0',
      }).toUTC(),
    };
    expect(result).toEqual(expected);
  });

  it('v2UpdateCustomerT1 should return properly', async () => {
    customerUseCase.initialize({
      context: { store },
    });
    jest.spyOn(magento.customer, 'update').mockReturnValue(Promise.resolve(mockCustomerMe) as any);
    const result = await customerUseCase.updateCustomerT1({
      customerProfile: {
        email: 'email',
        firstname: 'firstname',
        lastname: 'lastname',
        websiteId: '1',
      },
      t1cNumber: '1',
      t1ApiVersion: '1',
    });
    const expected = {
      ...mockCustomerMeTransform,
      createdAt: DateTime.fromFormat(mockCustomerMeTransform?.createdAt ?? '', 'yyyy-MM-dd HH:mm:ss', {
        zone: 'utc+0',
      }).toUTC(),
      updatedAt: DateTime.fromFormat(mockCustomerMeTransform?.updatedAt ?? '', 'yyyy-MM-dd HH:mm:ss', {
        zone: 'utc+0',
      }).toUTC(),
    };
    expect(result).toEqual(expected);
  });

  it('v2UpdateCustomerT1ById should return properly', async () => {
    customerUseCase.initialize({
      context: { store },
    });
    jest.spyOn(magento.t1passport, 'updateById').mockReturnValue(Promise.resolve(mockUpdateProfileById) as any);
    const result = await customerUseCase.updateCustomerT1ById({
      id: '2783',
      customerProfile: {
        email: 'vanth3@smartosc.com',
        firstname: 'Van',
        lastname: 'La',
        websiteId: '1',
      },
      t1cNumber: '2011010003436769',
      t1ApiVersion: '2',
    });
    const expected = {
      ...mockResponseUpdateT1,
      createdAt: DateTime.fromFormat(mockResponseUpdateT1?.createdAt ?? '', 'yyyy-MM-dd HH:mm:ss', {
        zone: 'utc+0',
      }).toUTC(),
      updatedAt: DateTime.fromFormat(mockResponseUpdateT1?.updatedAt ?? '', 'yyyy-MM-dd HH:mm:ss', {
        zone: 'utc+0',
      }).toUTC(),
    };
    expect(result).toEqual(expected);
  });
});
