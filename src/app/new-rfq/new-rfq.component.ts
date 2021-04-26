import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RfqInterface } from '../models/rfq.models';
import { RfqAPIService } from '../services/api/rfq-api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-new-rfq',
  templateUrl: './new-rfq.component.html',
  styleUrls: ['./new-rfq.component.css']
})
export class NewRFQComponent implements OnInit {
  pageSize = 11;
  currentPage = 1;
  rfqsCount = 0;
  rfqs: RfqInterface[] = null;
  rfqsPage: RfqInterface[] = [];
  searchKey: string;

  constructor(
    private notification: NzNotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private rfqsAPIService: RfqAPIService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.changePage(this.currentPage);
  }

  loadRFQs(page: number): Promise<void> {
    return new Promise<void>(((resolve, reject) => {
      this.spinner.show('rfqsSpinner');
      this.rfqsAPIService.listRFQs(
        {page, pageSize: this.pageSize},
        {searchKey: this.searchKey}
      ).subscribe(
        (rfqs) => {
          this.rfqsCount = rfqs.count;
          if (this.rfqs !== null) {
            this.rfqs.push(...rfqs.results);
          } else {
            this.rfqs = rfqs.results;
          }
          this.spinner.hide('rfqsSpinner');
          resolve();
        },
        (error) => {
          this.notification.error('Error loading rfqs', null);
          this.spinner.hide('rfqsSpinner');
          reject();
        }
      );
    }));
  }

  changePage(pageNumber: number) {
    const rangeStart = this.pageSize * (pageNumber - 1);
    const rangeEnd = this.rfqsCount ? Math.min(this.rfqsCount, this.pageSize * pageNumber) : this.pageSize * pageNumber;
    if (!this.rfqs || this.rfqs.length < rangeEnd) {
      this.loadRFQs(pageNumber).then(() => this.rfqsPage = this.rfqs.slice(rangeStart, rangeEnd));
    } else {
      this.rfqsPage = this.rfqs.slice(rangeStart, rangeEnd);
    }
  }

  searchRfqs() {
    this.rfqs = null;
    this.rfqsPage = [];
    this.changePage(1);
  }

  onSelect(rfq: RfqInterface) {
    this.router.navigate([`dashboard/newRFQ/details/${rfq.id}/${rfq.displayId}`]);
  }
}
