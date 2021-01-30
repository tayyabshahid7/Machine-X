import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quote-invoice-submitted',
  templateUrl: './quote-invoice-submitted.component.html',
  styleUrls: ['./quote-invoice-submitted.component.css']
})
export class QuoteInvoiceSubmittedComponent implements OnInit {

  tableData=[
    {
      'id':'1',
      'name':'itemName',
      'quantity':12,
      'cost':90,
    }, {
     'id':'2',
     'name':'itemName',
     'quantity':1,
     'cost':200,
   }, {
     'id':'3',
     'name':'itemName',
     'quantity':1,
     'cost':90,
   }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  receivers=[];
  addEmail(){
    this.receivers.push(1);
  }
  removeEmail(){
    this.receivers.pop();
  }
}
