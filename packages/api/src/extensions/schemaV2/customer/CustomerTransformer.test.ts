import { DateTime } from 'luxon';
import { getCustomerProfile, transformAddress, t1DataForm, transformToUpdateT1ById } from './CustomerTransformer';
import {
  mockCustomerMe,
  mockCustomerMeTransform,
  mockCustomerMeAddress,
  mockCustomerMeAddressTransform,
} from './__mocks__/Customer';

describe('customerTransformer', () => {
  it('getCustomerProfile should run properly', async () => {
    const result = await getCustomerProfile(mockCustomerMe);
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

  it('transformAddress should run properly', async () => {
    const result = await transformAddress(mockCustomerMeAddress);
    expect(result).toEqual(mockCustomerMeAddressTransform);
  });

  it('t1DataForm should run properly', async () => {
    const customerProfile = {
      email: 'email',
      firstname: 'firstname',
      lastname: 'lastname',
      websiteId: '1',
    };
    const t1cNumber = '1111';
    const t1ApiVersion = '2';
    const expected = {
      customer: {
        email: customerProfile?.email,
        firstname: customerProfile?.firstname,
        lastname: customerProfile?.lastname,
        website_id: parseInt(customerProfile?.websiteId),
        custom_attributes: [
          { attribute_code: 't1c_number', value: t1cNumber },
          { attribute_code: 't1_api_version', value: t1ApiVersion },
        ],
      },
    };
    const result = await t1DataForm(customerProfile, t1cNumber, t1ApiVersion);
    expect(result).toEqual(expected);
  });

  it('transformToUpdateT1ById should run properly', async () => {
    const id = '111';
    const customer = {
      email: 'email',
      firstname: 'firstname',
      lastname: 'lastname',
      websiteId: '1',
    };
    const t1cNumber = '11111';
    const t1ApiVersion = '2';
    const expected = {
      id: id?.toString(),
      email: customer?.email,
      firstname: customer?.firstname,
      lastname: customer?.lastname,
      website_id: parseInt(customer?.websiteId),
      custom_attributes: [
        { attribute_code: 't1c_number', value: t1cNumber },
        { attribute_code: 't1_api_version', value: t1ApiVersion },
      ],
    };
    const result = await transformToUpdateT1ById(id, customer, t1cNumber, t1ApiVersion);
    expect(result).toEqual(expected);
  });
});
