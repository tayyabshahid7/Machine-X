import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  passwordVisible = false;
  RememberMechecked = true;
  passwordString: string;
  constructor( private formBuilder: FormBuilder,
               private authenticationService: AuthenticationService,
               private router: Router,
               private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [true, Validators.required],
    });
  }
  login() {
    alert('sdsdsdsds');
    // this.formSubmitted = true;
    if (this.form.valid) {
      const {email, password, rememberMe} = this.form.value;
      this.authenticationService.login(email, password, rememberMe).subscribe(
          success => this.router.navigateByUrl('/dashboard/home'),
          error => {
            // TODO: review how to show error here
            this.notification.error('Error while logging in', 'Wrong email or password');
          }
      );
    }
  }
}
