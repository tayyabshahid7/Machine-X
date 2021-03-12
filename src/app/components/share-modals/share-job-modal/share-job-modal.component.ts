import { Component, Input, OnInit } from '@angular/core';
import { ShareModalBaseComponent } from '../share-modal-base.component';
import { FormBuilder } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { JobAPIService } from '../../../services/api/job-api.service';

@Component({
  selector: 'app-share-job-modal',
  templateUrl: './../share-modal-base.component.html',
  styleUrls: ['./../share-modal-base.component.css']
})
export class ShareJobModalComponent extends ShareModalBaseComponent implements OnInit {
  @Input() jobId: string;
  receivers = [];

  constructor(
    formBuilder: FormBuilder,
    private jobAPIService: JobAPIService,
    private notification: NzNotificationService,
  ) {
    super(formBuilder);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  share() {
    const {emails, notes} = this.form.value;
    this.jobAPIService.shareJobDetails(this.jobId, emails, notes).subscribe(
      res => {
        this.notification.success('Job details Shared', null);
        this.actionAfterSuccess(res);
        document.getElementById('closeShareModalBtn').click();
      },
      error => {
        this.notification.error('Error sharing job details', null);
        this.setErrors(error.error);
      }
    );
  }
}
