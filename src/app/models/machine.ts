import { AttachmentInterface } from './general.models';

export interface MachineInterface {

    username: string;
    email: string;
    password: string;
    companyLegalName: string;
    country: string;
    termsAgreeIp: string;
    legalBusinessName: string;
    einNumber: string;
    doingBusinessAs: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    zipCode: string;
    businessPhoneNumber: string;
    industry: string;
    businessWebsite: string;
    representativeFirstName: string;
    representativeLastName: string;
    representativeEmail: string;
    representativeJobTitle: string;
    representativeDob: string;
    representativeAddressLine1: string;
    representativeAddressLine2: string;
    representativeCity: string;
    representativeZip: string;
    representativePhoneNumber: string;
    representativeSsn: string;
    businessOwners: BusinessOwnersInterface[];
    attachments: [];
    defaultPayoutType: string;
    bank_account_number: string;
    bank_account_routing_number: string;
    bank_account_currency: string;
    bank_account_bank_name: string;
    bank_account_holder_name: string;
    bank_account_address: string;
    card_holder_name: string;
    card_number: string;
    card_expiry_date: string;
    externalId: string;
    connectedAccountStatus: string;

}

export interface BusinessOwnersInterface {
    email: string;
    firstName: string;
    lastName: string;
}
