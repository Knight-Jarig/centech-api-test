import { PostCustomerAddressesRequestBody } from './PostCustomerAddressesRequestBody';

class PostCustomerAddressesRequestBodyTest extends PostCustomerAddressesRequestBody {
  get = () => jest.fn() as any;
  post = () => jest.fn() as any;
  put = () => jest.fn() as any;
  delete = () => jest.fn() as any;
}

describe('PostCustomerAddressesRequestBody', () => {
  const postCustomerAddressesRequestBody = new PostCustomerAddressesRequestBodyTest();

  it(`postCustomerAddressesRequestBody should run properly`, async () => {
    expect(postCustomerAddressesRequestBody).not.toBeNull();
  });
});
