import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  passwordVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private notification: NzNotificationService,
    private errorHandlerService: ErrorHandlerService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false, Validators.required],
    });
  }

  login() {
    // this.formSubmitted = true;
    if (this.form.valid) {
      const {email, password, rememberMe} = this.form.value;
      this.authenticationService.login(email, password, rememberMe).subscribe(
        success => this.router.navigateByUrl('/dashboard/home'),
        error => {
          // TODO: review how to show error here
          this.errorHandlerService.setFormAPIErrors(this.form, error.error);
          this.notification.error('Error while logging in', 'Wrong email or password');
        }
      );
    }
  }
}
