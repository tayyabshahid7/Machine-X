import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobInterface } from '../../models/job.models';
import { JobAPIService } from '../../services/api/job-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-working-job-details',
  templateUrl: './working-job-details.component.html',
  styleUrls: ['./working-job-details.component.css']
})
export class WorkingJobDetailsComponent implements OnInit {
  job: JobInterface = null;
  shippingForm: FormGroup;
  showChat: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private modal: NzModalService,
    private router: Router,
    private jobAPIService: JobAPIService,
    private notification: NzNotificationService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private errorHandlerService: ErrorHandlerService,
  ) {
  }

  history = false;
  dateFormat = 'MM/dd/yyyy';
  date = null;
  show: boolean = false;
  isShippingModalVisible = false;


  showShippingModal(): void {
    this.isShippingModalVisible = true;
  }

  showCloseChat(showChat: boolean) {
    this.showChat = showChat;
  }

  submitShippingForm(): void {
    if (this.shippingForm.valid) {
      this.spinner.show();
      this.jobAPIService.addShipment({
        job: this.job.id,
        ...this.shippingForm.value
      }).subscribe(
        response => {
          this.notification.success('Shipped', null);
          this.loadJob(this.job.id);
          this.spinner.hide();
          this.isShippingModalVisible = false;
        },
        errorResponse => {
          this.notification.error('Error', null);
          this.errorHandlerService.setFormAPIErrors(this.shippingForm, errorResponse.error);
        }
      );
    }
  }

  cancelShipping(): void {
    this.isShippingModalVisible = false;
  }

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('jobId');
    this.loadJob(jobId);
    this.shippingForm = this.formBuilder.group({
      company: [null, [Validators.required, Validators.maxLength(100)]],
      trackingId: [null, [Validators.required, Validators.maxLength(100)]],
      status: [null, [Validators.required, Validators.maxLength(20)]],
    });
  }

  loadJob(jobId: string) {
    this.spinner.show();
    this.jobAPIService.getJob(jobId).subscribe(
      job => {
        this.job = job;
        this.spinner.hide();
      },
      error => {
        // TODO: review how to show error here
        this.notification.error('Error loading job', null);
        this.spinner.hide();
        this.router.navigate(['/dashboard/WorkingJobs']);
      }
    );
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
    this.router.navigate(['/dashboard/submittedQuoteInvoice/:status/invoice']);
  }

  openInvoice() {
    this.router.navigate([`/dashboard/submittedQuoteInvoice/${this.job.quote.id}/invoice`]);
  }

  showHistory() {
    this.history = true;
  }

  hideHistory() {
    this.history = false;
  }

}
