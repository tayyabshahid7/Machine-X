import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  subscription = false;
  constructor() { }

  ngOnInit(): void {
  }
  FinishSubscription(){
    this.subscription = !this.subscription;
    console.log(this.subscription);
  }

}
