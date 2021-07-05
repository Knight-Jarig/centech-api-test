import { IV2ReviewInput as IReviewInput } from '../../../types/graphql';
import { DataSource } from 'apollo-datasource';
import { MagentoDataSource } from '../../../dataSource/magento/MagentoDataSource';
import { ApplicationError } from '../../../error/ApplicationError';

export class ReviewUseCase extends DataSource {
  private storeCode: string;
  private customerToken: string;

  private magento: MagentoDataSource;

  constructor({ magento }) {
    super();
    this.magento = magento;
  }

  initialize(config): void {
    this.storeCode = config.context.storeCode;
    this.customerToken = config.context.customerToken;
  }

  async addReview(input: IReviewInput): Promise<string[]> {
    const { sku, ...reviewData } = input;
    const hasCustomerData = this.customerToken && reviewData.email && reviewData.customerId;
    let customer = {
      id: null,
      email: null,
    };

    if (hasCustomerData) {
      customer = {
        email: reviewData.email,
        id: reviewData.customerId,
      };
    } else if (this.customerToken) {
      customer = await this.magento.customer.getCustomer(this.storeCode);
    } else if (!reviewData.email) {
      // validate guest is require email
      throw new ApplicationError('Email is required');
    }

    const review = {
      nickname: reviewData.name,
      title: reviewData.title,
      detail: reviewData.detail || 'no_detail',
      rating_items: [
        {
          option_id: reviewData.ratingOption.optionId,
          rating_id: reviewData.ratingOption.ratingId,
        },
      ],
      region_id: +reviewData?.province?.id || null,
      customer_id: customer.id ? `${customer.id}` : null,
      email: customer.id ? customer.email : reviewData.email,
      images: reviewData?.imageUrls?.map(url => ({ path: url })) || [],
    };

    return this.magento.product.addReviewV2({
      review,
      sku,
      storeCode: this.storeCode,
    });
  }
}
