import { AttachmentInterface } from './general.models';

export interface JoinWaitingListRequestDataInterface {
  email: string;
  name: string;
  company: string;
  userType: string;
}

export interface BusinessOwnerInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  confirmed: boolean;
  shop: string;
}

export interface ShopProfileInterface {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  businessOwners: BusinessOwnerInterface[];
  attachments: Array<AttachmentInterface>;
  companyLegalName: string;
  country: string;
  termsAgreeDatetime?: any;
  termsAgreeIp: string;
  legalBusinessName: string;
  einNumber: string;
  doingBusinessAs: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state?: any;
  zipCode: string;
  businessPhoneNumber: string;
  industry: string;
  businessWebsite: string;
  defaultPayoutType: string;
  bankAccountHolderName: string;
  bankAccountNumber: string;
  bankAccountRoutingNumber: string;
  bankAccountCurrency: string;
  bankAccountBankName: string;
  bankAccountAddress: string;
  cardHolderName: string;
  cardNumber: string;
  cardExpiryDate: string;
  representativeFirstName: string;
  representativeLastName: string;
  representativeEmail: string;
  representativeJobTitle: string;
  representativeDob: string;
  representativeAddressLine1: string;
  representativeAddressLine2: string;
  representativeCity: string;
  representativeState?: any;
  representativeZip: string;
  representativePhoneNumber: string;
  representativeSsn: string;
  externalId: string;
  connectedAccountStatus: string;
}


export interface PayoutDataInterface {
  bankAccountHolderName: string;
  bankAccountNumber: string;
  bankAccountRoutingNumber: string;
  bankAccountCurrency: string;
  bankAccountBankName: string;
  bankAccountAddress: string;
  cardHolderName: string;
  cardNumber: string;
  cardExpiryDate: string;
}

