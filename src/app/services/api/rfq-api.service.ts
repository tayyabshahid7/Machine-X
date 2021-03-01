import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginatedObjectInterface, PaginatedRequestInterface } from '../../models/general.models';
import { environment } from '../../../environments/environment';
import { RfqInterface } from '../../models/rfq.models';

@Injectable({
  providedIn: 'root'
})
export class RfqAPIService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  listRFQs(pageOptions: PaginatedRequestInterface, searchOptions: { searchKey: string }) {
    const queryParams = [];
    const paginationParams = `page_size=${pageOptions.pageSize}&page=${pageOptions.page}`;
    queryParams.push(paginationParams);
    if (searchOptions.searchKey) {
      const filterParams = `name_icontains=${searchOptions.searchKey}`;
      queryParams.push(filterParams);
    }
    return this.httpClient.get<PaginatedObjectInterface<RfqInterface>>(`${environment.APIUrl}/request_quote/list?${queryParams.join('&')}`);
  }

  getRfq(RfqId: string) {
    return this.httpClient.get<RfqInterface>(`${environment.APIUrl}/request_quote/${RfqId}`);
  }

}
