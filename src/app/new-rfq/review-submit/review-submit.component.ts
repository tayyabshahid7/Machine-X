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
import { MAX_PLATFORM_FEES, PLATFORM_FEES_PERCENTAGE } from '../../utilities/constants';
import { precisionRound } from '../../utilities/app.utilities';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.css']
})
export class ReviewSubmitComponent implements OnInit {
  rfqId: string;
  rfq: RfqInterface = null;
  form: FormGroup;
  platformFees: number;
  grandTotal: number;
  submitSuccess = false;

  constructor(
      private location: Location,
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

  rotateArrow(event): void {
    if (event.target.lastChild.classList.contains('arrow-up-down-rotate')) {
      event.target.lastChild.classList.remove('arrow-up-down-rotate');
    } else {
      event.target.lastChild.classList.add('arrow-up-down-rotate');
    }
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

  editQuote(): void {
    this.location.back();
  }

  setTotals() {
    const lineItemsTotal = this.form.value.lineItems.reduce((total, value) => total + (value.price * value.quantity), 0);
    const subtotal = this.form.controls.shippingRate.value + lineItemsTotal;
    const amountBeforeFees = subtotal + this.form.controls.tax.value;
    const feesByPercentage = amountBeforeFees * PLATFORM_FEES_PERCENTAGE;
    this.platformFees = precisionRound(Math.min(MAX_PLATFORM_FEES, feesByPercentage), 2);
    this.grandTotal = this.form.controls.tax.value + subtotal + this.platformFees;
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
        this.router.navigate(['dashboard/newRFQ/details/', this.rfq.id, this.rfq.displayId]);
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
          // this.router.navigate(['dashboard/submittedQuote']);
          this.submitSuccess = true;
        },
        errorResponse => {
          this.spinner.hide();
          this.errorHandlerService.setFormAPIErrors(this.form, errorResponse.error);
          this.bufferService.setBufferedItem(QUOTE_FORM_BUFFER_ITEM_KEY, this.form);
          this.notification.error('Error submitting quote', null);
          this.router.navigate([`dashboard/newRFQ/details/${this.rfq.id}/${this.rfq.displayId}/apply`]);
        }
    );
  }
}
