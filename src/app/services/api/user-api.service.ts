import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EngineerProfileInterface } from '../../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getEngineerProfile() {
    return this.httpClient.get<EngineerProfileInterface>(`${environment.APIUrl}/engineer/profile`);
  }
}
