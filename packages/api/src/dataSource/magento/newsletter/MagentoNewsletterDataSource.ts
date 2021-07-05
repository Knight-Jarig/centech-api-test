import { BaseRESTDataSource } from '../../BaseRESTDataSource';

interface MagentoNewsletterAddParams {
  email: string;
  storeCode: string;
  optional?: {
    gender?: string;
  };
}

interface MagentoNewsletterSubscribeParams {
  email: string;
  storeCode: string;
}

interface MagentoNewsletterSubscribeResponse {
  success: string;
  message: string;
}

export class MagentoNewsletterDataSource extends BaseRESTDataSource {
  add({ storeCode, email, optional = null }: MagentoNewsletterAddParams): Promise<string> {
    const path = `/${storeCode}/V1/guest-subscriber/${email}`;
    const body = optional && {
      extensionData: [
        {
          attribute_code: 'gender',
          value: optional.gender,
        },
      ],
    };

    return this.post(path, body);
  }

  subscribe({ storeCode, email }: MagentoNewsletterSubscribeParams): Promise<MagentoNewsletterSubscribeResponse> {
    const path = `/${storeCode}/V1/newsletter/subscribe`;
    const params = { email };

    return this.post(path, params);
  }
}
