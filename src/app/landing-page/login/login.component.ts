import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passwordVisible:boolean=false;
  RememberMechecked:boolean=true;
  passwordString:String;
  constructor() { }

  ngOnInit(): void {
  }

}
