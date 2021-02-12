import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-rfq',
  templateUrl: './add-rfq.component.html',
  styleUrls: ['./add-rfq.component.css']
})
export class AddRfqComponent implements OnInit {
  date = null;
  addressnew = false;
  quantitiy = '';
  materialType = '';
  neededBy = '';
  note = '';
  shippingAddress = null;
  dateFormat = 'MM/dd/yyyy';


  constructor(private modal: NzModalService, private route: ActivatedRoute,
              private router: Router ) { }

  ngOnInit(): void {
    this.addressnew = false;
  }
  checkButton(): void {
    this.addressnew = !this.addressnew;
    console.log(this.addressnew);
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzStyle: {top: '40%'},
      nzTitle: '<b>Do you want to discard this item?</b>',
      nzContent: '<p style="color: #595959;">All of the information you added will be lost</p>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.router.navigate(['/dashboard/RFQ']);
      },
      nzCancelText: 'Cancel',
      nzOnCancel: () => {
      },
      nzMaskStyle: {background: 'rgb(0, 39, 102, 0.9)'}
    });
  }

  confirmation(){
    this.router.navigate(['/dashboard/RFQ/Add/confirm']);
  }
}
