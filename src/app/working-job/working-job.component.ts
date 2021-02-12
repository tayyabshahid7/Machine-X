import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-working-job',
  templateUrl: './working-job.component.html',
  styleUrls: ['./working-job.component.css']
})
export class WorkingJobComponent implements OnInit {
  tableData = [
    {
      id : ' Job #00133312',
      name: '123122',
      date: 'March 4, 2018',
      daysLeft: '1000.00',
      status: true,
      statusX: 'InProgress'
    },
    {
      id : ' Job #00133312',
      name: '2343',
      date: 'March 4, 2018',
      daysLeft: '1000.00',
      status: true,
      statusX: 'Shipped'
    },
    {
      id : ' Job #00133312',
      name: '5321',
      date: 'March 4, 2018',
      daysLeft: '650.00',
      status: true,
      statusX: 'Issue'
    },
 ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onSelect(data){
    console.log(data.isActive);
    this.router.navigate(['/dashboard/WorkingJobs/details/', data.statusX]);
    }

}
