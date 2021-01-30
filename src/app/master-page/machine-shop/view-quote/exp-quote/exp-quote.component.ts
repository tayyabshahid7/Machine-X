import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDistance } from 'date-fns';

@Component({
  selector: 'app-exp-quote',
  templateUrl: './exp-quote.component.html',
  styleUrls: ['./exp-quote.component.css']
})
export class ExpQuoteComponent implements OnInit {
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
 
  receivers=[];
   constructor(private modal: NzModalService,private route:ActivatedRoute,private router: Router) { }
 
   ngOnInit(): void {
     this.receivers=[];
   }
   isVisible = false;
   isOkLoading = false;
 
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
 
   showDeleteConfirm(): void {
     this.modal.info({
       nzStyle:{top: '40%'},
       nzTitle: '<b> <img src="../../../../assets/img/share.svg" style="margin-right:20px"> Share with others</b>',
       nzContent: '<div><form id="myForm" method="post"> <input  placeholder="Basic usage" /></form> <span>*</span>Emaiaaaal<br></div>',
       nzOkText: 'Yes',
       nzFooter:'null',
       nzOkType: 'primary',
       nzIconType:'null',
       nzOnOk: () => {
       },
       nzCancelText: 'Cancel',
       nzOnCancel: ()=>{
       },
       nzMaskStyle:{background: 'rgb(0, 39, 102, 0.9)'}
     });
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
}
