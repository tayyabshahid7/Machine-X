import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RfqAPIService } from '../../services/api/rfq-api.service';
import { JobAPIService } from '../../services/api/job-api.service';
import { QuoteAPIService } from '../../services/api/quote-api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobIssueInterface, JobsCountInterface } from '../../models/job.models';
import { RfqInterface } from '../../models/rfq.models';
import { TransactionInterface } from '../../models/quote.models';
import { Observable } from 'rxjs';
import { ShopProfileInterface } from '../../models/user.models';
import { getUser } from '../../store/user/user.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  shop$: Observable<ShopProfileInterface>;
  jobsCounts: Array<JobsCountInterface> = [];
  rfqs: Array<RfqInterface> = [];
  transactions: Array<TransactionInterface> = [];
  jobsIssues: Array<JobIssueInterface> = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private rfqAPIService: RfqAPIService,
    private jobAPIService: JobAPIService,
    private quoteAPIService: QuoteAPIService,
    private notification: NzNotificationService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.shop$ = this.store.select(getUser);
    this.loadJobsCounts();
    this.loadRfqs();
    this.loadTransactions();
    this.loadJobsIssues();
  }

  loadJobsCounts() {
    this.spinner.show('jobsCountsSpinner');
    this.jobAPIService.getJobsCount().subscribe(
      response => {
        this.jobsCounts = response;
        this.spinner.hide('jobsCountsSpinner');
      },
      errorResponse => {
        this.notification.error('Error loading jobs information', null);
        this.spinner.hide('jobsCountsSpinner');
      }
    );
  }

  loadRfqs() {
    this.spinner.show('rfqsSpinner');
    this.rfqAPIService.listRFQs({pageSize: 3, page: 1}, {searchKey: null}).subscribe(
      response => {
        this.rfqs = response.results;
        this.spinner.hide('rfqsSpinner');
      },
      errorResponse => {
        this.notification.error('Error loading RFQs information', null);
        this.spinner.hide('rfqsSpinner');
      }
    );
  }

  loadTransactions() {
    this.spinner.show('transactionsSpinner');
    this.quoteAPIService.listTransactions({pageSize: 4, page: 1}, {searchKey: null}).subscribe(
      response => {
        this.transactions = response.results;
        this.spinner.hide('transactionsSpinner');
      },
      errorResponse => {
        this.notification.error('Error loading RFQs information', null);
        this.spinner.hide('transactionsSpinner');
      }
    );
  }

  loadJobsIssues() {
    this.spinner.show('jobsIssuesSpinner');
    this.jobAPIService.listJobsIssues({pageSize: 3, page: 1}, {searchKey: null}).subscribe(
      response => {
        this.jobsIssues = response.results;
        this.spinner.hide('jobsIssuesSpinner');
      },
      errorResponse => {
        this.notification.error('Error loading RFQs information', null);
        this.spinner.hide('jobsIssuesSpinner');
      }
    );
  }


  viewJobs() {
    this.router.navigate(['dashboard/WorkingJobs']);
  }

  viewRFQ() {
    this.router.navigate(['dashboard/newRFQ']);
  }

  viewTransactions() {
    this.router.navigate(['dashboard/transactions']);
  }

  convertSecondsToDays(seconds) {
    const days = (seconds / (24 * 3600)).toFixed(0);
    if (Number(days) > 0) {
      return (seconds / (24 * 3600)).toFixed(0);
    }else{
      return '';
    }
  }
}
