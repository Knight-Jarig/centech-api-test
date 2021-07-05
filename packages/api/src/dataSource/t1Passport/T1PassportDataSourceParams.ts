export interface T1ProfileResponse {
  data: T1ProfileData;
  success?: boolean;
}

export interface T1ProfileData {
  accountType: string;
  address: T1AddressInterface[];
  cards: T1Card[];
  dateOfBirth: string;
  employeeBUShortCode: string;
  employeeID: string;
  firstName: T1NameInterface;
  gender: string;
  isStaff: string;
  lastName: T1NameInterface;
  memberLanguagePref: string;
  status: string;
  style?: any[];
  title: T1NameInterface;
  svoc?: any;
  svocError: string;
  segments: T1Segment[];
  imageProfile: string;
  consentDate: string;
  userAccountID: string;
  onlineEmail: T1OnlineEmail;
  onlineMobile: T1OnlineMobile;
  consentFlag: string;
  consentVersion: string;
  dcsConsentVersion: string;
}

export interface T1AddressInterface {
  addressType: string;
  typeOfHousing: string;
  homeNo: string;
  villageOrBuilding: string;
  floor: string;
  moo: string;
  soi: string;
  yak: string;
  road: string;
  country: string;
  subDistrict: string;
  postalCode: string;
  district: string;
  city: string;
}

export interface T1Card {
  cardNo: string;
  pointsBalance: number;
  pointsExpiryThisYear: number;
}

export interface T1NameInterface {
  en: string;
  th: string;
}

export interface T1Segment {
  segmentLevelID: string;
  segmentLevel: string;
  segmentLevelLongDesc: string;
  endDate: string;
}

export interface T1OnlineEmail {
  value: string;
  verified: boolean;
}

export interface T1OnlineMobile {
  country: string;
  value: string;
  verified: boolean;
}
