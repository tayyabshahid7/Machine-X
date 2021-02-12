import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  constructor(private router: Router, private notification: NzNotificationService, ) { }
  switchValue = true;
  tableData = [
    {
      id : 'Invoice # 06135313',
      jobId: '# 001',
      type: 'Processing Fee',
      date: 'March 4, 2018',
      amount: '150',
      description: 'Payment processing Fee for Ref ID 317761043',
    },
    {
      id : 'Invoice # 06135313',
      jobId: '# 002',
      type: 'Processing Fee',
      date: 'March 4, 2018',
      amount: '30',
      description: 'Payd from MasterCard ****2291',
    }

 ];
  handelData(){
    this.switchValue = !this.switchValue;
  }

  transferDone(){
    this.notification.success('Transer Initiated',
    'Transfers are reviewed which may result in delays or fund begin frozen or removed from your account');

  }

  ngOnInit(): void {
  }
  onSelect(data){
    console.log(data.isActive);
    this.router.navigate(['dashboard/transactions/receipt']);
    }

}
