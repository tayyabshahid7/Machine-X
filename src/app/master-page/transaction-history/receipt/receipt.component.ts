import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  constructor() { }


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

  receivers = [];

  ngOnInit(): void {
  }
  addEmail(){
    this.receivers.push(1);
  }
  removeEmail(){
    this.receivers.pop();
  }


}
