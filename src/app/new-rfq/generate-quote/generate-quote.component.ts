import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-quote',
  templateUrl: './generate-quote.component.html',
  styleUrls: ['./generate-quote.component.css']
})
export class GenerateQuoteComponent implements OnInit {


  constructor(private router: Router) { }
  dateFormat = 'MM/dd/yyyy';

  tableData = [
    {
      description: 'Item Name #1',
      quantity: '12',
      unitcost: '6',
      total: '$1,080.00',
      deleted: 'n'
    },
    {
      description: 'Item Name #2',
      quantity: '12',
      unitcost: '6',
      total: '$1,080.00',
      deleted: 'n'
    },
    {
      description: 'Item Name #3',
      quantity: '12',
      unitcost: '6',
      total: '$1,080.00',
      deleted: 'n'
    },
    {
      description: 'Item Name #4',
      quantity: '12',
      unitcost: '6',
      total: '$1,080.00',
      deleted: 'n'
    },
  ];
  addedDesc = '';
  addedQuantity = '';
  addedUnitCost = '';
  addedTotal = '';

  ngOnInit(): void {
  }
  reviewForm(){
    this.router.navigate(['dashboard/newRFQ/details/submit']);
  }


  deleteItem(i){
    this.tableData.splice(i, 1);
  }
  addItem(){
    this.tableData.push({
      description: this.addedDesc,
      quantity: this.addedQuantity,
      unitcost: this.addedUnitCost,
      total: this.addedTotal,
      deleted: 'n'
    });

    this.addedDesc = '';
    this.addedQuantity = '';
    this.addedUnitCost = '';
    this.addedTotal = '';
  }
}
