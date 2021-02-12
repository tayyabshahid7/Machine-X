import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  switchValue = true;
  activeParts = 12 ;
  finishedParts = 231;
  tableData = [
    {
      rfq: 'RFQ #359',
      submissions: '4',
      daysLeft: '3',
      accepted: true,
      jobName: 'Bike Handle | X04-321-133-41 ',
      jobProgress: 100,
      JobStatus: 'Ongoing',
      transJobNumber: '$ 23910',
      JobId: '#31212',
      transJobDate: 'Sep 23, 2020',
      transMachine: 'Part X04-321-133-412',
      transQu: 'Quote: #132123',
      transCost: '140.5',

    },
    {
      rfq: 'RFQ #439',
      submissions: '4',
      daysLeft: '2',
      accepted: true,
      jobName: 'Part X04-321-133-412',
      jobProgress: 7,
      JobStatus: 'Resolved',
      transJobNumber: '$ 23910',
      JobId: '#31212',
      transJobDate: 'Sep 23, 2020',
      transMachine: 'Part X04-321-133-412',
      transQu: 'Quote: #132123',
      transCost: '3,205.50',
    },
    {
      rfq: 'RFQ #519',
      submissions: '0',
      daysLeft: '1',
      accepted: false,
      jobName: 'Part X04-141-133-412',
      jobProgress: 74,
      JobStatus: 'Resolved',
      transJobNumber: '$ 23910',
      JobId: '#31212',
      transJobDate: 'Sep 23, 2020',
      transMachine: 'Part X04-321-133-412',
      transQu: 'Quote: #132123',
      transCost: '1,040.5',
    },
  ];


  public configuration: Config;
  public columns: Columns[];

  public data = [{
    phone: '+1 (934) 551-2224',
    age: 20,
    company: 'ZILLANET',
    isActive: false,
  }, {
    phone: '+1 (948) 460-3627',
    age: 31,
    company: 'KNOWLYSIS',
    isActive: true,
  }];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = false;
    this.configuration.paginationEnabled = false;
    // ... etc.
    this.columns = [
      { key: 'phone', title: 'Newest' },
      { key: 'age', title: 'Submissions' },
      { key: 'company', title: 'Days left' },
      // { key: 'isActive', title: 'Days left' },
    ];
  }

  handelData(){
    this.switchValue == false ? this.activeParts = 0 : this.activeParts = 12;
    this.switchValue == false ? this.finishedParts = 0 : this.finishedParts = 231;

    this.switchValue == false ? this.tableData = [] : this.tableData = [
        {
          rfq: 'RFQ #359',
          submissions: '4',
          daysLeft: '3',
          accepted: true,
          jobName: 'Bike Handle | X04-321-133-41 ',
          jobProgress: 100,
          transJobNumber: '$ 23910',
          JobId: '#31212',
          JobStatus: 'Ongoing',
          transJobDate: 'Sep 23, 2020',
          transMachine: 'Part X04-321-133-412',
          transQu: 'Quote: #132123',
          transCost: '140.5',

        },
        {
          rfq: 'RFQ #439',
          submissions: '4',
          daysLeft: '2',
          accepted: true,
          jobName: 'Part X04-321-133-412',
          jobProgress: 7,
          transJobNumber: '$ 23910',
          JobId: '#31212',
          JobStatus: 'Resolved',
          transJobDate: 'Sep 23, 2020',
          transMachine: 'Part X04-321-133-412',
          transQu: 'Quote: #132123',
          transCost: '3,205.50',
        },
        {
          rfq: 'RFQ #519',
          submissions: '0',
          daysLeft: '1',
          accepted: false,
          jobName: 'Part X04-141-133-412',
          jobProgress: 74,
          transJobNumber: '$ 23910',
          JobStatus: 'Resolved',
          JobId: '#31212',
          transJobDate: 'Sep 23, 2020',
          transMachine: 'Part X04-321-133-412',
          transQu: 'Quote: #132123',
          transCost: '1,040.5',
        },
      ];
  }

  addRFQ(){
    this.router.navigate(['dashboard/RFQ/Add']);
  }
  addPart(){
    this.router.navigate(['dashboard/parts/add']);
  }
  viewParts(){
    this.router.navigate(['dashboard/parts']);

  }
  viewJobs(){
    this.router.navigate(['dashboard/WorkingJobs']);
  }
  viewRFQ(){
    this.router.navigate(['dashboard/newRFQ']);
  }
  viewTransactions(){
    this.router.navigate(['dashboard/transactions']);
  }
}
