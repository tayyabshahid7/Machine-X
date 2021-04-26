import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { QuoteAPIService } from '../../services/api/quote-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransactionInterface } from '../../models/quote.models';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  pageSize = 11;
  currentPage = 1;
  transactionsCount = 0;
  transactions: TransactionInterface[] = null;
  transactionsPage: TransactionInterface[] = [];
  searchKey: string;

  switchValue = true;

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

  loadTransactions(page: number): Promise<void> {
    return new Promise<void>(((resolve, reject) => {
      this.spinner.show();
      this.quoteAPIService.listTransactions(
        {page, pageSize: this.pageSize},
        {searchKey: this.searchKey}
      ).subscribe(
        (transactions) => {
          this.transactionsCount = transactions.count;
          if (this.transactions !== null) {
            this.transactions.push(...transactions.results);
          } else {
            this.transactions = transactions.results;
          }
          this.spinner.hide();
          resolve();
        },
        (error) => {
          this.notification.error('Error loading transactions', null);
          this.spinner.hide();
          reject();
        }
      );
    }));
  }

  changePage(pageNumber: number) {
    const rangeStart = this.pageSize * (pageNumber - 1);
    const rangeEnd = this.transactionsCount ? Math.min(this.transactionsCount, this.pageSize * pageNumber) : this.pageSize * pageNumber;
    if (!this.transactions || this.transactions.length < rangeEnd) {
      this.loadTransactions(pageNumber).then(() => this.transactionsPage = this.transactions.slice(rangeStart, rangeEnd));
    } else {
      this.transactionsPage = this.transactions.slice(rangeStart, rangeEnd);
    }
  }

  searchTransactions() {
    this.transactions = null;
    this.transactionsPage = [];
    this.changePage(1);
  }

  onSelect(transaction: TransactionInterface) {
    this.router.navigate(['dashboard/transactions/receipt', transaction.quote, transaction.jobDisplayId]);
  }

  handelData() {
    this.switchValue = !this.switchValue;
  }

  transferDone() {
    this.notification.success('Transer Initiated',
      'Transfers are reviewed which may result in delays or fund begin frozen or removed from your account');
  }

}
