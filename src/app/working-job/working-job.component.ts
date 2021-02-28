import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobAPIService } from '../services/api/job-api.service';
import { JobInterface } from '../models/job.models';

@Component({
  selector: 'app-working-job',
  templateUrl: './working-job.component.html',
  styleUrls: ['./working-job.component.css']
})
export class WorkingJobComponent implements OnInit {
  pageSize = 11;
  currentPage = 1;
  jobsCount = 0;
  jobs: JobInterface[] = null;
  jobsPage: JobInterface[] = [];
  searchKey: string;

  constructor(
    private notification: NzNotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private jobAPIService: JobAPIService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.changePage(this.currentPage);
  }

  loadjobs(page: number): Promise<void> {
    return new Promise<void>(((resolve, reject) => {
      this.spinner.show('jobsSpinner');
      this.jobAPIService.listJobs(
        {page, pageSize: this.pageSize},
        {searchKey: this.searchKey}
      ).subscribe(
        (jobs) => {
          this.jobsCount = jobs.count;
          if (this.jobs !== null) {
            this.jobs.push(...jobs.results);
          } else {
            this.jobs = jobs.results;
          }
          this.spinner.hide('jobsSpinner');
          resolve();
        },
        (error) => {
          this.notification.error('Error loading jobs', null);
          this.spinner.hide('jobsSpinner');
          reject();
        }
      );
    }));
  }

  changePage(pageNumber: number) {
    const rangeStart = this.pageSize * (pageNumber - 1);
    const rangeEnd = this.jobsCount ? Math.min(this.jobsCount, this.pageSize * pageNumber) : this.pageSize * pageNumber;
    if (!this.jobs || this.jobs.length < rangeEnd) {
      this.loadjobs(pageNumber).then(() => this.jobsPage = this.jobs.slice(rangeStart, rangeEnd));
    } else {
      this.jobsPage = this.jobs.slice(rangeStart, rangeEnd);
    }
  }

  searchjobs() {
    this.jobs = null;
    this.jobsPage = [];
    this.changePage(1);
  }

  onSelect(job: JobInterface) {
    this.router.navigate([`dashboard/WorkingJobs/details/${job.id}`]);
  }

}
