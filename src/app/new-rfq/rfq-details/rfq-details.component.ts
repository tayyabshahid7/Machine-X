import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rfq-details',
  templateUrl: './rfq-details.component.html',
  styleUrls: ['./rfq-details.component.css']
})
export class RfqDetailsComponent implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }
  apply(){
    this.router.navigate(['dashboard/newRFQ/details/apply']);
  }
}
