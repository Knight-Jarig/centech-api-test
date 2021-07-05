import { BaseRESTDataSource } from '../BaseRESTDataSource';
import configs from '../../configs/vars';

interface GoogleGeocodeData {
  plus_code: any;
  results: GoogleGeocodeResult[];
  status: string;
}

interface GoogleGeocodeResult {
  address_components: GoogleGeocodeAddressComponent[];
  formatted_address: string;
  geometry: any;
  place_id: string;
  types: string[];
}

interface GoogleGeocodeAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GoogleGeocodeParams {
  address: string;
  region: string;
}

interface GoogleDistanceMatrixParams {
  destinations: string;
  origins: string;
  region: string;
}

interface GoogleDistanceMatrixResult {
  status: string;
  origin_addresses: string[];
  destination_addresses: string[];
  rows: GoogleDistanceMatrixResultRow[];
}

interface GoogleDistanceMatrixResultRow {
  elements: GoogleDistanceMatrixResultElement[];
}

interface GoogleDistanceMatrixResultElement {
  status: string;
  duration: GoogleDistanceMatrixResultDuration;
  distance: GoogleDistanceMatrixResultDistance;
}

interface GoogleDistanceMatrixResultDuration {
  value: number;
  text: string;
}

interface GoogleDistanceMatrixResultDistance {
  value: number;
  text: string;
}

class googleApi extends BaseRESTDataSource {
  getDistanceMatrix(params: GoogleDistanceMatrixParams): Promise<GoogleDistanceMatrixResult> {
    return this.get(`https://maps.googleapis.com/maps/api/distancematrix/json?`, {
      ...params,
      key: this.apiKey,
    });
  }

  getGeocode(params: GoogleGeocodeParams): Promise<GoogleGeocodeData> {
    return this.get(`https://maps.googleapis.com/maps/api/geocode/json?`, {
      ...params,
      key: this.apiKey,
    });
  }

  getGeocodeByLatLng(lat: string, lng: string): Promise<GoogleGeocodeData> {
    return this.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`);
  }

  async getPostcodeByLatLng(lat: string, lng: string): Promise<string> {
    const geocode = await this.getGeocodeByLatLng(lat, lng);
    const postcodeData = geocode?.results?.[0]?.address_components?.find(addressComponent =>
      addressComponent.types.includes('postal_code'),
    );

    return postcodeData?.long_name;
  }

  get apiKey() {
    if (!configs.google.key) {
      console.warn('Google API key is missing');
    }

    return configs.google.key;
  }
}

export default googleApi;
