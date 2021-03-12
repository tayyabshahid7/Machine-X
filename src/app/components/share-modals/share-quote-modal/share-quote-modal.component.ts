import { Component, Input, OnInit } from '@angular/core';
import { ShareModalBaseComponent } from '../share-modal-base.component';
import { FormBuilder } from '@angular/forms';
import { QuoteAPIService } from '../../../services/api/quote-api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-share-quote-modal',
  templateUrl: './../share-modal-base.component.html',
  styleUrls: ['./../share-modal-base.component.css']
})
export class ShareQuoteModalComponent extends ShareModalBaseComponent implements OnInit {
  @Input() quoteId: string;
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
    this.quoteAPIService.shareQuote(this.quoteId, emails, notes).subscribe(
      res => {
        this.notification.success('Quote Shared', null);
        this.actionAfterSuccess(res);
        document.getElementById('closeShareModalBtn').click();
      },
      error => {
        this.notification.error('Error sharing quotes', null);
        this.setErrors(error.error);
      }
    );
  }
}
