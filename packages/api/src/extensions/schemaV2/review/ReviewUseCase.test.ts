import { ReviewUseCase } from './ReviewUseCase';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { mockReviewPayload1, mockReviewPayload2, mockReviewPayload3, mockCustomerResponse } from './__mocks__/Review';
import { ApplicationError } from '../../../error/ApplicationError';

jest.mock('../../../dataSource/magento/MagentoDataSource');

describe('Review UseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const magento = new MagentoDataSource();
  const reviewUseCase = new ReviewUseCase({ magento });

  it('addReview: customer add review with input include `customer_id` and `email` should call api with expect attr', async () => {
    const input = {
      province: {
        id: '10',
      },
      title: 'Great Product!',
      detail: 'deee',
      name: 'wanwan',
      email: 'wantip@central.tech',
      customerId: '3633',
      ratingOption: {
        optionId: 20,
        ratingId: 4,
      },
      sku: 'cds14353246',
      imageUrls: ['url/test-upload.jpg'],
    };

    const context = {
      storeCode: 'cds_th',
      customerToken: 'Bearer user_token',
    };

    reviewUseCase.initialize({ context });

    jest.spyOn(magento.product, 'addReviewV2').mockReturnValue(Promise.resolve([]) as any);

    await reviewUseCase.addReview(input);
    expect(magento.product.addReviewV2).toBeCalledWith({
      review: mockReviewPayload1,
      sku: input.sku,
      storeCode: context.storeCode,
    });
  });

  it('addReview: customer add review without input `customer_id` and `email` should call api with expect attr', async () => {
    const input = {
      province: {
        id: '10',
      },
      title: 'Great Product!',
      detail: 'deee',
      name: 'wanwan',
      ratingOption: {
        optionId: 20,
        ratingId: 4,
      },
      sku: 'cds14353246',
      imageUrls: ['url/test-upload.jpg'],
    };

    const context = {
      storeCode: 'cds_th',
      customerToken: 'Bearer user_token',
    };

    reviewUseCase.initialize({ context });

    jest.spyOn(magento.customer, 'getCustomer').mockReturnValue(Promise.resolve(mockCustomerResponse) as any);
    jest.spyOn(magento.product, 'addReviewV2').mockReturnValue(Promise.resolve([]) as any);

    await reviewUseCase.addReview(input);
    expect(magento.product.addReviewV2).toBeCalledWith({
      review: mockReviewPayload1,
      sku: input.sku,
      storeCode: context.storeCode,
    });
  });

  it('addReview: guest add review should call api with expect attr', async () => {
    const input = {
      province: {
        id: '10',
      },
      title: 'Great Product!',
      detail: 'no detail',
      name: 'guest',
      email: 'guest@email.com',
      ratingOption: {
        optionId: 20,
        ratingId: 4,
      },
      sku: 'cds14353246',
      imageUrls: ['url/test-upload.jpg'],
    };

    const context = {
      storeCode: 'cds_th',
    };

    reviewUseCase.initialize({ context });

    jest.spyOn(magento.product, 'addReviewV2').mockReturnValue(Promise.resolve([]) as any);

    await reviewUseCase.addReview(input);
    expect(magento.product.addReviewV2).toBeCalledWith({
      review: mockReviewPayload2,
      sku: input.sku,
      storeCode: context.storeCode,
    });
  });

  it('addReview: guest add review without email should throw error', async () => {
    const input = {
      province: {
        id: '10',
      },
      title: 'Great Product!',
      detail: 'no detail',
      name: 'guest',
      ratingOption: {
        optionId: 20,
        ratingId: 4,
      },
      sku: 'cds14353246',
      imageUrls: ['url/test-upload.jpg'],
    };

    const context = {
      storeCode: 'cds_th',
    };

    reviewUseCase.initialize({ context });

    jest.spyOn(magento.product, 'addReviewV2').mockReturnValue(Promise.resolve([]) as any);

    await expect(() => reviewUseCase.addReview(input)).rejects.toThrow(new ApplicationError('Email is required'));
  });

  it('addReview: add review with default value should call api with expect attr', async () => {
    const input = {
      title: 'Great Product!',
      name: 'guest',
      email: 'guest@gmail.com',
      ratingOption: {
        optionId: 20,
        ratingId: 4,
      },
      sku: 'cds14353246',
    };

    const context = {
      storeCode: 'cds_th',
    };

    reviewUseCase.initialize({ context });

    jest.spyOn(magento.product, 'addReviewV2').mockReturnValue(Promise.resolve([]) as any);

    await reviewUseCase.addReview(input);
    expect(magento.product.addReviewV2).toBeCalledWith({
      review: mockReviewPayload3,
      sku: input.sku,
      storeCode: context.storeCode,
    });
  });
});
