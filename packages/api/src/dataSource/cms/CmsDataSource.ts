import { BaseRESTDataSource } from '../BaseRESTDataSource';
import configs from '../../configs/vars';
import { CMSV2MobileContentsResponse } from './cmsDataSourceParams';
import cache from '../../configs/cache';

interface CmsInput {
  identifier?: string;
  url_key?: string;
  storeCode?: string;
}
export class CmsDataSource extends BaseRESTDataSource {
  constructor() {
    super();
    this.baseURL = configs.cms.base_url;
  }

  willSendRequest(request) {
    super.setCacheOptions(request);
  }

  getCms({ identifier, url_key }: CmsInput) {
    const object = {
      ...(identifier && { identifier: identifier }),
      ...(url_key && { url_key: url_key }),
    };

    return this.get('/v1/contents', object, {
      cacheOptions: { ttl: cache.CMS.getCms },
    });
  }

  getCmsV2({ identifier, url_key, storeCode = 'th' }: CmsInput) {
    const object = {
      ...(identifier && { identifier: identifier }),
      ...(url_key && { url_key: url_key }),
    };
    const language = storeCode.length > 2 ? storeCode.slice(storeCode.length - 2) : storeCode;
    return this.get(`/${language}/v2/contents`, object, {
      cacheOptions: { ttl: cache.CMS.getCmsV2 },
    });
  }

  getCmsV2Mobile({ identifier, url_key, storeCode = 'th' }: CmsInput): Promise<CMSV2MobileContentsResponse> {
    const object = {
      ...(identifier && { identifier: identifier }),
      ...(url_key && { url_key: url_key }),
    };
    const language = storeCode.length > 2 ? storeCode.slice(storeCode.length - 2) : storeCode;
    return this.get(`/${language}/v2/mobile/contents`, object, {
      cacheOptions: { ttl: cache.CMS.getCmsV2Mobile },
    });
  }
}
