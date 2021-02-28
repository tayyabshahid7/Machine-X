import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuoteAPIService } from '../services/api/quote-api.service';
import { RfqInterface } from '../models/rfq.models';
import { QuoteInterface } from '../models/quote.models';

@Component({
  selector: 'app-submitted-quote',
  templateUrl: './submitted-quote.component.html',
  styleUrls: ['./submitted-quote.component.css']
})
export class SubmittedQuoteComponent implements OnInit {
  pageSize = 11;
  currentPage = 1;
  submittedQuotesCount = 0;
  approvedSubmittedQuotesCount = 0;
  submittedQuotes: QuoteInterface[] = null;
  submittedQuotesPage: QuoteInterface[] = [];
  searchKey: string;

  constructor(
    private notification: NzNotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private quoteAPIService: QuoteAPIService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.changePage(this.currentPage);
  }

  loadSubmittedQuotes(page: number): Promise<void> {
    return new Promise<void>(((resolve, reject) => {
      this.spinner.show('submittedQuotesSpinner');
      this.quoteAPIService.listSubmittedQuotes(
        {page, pageSize: this.pageSize},
        {searchKey: this.searchKey}
      ).subscribe(
        (submittedQuotes) => {
          this.submittedQuotesCount = submittedQuotes.count;
          this.approvedSubmittedQuotesCount = submittedQuotes.results.filter(q => q.status === 'approved').length;
          if (this.submittedQuotes !== null) {
            this.submittedQuotes.push(...submittedQuotes.results);
          } else {
            this.submittedQuotes = submittedQuotes.results;
          }
          this.spinner.hide('submittedQuotesSpinner');
          resolve();
        },
        (error) => {
          this.notification.error('Error loading submittedQuotes', null);
          this.spinner.hide('submittedQuotesSpinner');
          reject();
        }
      );
    }));
  }

  changePage(pageNumber: number) {
    const rangeStart = this.pageSize * (pageNumber - 1);
    const rangeEnd = this.submittedQuotesCount ? Math.min(this.submittedQuotesCount, this.pageSize * pageNumber) : this.pageSize * pageNumber;
    if (!this.submittedQuotes || this.submittedQuotes.length < rangeEnd) {
      this.loadSubmittedQuotes(pageNumber).then(() => this.submittedQuotesPage = this.submittedQuotes.slice(rangeStart, rangeEnd));
    } else {
      this.submittedQuotesPage = this.submittedQuotes.slice(rangeStart, rangeEnd);
    }
  }

  searchSubmittedQuotes() {
    this.submittedQuotes = null;
    this.submittedQuotesPage = [];
    this.changePage(1);
  }

  onSelect(rfq: RfqInterface) {
    this.router.navigate([`dashboard/submittedQuote/details/${rfq.id}`]);
  }

}
