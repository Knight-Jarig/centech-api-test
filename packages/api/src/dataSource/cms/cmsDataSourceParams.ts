export interface Properties {
  text: string;
  url: string;
  itemDeeplink: string;
  showBullet: boolean;
  autoplay: boolean;
  viewAll: boolean;
  videoId: string;
  sku: string;
  limit: number;
  maxItemsSize: number;
  minimumVisible: number;
}

export interface Styles {
  textSize: number;
  textColor: string;
  titleColor: string;
  textAlignment: string;
  height: number;
  color: string;
  marginLeft: number;
  marginRight: number;
  cornerRadius: number;
  icon: string;
  iconGravity: string;
  outline: number;
  outlineColor: string;
  backgroundColor: string;
}

export interface CmsList {
  viewType: string;
  properties?: Properties;
  styles?: Styles;
  deeplink?: string;
  items?: CmsList[];
  data?: CmsList;
}

export interface CMSV2MobileContentsResponse {
  status: string;
  cms_list: CmsList[];
}
