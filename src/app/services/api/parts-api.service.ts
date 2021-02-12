import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AddPartInputInterface, PartInterface } from '../../models/part.models';
import { PaginatedObjectInterface } from '../../models/general.models';

@Injectable({
  providedIn: 'root'
})
export class PartsAPIService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  listParts() {
    return this.httpClient.get<PaginatedObjectInterface<PartInterface>>(`${environment.APIUrl}/parts/list`);
  }

  getPart(partId: string) {
    return this.httpClient.get<PartInterface>(`${environment.APIUrl}/part/${partId}`);
  }

  addPart(partData: AddPartInputInterface) {
    const formData = new FormData();
    formData.append('name', partData.name);
    formData.append('number', partData.number);
    formData.append('notes', partData.notes);
    for (const file of partData.attachments) {
      formData.append('attachment', file);
    }
    return this.httpClient.post<PartInterface>(`${environment.APIUrl}/parts/add`, partData);
  }
}
