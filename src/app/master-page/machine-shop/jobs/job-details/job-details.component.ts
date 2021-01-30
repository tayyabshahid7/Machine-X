import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDistance } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  

  constructor(private route:ActivatedRoute,private modal: NzModalService,private router: Router) { }
  issue=false;
  receivers=[];
  addEmail(){
    this.receivers.push(1);
  }
  removeEmail(){
    this.receivers.pop();
  }

  startIssue(){
    this.issue=true;
  }
  cancelIssue(){
    this.issue=false;
  }


  status="";
  rate=0.0;
  tooltips = ['Terrible', 'Bad', 'Okay', 'good', 'Great'];

  rateImg=[
    "../../../../../assets/img/face-1.svg",
    "../../../../../assets/img/face-2.svg",
    "../../../../../assets/img/face-3.svg",
    "../../../../../assets/img/face-4.svg",
    "../../../../../assets/img/face-5.svg"
  ];
  history:boolean=false;
  ngOnInit(): void {
    let statusUrl = this.route.snapshot.paramMap.get('status');
    statusUrl == "Completed"?this.status="completed":statusUrl == "Shipped"?this.status="shipped":statusUrl == "InProgress"?this.status="progress":this.status="completed"; 
  }

showHistory(){
  this.history=true;
}

hideHistory(){
  this.history=false;
}

  data: any[] = [];
  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  inputValue = '';
  titleValue = '';

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    const title = this.titleValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.data = [
        ...this.data,
        {
          ...this.user,
          title,
          content,
          datetime: new Date(),
          displayTime: formatDistance(new Date(), new Date())
        }
      ].map(e => {
        return {
          ...e,
          displayTime: formatDistance(new Date(), e.datetime)
        };
      });
    }, 800);
  }
  openInvoice(){
    this.router.navigate(['/dashboard/Jobs/invoice']);
  }
}
