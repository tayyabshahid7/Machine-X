import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuoteAPIService } from '../../services/api/quote-api.service';
import { QuotLogInterface } from '../../models/quote.models';

@Component({
  selector: 'app-quote-history',
  templateUrl: './quote-history.component.html',
  styleUrls: ['./quote-history.component.css']
})
export class QuoteHistoryComponent implements OnInit {
  @Input() quoteId: string;
  historyLogs: Array<QuotLogInterface> = [];

  constructor(
    private quoteAPIService: QuoteAPIService,
    private notification: NzNotificationService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    if (!this.quoteId) {
      throw Error('History component requires quoteId to function.');
    }
    this.loadLogs(this.quoteId);
  }

  loadLogs(quoteId: string) {
    this.spinner.show();
    this.quoteAPIService.getQuoteHistory(quoteId).subscribe(
      response => {
        this.historyLogs = response.logs;
        this.spinner.hide();
      },
      errorResponse => {
        this.spinner.hide();
        this.notification.error('Error while retrieving history', 'Please try again later or contact support');
      }
    );
  }

}
