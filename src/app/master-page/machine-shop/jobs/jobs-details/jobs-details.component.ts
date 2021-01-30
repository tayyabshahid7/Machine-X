import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { formatDistance } from 'date-fns';

@Component({
  selector: 'app-jobs-details',
  templateUrl: './jobs-details.component.html',
  styleUrls: ['./jobs-details.component.css']
})
export class JobsDetailsComponent implements OnInit {
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
  status:boolean;
  receivers=[];
  isVisible = false;
  isOkLoading = false;
  constructor(private route:ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.receivers=[];

    let statusUrl = this.route.snapshot.paramMap.get('active');
    statusUrl == "active"?this.status=true:this.status=false; 
  }

  viewQuote(x:boolean){
    x==true?this.router.navigate(['/dashboard/RFQ/RFQDetails/active/viewquote']):this.router.navigate(['/dashboard/RFQ/RFQDetails/NotActive/viewquote']);
  }
  data: any[] = [];
  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  inputValue = '';

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.data = [
        ...this.data,
        {
          ...this.user,
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
  showModal(): void {
    this.isVisible = true;
  }
  addEmail(){
    this.receivers.push(1);
  }
  removeEmail(){
    this.receivers.pop();
  }
  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  goToPaymen(){
    this.router.navigate(['/dashboard/RFQ/RFQDetails/active/viewquote/payment']);
  }

 

}
