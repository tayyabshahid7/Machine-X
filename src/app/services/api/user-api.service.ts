import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MachineInterface } from '../../models/machine';
import { JoinWaitingListRequestDataInterface, ShopProfileInterface } from '../../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getShopProfile() {
    return this.httpClient.get<ShopProfileInterface>(`${environment.APIUrl}/shop/profile`);
  }

  joinWaitingList(data: JoinWaitingListRequestDataInterface) {
    return this.httpClient.post(`${environment.APIUrl}/join_waiting_list/`, data);
  }

  addMachineshopUser(machine: MachineInterface) {
    console.log(machine);
    const formData = new FormData();
    formData.append('username', machine.username);
    formData.append('email', machine.email);
    formData.append('password', machine.password);
    formData.append('companyLegalName', machine.companyLegalName);
    formData.append('country', machine.country);
    formData.append('termsAgreeIp', machine.termsAgreeIp);
    formData.append('legalBusinessName', machine.legalBusinessName);
    formData.append('einNumber', machine.einNumber);
    formData.append('doingBusinessAs', machine.doingBusinessAs);
    formData.append('addressLine1', machine.addressLine1);
    formData.append('addressLine2', machine.addressLine2);
    formData.append('city', machine.city);
    formData.append('zipCode', machine.zipCode);
    formData.append('businessPhoneNumber', machine.businessPhoneNumber);
    formData.append('industry', machine.industry);
    formData.append('businessWebsite', machine.businessWebsite);
    formData.append('representativeFirstName', machine.representativeFirstName);
    formData.append('representativeLastName', machine.representativeLastName);
    formData.append('representativeEmail', machine.representativeEmail);
    formData.append('representativeJobTitle', machine.representativeJobTitle);
    formData.append('representativeDob', machine.representativeDob);
    formData.append('representativeAddressLine1', machine.representativeAddressLine1);
    formData.append('representativeAddressLine2', machine.representativeAddressLine2);
    formData.append('representativeCity', machine.representativeCity);
    formData.append('representativeZip', machine.representativeZip);
    formData.append('representativePhoneNumber', machine.representativePhoneNumber);
    formData.append('representativeSsn', machine.representativeSsn);
    formData.append('businessOwners', JSON.stringify(machine.businessOwners));

    for (const file of machine.attachments) {
      formData.append('attachments', file);
    }
    formData.append('defaultPayoutType', machine.defaultPayoutType);
    formData.append('bank_account_number', machine.bank_account_number);
    formData.append('bank_account_routing_number', machine.bank_account_routing_number);
    formData.append('bank_account_currency', machine.bank_account_currency);
    formData.append('bank_account_bank_name', machine.bank_account_bank_name);
    formData.append('bank_account_holder_name', machine.bank_account_holder_name);
    formData.append('bank_account_address', machine.bank_account_address);
    formData.append('card_holder_name', machine.card_holder_name);
    formData.append('card_number', machine.card_number);
    formData.append('card_expiry_date', machine.card_expiry_date);
    formData.append('externalId', machine.externalId);
    formData.append('connectedAccountStatus', machine.connectedAccountStatus);

    return this.httpClient.post<MachineInterface>(`${environment.APIUrl}/shop/create`, formData);
  }
}
