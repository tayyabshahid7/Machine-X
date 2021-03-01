import { Component, OnInit } from '@angular/core';
import { formatDistance } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuoteAPIService } from '../../services/api/quote-api.service';
import { QuoteInterface } from '../../models/quote.models';
import { RfqInterface } from '../../models/rfq.models';
import { RfqAPIService } from '../../services/api/rfq-api.service';
import { JobAPIService } from '../../services/api/job-api.service';

@Component({
  selector: 'app-submitted-details',
  templateUrl: './submitted-details.component.html',
  styleUrls: ['./submitted-details.component.css']
})
export class SubmittedDetailsComponent implements OnInit {
  rfq: RfqInterface = null;
  quote: QuoteInterface = null;

  constructor(
    private route: ActivatedRoute,
    private modal: NzModalService,
    private router: Router,
    private rfqAPIService: RfqAPIService,
    private quoteAPIService: QuoteAPIService,
    private jobAPIService: JobAPIService,
    private notification: NzNotificationService,
    private spinner: NgxSpinnerService
  ) {
  }

  data: any[] = [];
  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  inputValue = '';
  titleValue = '';
  // openInvoice(){
  //   this.router.navigate(['/dashboard/Jobs/invoice']);
  // }
  issue = false;

  ngOnInit(): void {
    const quoteId = this.route.snapshot.paramMap.get('quoteId');
    this.loadQuote(quoteId);

  }

  loadQuote(quoteId: string) {
    this.spinner.show('quoteSpinner');
    this.quoteAPIService.getQuote(quoteId).subscribe(
      quote => {
        this.quote = quote;
        this.rfqAPIService.getRfq(this.quote.requestQuote).subscribe(rfq => {
            this.rfq = rfq;
            this.spinner.hide('quoteSpinner');
          },
          error => {
            this.notification.error('Error loading rfq', null);
            this.spinner.hide('quoteSpinner');
            this.router.navigate(['/dashboard/submittedQuote']);
          });
      },
      error => {
        // TODO: review how to show error here
        this.notification.error('Error loading quote', null);
        this.spinner.hide('quoteSpinner');
        this.router.navigate(['/dashboard/submittedQuote']);
      }
    );
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    const title = this.titleValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.data = [
        ...this.data,
        {
          ...this.user,
          title,
          content,
          datetime: new Date(),
          displayTime: formatDistance(new Date(), new Date())
        }
      ].map(e => {
        return {
          ...e,
          displayTime: formatDistance(new Date(), e.datetime)
        };
      });
    }, 800);
  }


  startIssue() {
    this.issue = true;
  }

  cancelIssue() {
    this.issue = false;
  }

  showArchive(): void {
    this.modal.error({
      nzStyle: {top: '40%'},
      nzTitle: '<b>Do you want to archive this ?</b>',
      nzContent: '<p style="color: #595959;">All of the information you added will be lost</p>',
      nzOkText: 'Archive',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.router.navigate(['/dashboard/submittedQuote']);
      },
      nzCancelText: 'Cancel',
      nzOnCancel: () => {

      },
      nzMaskStyle: {background: 'rgb(0, 39, 102, 0.9)'}
    });
  }

  close() {
    this.router.navigate(['/dashboard/submittedQuote']);
  }

  startJob() {
    if (this.quote.status === 'approved') {
      this.jobAPIService.startJob(this.quote.id).subscribe(
        response => {
          this.router.navigate(['/dashboard/submittedQuote/details/', this.quote.id, 'invoice']);
          this.spinner.hide('quoteSpinner');
        },
        errorResponse => {
          this.notification.error('Error starting job', null);
          this.spinner.hide('quoteSpinner');
        }
      );
    }
  }
}
