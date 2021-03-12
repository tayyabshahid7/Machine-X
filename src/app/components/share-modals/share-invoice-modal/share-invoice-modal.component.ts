import { Component, Input, OnInit } from '@angular/core';
import { ShareModalBaseComponent } from '../share-modal-base.component';
import { FormBuilder } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { QuoteAPIService } from '../../../services/api/quote-api.service';

@Component({
  selector: 'app-share-invoice-modal',
  templateUrl: './../share-modal-base.component.html',
  styleUrls: ['./../share-modal-base.component.css']
})
export class ShareInvoiceModalComponent extends ShareModalBaseComponent implements OnInit {
  @Input() paymentId: string;
  receivers = [];

  constructor(
    formBuilder: FormBuilder,
    private quoteAPIService: QuoteAPIService,
    private notification: NzNotificationService,
  ) {
    super(formBuilder);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  share() {
    const {emails, notes} = this.form.value;
    this.quoteAPIService.shareInvoice(this.paymentId, emails, notes).subscribe(
      res => {
        this.notification.success('Invoice Shared', null);
        this.actionAfterSuccess(res);
        document.getElementById('closeShareModalBtn').click();
      },
      error => {
        this.notification.error('Error sharing ivoice', null);
        this.setErrors(error.error);
      }
    );
  }
}
