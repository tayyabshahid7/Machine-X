import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-new-rfq',
  templateUrl: './new-rfq.component.html',
  styleUrls: ['./new-rfq.component.css']
})
export class NewRFQComponent implements OnInit {

  constructor(private router: Router, private notification: NzNotificationService, ) { }
  tableData = [
    {
      id : ' RFQ #4132',
      quantity: '10',
      date: 'March 4, 2018',
      submission: '2',
      remaining: {
        days: '6',
        hours: '4',
        min: '49'
    },
      status: true,
      isActive: 'active'
    },
    {
     id : 'RFQ #2122',
     quantity: '5',
     date: 'April 6, 2014',
     submission: '0',
     remaining: {
      days: '2',
      hours: '1',
      min: '19'
  },
     status: true,
     isActive: 'active'
   },
   {
     id : 'RFQ #1232',
     quantity: '11',
     date: 'April 6, 2015',
     submission: '1',
     remaining: {
      days: '0',
      hours: '0',
      min: '49'
  },
     status: false,
     isActive: 'NotActive'
   },  {
    id : ' RFQ #4132',
    quantity: '10',
    date: 'March 4, 2018',
    submission: '2',
    remaining: {
      days: '6',
      hours: '4',
      min: '49'
  },
    status: true,
    isActive: 'active'
  },  {
    id : 'RFQ #2122',
    quantity: '5',
    date: 'April 6, 2014',
    submission: '0',
    remaining: {
      days: '0',
      hours: '4',
      min: '49'
  },
    status: true,
    isActive: 'active'
  },


 ];

  ngOnInit(): void {
    this.notification.success('Quote Sent Successfully',
    'This {Quote} is the content of the notification. This is the content of the notification. Can be found on the Submitted Quotes page');
  }
 onSelect(data){
  console.log(data.isActive);
  this.router.navigate(['dashboard/newRFQ/details']);
  }

}
