import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuoteAPIService } from '../../../services/api/quote-api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ShareModalBaseComponent } from '../share-modal-base.component';

@Component({
  selector: 'app-share-receipt-modal',
  templateUrl: './../share-modal-base.component.html',
  styleUrls: ['./../share-modal-base.component.css']
})
export class ShareReceiptModalComponent extends ShareModalBaseComponent implements OnInit {
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
    this.quoteAPIService.shareReceipt(this.paymentId, emails, notes).subscribe(
      res => {
        this.notification.success('Receipt Shared', null);
        this.actionAfterSuccess(res);
        document.getElementById('closeShareModalBtn').click();
      },
      error => {
        this.notification.error('Error sharing receipt', null);
        this.setErrors(error.error);
      }
    );
  }
}
