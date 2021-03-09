import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PaginatedObjectInterface, PaginatedRequestInterface } from '../../models/general.models';
import { JobInterface, JobIssueInterface, JobsCountInterface } from '../../models/job.models';

@Injectable({
  providedIn: 'root'
})
export class JobAPIService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  startJob(quoteId: string) {
    return this.httpClient.post(`${environment.APIUrl}/returned_quote/start_job`, {quote: quoteId});
  }

  listJobs(pageOptions: PaginatedRequestInterface, searchOptions: { searchKey: string }) {
    const queryParams = [];
    const paginationParams = `page_size=${pageOptions.pageSize}&page=${pageOptions.page}`;
    queryParams.push(paginationParams);
    if (searchOptions.searchKey) {
      const filterParams = `name_icontains=${searchOptions.searchKey}`;
      queryParams.push(filterParams);
    }
    return this.httpClient.get<PaginatedObjectInterface<JobInterface>>(`${environment.APIUrl}/job/list?${queryParams.join('&')}`);
  }

  listJobsIssues(pageOptions: PaginatedRequestInterface, searchOptions: { searchKey: string }) {
    const queryParams = [];
    const paginationParams = `page_size=${pageOptions.pageSize}&page=${pageOptions.page}`;
    queryParams.push(paginationParams);
    if (searchOptions.searchKey) {
      const filterParams = `name_icontains=${searchOptions.searchKey}`;
      queryParams.push(filterParams);
    }
    return this.httpClient.get<PaginatedObjectInterface<JobIssueInterface>>(`${environment.APIUrl}/jobs/issues?${queryParams.join('&')}`);
  }

  getJob(jobId: string) {
    return this.httpClient.get<JobInterface>(`${environment.APIUrl}/job/${jobId}`);
  }

  getJobsCount() {
    return this.httpClient.get<Array<JobsCountInterface>>(`${environment.APIUrl}/job/counts`);
  }

  addShipment(data: { job: string; company: string; trackingId: string; status: string; }) {
    return this.httpClient.post(`${environment.APIUrl}/job/add_shipment`, data);
  }
}
