import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BufferService } from '../../services/buffer.service';
import { QUOTE_FORM_BUFFER_ITEM_KEY } from '../generate-quote/generate-quote.component';
import { RfqInterface } from '../../models/rfq.models';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RfqAPIService } from '../../services/api/rfq-api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup } from '@angular/forms';
import { QuoteAPIService } from '../../services/api/quote-api.service';
import { AddQuoteDataInterface } from '../../models/quote.models';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.css']
})
export class ReviewSubmitComponent implements OnInit {
  rfqId: string;
  rfq: RfqInterface = null;
  form: FormGroup;
  grandTotal: number;

  constructor(
    private route: ActivatedRoute,
    private modal: NzModalService,
    private router: Router,
    private rfqAPIService: RfqAPIService,
    private quoteAPIService: QuoteAPIService,
    private notification: NzNotificationService,
    private spinner: NgxSpinnerService,
    protected bufferService: BufferService,
    protected errorHandlerService: ErrorHandlerService,
  ) {
  }

  ngOnInit(): void {
    const rfqFormBuffer = this.bufferService.getBufferItem(QUOTE_FORM_BUFFER_ITEM_KEY);
    if (rfqFormBuffer) {
      this.form = rfqFormBuffer;
      this.setTotals();
    } else {
      this.router.navigateByUrl('/dashboard/newRFQ');
    }
    this.loadRfq();
  }

  loadRfq() {
    this.spinner.show();
    const rfqId = this.route.snapshot.paramMap.get('rfqId');
    this.rfqAPIService.getRfq(rfqId).subscribe(
      rfq => {
        this.rfq = rfq;
        this.spinner.hide();
      },
      error => {
        // TODO: review how to show error here
        this.notification.error('Error loading rfq', null);
        this.spinner.hide();
        this.router.navigate(['/dashboard/RFQ']);
      }
    );
  }

  setTotals() {
    const lineItemsTotal = this.form.value.lineItems.reduce((total, value) => total + (value.price * value.quantity), 0);
    const subtotal = this.form.controls.shippingRate.value + lineItemsTotal;
    this.grandTotal = this.form.controls.tax.value + subtotal;
  }


  showDeleteConfirm(): void {
    this.modal.confirm({
      nzStyle: {top: '40%'},
      nzTitle: '<b>Do you want to discard this item?</b>',
      nzContent: '<p style="color: #595959;">All of the information you added will be lost</p>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.bufferService.deleteBufferItem(QUOTE_FORM_BUFFER_ITEM_KEY);
        this.router.navigate(['dashboard/newRFQ/details/', this.rfq.id]);
      },
      nzCancelText: 'Cancel',
      nzOnCancel: () => {
      },
      nzMaskStyle: {background: 'rgb(0, 39, 102, 0.9)'}
    });
  }


  submitQuote() {
    this.spinner.show();
    const quoteData: AddQuoteDataInterface = {
      requestQuote: this.rfq.id,
      ...this.form.value
    };
    this.quoteAPIService.addQuote(quoteData).subscribe(
      response => {
        this.spinner.hide();
        this.bufferService.deleteBufferItem(QUOTE_FORM_BUFFER_ITEM_KEY);
        this.notification.success('Quote submitted successfully', null);
        this.router.navigate(['dashboard/submittedQuote']);
      },
      errorResponse => {
        this.spinner.hide();
        this.errorHandlerService.setFormAPIErrors(this.form, errorResponse.error);
        this.bufferService.setBufferedItem(QUOTE_FORM_BUFFER_ITEM_KEY, this.form);
        this.notification.error('Error submitting quote', null);
        this.router.navigate(['dashboard/newRFQ/details/', this.rfq.id, 'apply']);
      }
    );
  }
}
