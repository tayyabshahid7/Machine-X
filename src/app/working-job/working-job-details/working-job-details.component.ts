import { Component, OnInit } from '@angular/core';
import { formatDistance } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-working-job-details',
  templateUrl: './working-job-details.component.html',
  styleUrls: ['./working-job-details.component.css']
})
export class WorkingJobDetailsComponent implements OnInit {


  constructor(private modal: NzModalService, private route: ActivatedRoute,
              private router: Router) { }
  receivers = [];

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
  history = false;
  dateFormat = 'MM/dd/yyyy';
  date = null;

  isVisible = false;
    status = '';
    canStart = false;
  data: any[] = [];
  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  inputValue = '';
  titleValue = '';
  // openInvoice(){
  //   this.router.navigate(['/dashboard/Jobs/invoice']);
  // }
  issue = false;
  addEmail(){
    this.receivers.push(1);
  }
  removeEmail(){
    this.receivers.pop();
  }



  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  ngOnInit(): void {
    const statusUrl = this.route.snapshot.paramMap.get('status');
    statusUrl == 'InProgress' ? this.status = 'InProgress' : statusUrl == 'Shipped' ? this.status = 'Shipped' : statusUrl == 'Issue' ? this.status = 'Issue' : this.status = 'InProgress';
    this.status == 'Shipped' ? this.canStart = true : null;
  }

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


  startIssue(){
    this.issue = true;
  }
  cancelIssue(){
    this.issue = false;
  }
  showArchive(): void {
    this.modal.error({
      nzStyle: {top: '40%'},
      nzTitle: '<b>Do you want to archive this ?</b>',
      nzContent: '<p style="color: #595959;">All of the information you added will be lost</p>',
      nzOkText: 'Archive',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.router.navigate(['/dashboard/submittedQuote']);
      },
      nzCancelText: 'Cancel',
      nzOnCancel: () => {

      },
      nzMaskStyle: {background: 'rgb(0, 39, 102, 0.9)'}
    });
  }
  close(){
    this.router.navigate(['/dashboard/submittedQuote']);
  }
  startJob(){
    this.router.navigate(['/dashboard/submittedQuote/details/:status/invoice']);
  }
  openInvoice(){

    //  this.router.navigate(['/dashboard/Jobs/invoice']);

  }

  showHistory(){
    this.history = true;
  }

  hideHistory(){
    this.history = false;
  }

}
