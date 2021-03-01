import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../services/error-handler.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserAPIService } from '../services/api/user-api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  form: FormGroup;
  joinSuccessful: boolean = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userAPIService: UserAPIService,
    private notification: NzNotificationService,
    private errorHandlerService: ErrorHandlerService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      company: ['', [Validators.required, Validators.maxLength(100)]],
      isMachineShop: [true],
    });
  }

  joinWaitingList() {
    if (this.form.valid) {
      this.loading = true;
      this.spinner.show();
      const formData = {
        ...this.form.value,
        userType: this.form.value.isMachineShop === true ? 'cx_user_shop' : 'cx_user_engineer'
      };
      delete formData.isMachineShop;
      this.userAPIService.joinWaitingList(formData).subscribe(
        success => {
          this.form.reset();
          this.spinner.hide();
          this.joinSuccessful = true;
          this.loading = false;
        },
        error => {
          // TODO: review how to show error here
          this.spinner.hide();
          this.errorHandlerService.setFormAPIErrors(this.form, error.error);
          this.notification.error('Error while joining list', null);
          this.loading = false;
        }
      );
    }
  }
}
