import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RfqAPIService } from '../../services/api/rfq-api.service';
import { RfqInterface } from '../../models/rfq.models';

@Component({
  selector: 'app-rfq-details',
  templateUrl: './rfq-details.component.html',
  styleUrls: ['./rfq-details.component.css']
})
export class RfqDetailsComponent implements OnInit {
  rfqId: string;
  rfq: RfqInterface = null;

  constructor(
    private route: ActivatedRoute,
    private modal: NzModalService,
    private router: Router,
    private rfqAPIService: RfqAPIService,
    private notification: NzNotificationService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.rfqId = this.route.snapshot.paramMap.get('rfqId');
    this.loadRfq();
  }

  loadRfq() {
    this.spinner.show('rfqSpinner');
    this.rfqAPIService.getRfq(this.rfqId).subscribe(
      rfq => {
        this.rfq = rfq;
        this.spinner.hide('rfqSpinner');
      },
      error => {
        // TODO: review how to show error here
        this.notification.error('Error loading rfq', null);
        this.spinner.hide('rfqSpinner');
        this.router.navigate(['/dashboard/RFQ']);
      }
    );
  }

  apply() {
    if (this.rfq.status === 'accepting_quotes'){
      this.router.navigate([`dashboard/newRFQ/details/${this.rfq.id}/apply`]);
    }
  }
}
