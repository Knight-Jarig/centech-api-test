import { PutCustomerAddressesIdRequestBody } from './PutCustomerAddressesIdRequestBody';

class PostCustomerAddressesRequestBodyTest extends PutCustomerAddressesIdRequestBody {
  get = () => jest.fn() as any;
  post = () => jest.fn() as any;
  put = () => jest.fn() as any;
  delete = () => jest.fn() as any;
}

describe('PutCustomerAddressesIdRequestBody', () => {
  const PutCustomerAddressesIdRequestBody = new PostCustomerAddressesRequestBodyTest();

  it(`PutCustomerAddressesIdRequestBody should run properly`, async () => {
    expect(PutCustomerAddressesIdRequestBody).not.toBeNull();
  });
});
