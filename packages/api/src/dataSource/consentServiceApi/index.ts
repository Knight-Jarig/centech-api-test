import { BaseRESTDataSource } from '../BaseRESTDataSource';
import configs from '../../configs/vars';
import cache from '../../configs/cache';

class ConsentServiceApi extends BaseRESTDataSource {
  constructor() {
    super();
    this.baseURL = configs.consentService.base_url;
  }

  willSendRequest(request) {
    super.setCacheOptions(request);

    request.headers.set('x-api-key', `${configs.consentService.api_key}`);
    request.headers.set('Content-Type', 'application/json');
  }

  checkConsentInfo(body: any) {
    return this.post(`/check_consent_info`, {
      partner: configs.bu,
      channel: configs.consentService.channel,
      ...body,
    });
  }

  createCustomerConsent(body: any) {
    return this.post(`/consent`, {
      partner: configs.bu,
      channel: configs.consentService.channel,
      ...body,
    });
  }

  getConsentInfo() {
    return this.get(
      `/consent_info`,
      {
        partner: configs.bu,
        channel: configs.consentService.channel,
      },
      {
        cacheOptions: { ttl: cache.ConsentService.getInfo },
      },
    );
  }

  getConsentDetailByUUID(body: any) {
    return this.get(`/consent/${body.uuid}`);
  }
}

export default ConsentServiceApi;
