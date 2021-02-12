import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.css']
})
export class ReviewSubmitComponent implements OnInit {
  tableData = [
    {
      id: '1',
      name: 'itemName',
      quantity: 12,
      cost: 90,
    }, {
     id: '2',
     name: 'itemName',
     quantity: 1,
     cost: 200,
   }, {
     id: '3',
     name: 'itemName',
     quantity: 1,
     cost: 90,
   }
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  backToNewRFQ(){
    console.log('Cancel');
    this.router.navigate(['dashboard/newRFQ']);
  }
}
