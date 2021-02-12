import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {
  passwordVisible = false;
  RememberMechecked = true;
  resetPassword = false;
  constructor() { }

  ngOnInit(): void {
  }


  resetPass(){
    this.resetPassword = !this.resetPassword;
  }
}
