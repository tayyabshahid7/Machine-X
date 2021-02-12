import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  tableData = [
    {
      id : ' Job #00133312',
      name: 'Shop Name #1',
      date: 'March 4, 2018',
      daysLeft: '2',
      status: true,
      statusX: 'InProgress'
    },
    {
      id : ' Job #00133312',
      name: 'Shop Name #1',
      date: 'March 4, 2018',
      daysLeft: '2',
      status: true,
      statusX: 'Shipped'
    },
    {
      id : ' Job #00133312',
      name: 'Shop Name #1',
      date: 'March 4, 2018',
      daysLeft: '2',
      status: true,
      statusX: 'Completed'
    },
 ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSelect(data){
    console.log(data.isActive);
    this.router.navigate(['dashboard/Jobs/jobDetail/', data.statusX]);
    }

}
