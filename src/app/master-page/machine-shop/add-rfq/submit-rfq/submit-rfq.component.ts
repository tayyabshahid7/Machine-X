import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import {Location} from '@angular/common';

@Component({
  selector: 'app-submit-rfq',
  templateUrl: './submit-rfq.component.html',
  styleUrls: ['./submit-rfq.component.css']
})
export class SubmitRfqComponent implements OnInit {

  constructor(private modal: NzModalService, private route: ActivatedRoute,
              private router: Router , private _location: Location) { }
  submitSuccess = false;

  ngOnInit(): void {
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
  backClicked() {
    this._location.back();
  }
  submited(){
    this.submitSuccess = true;
  }
  RFQS(){
    this.router.navigate(['dashboard/RFQ']);
  }
  addRFQ(){
    this.router.navigate(['dashboard/RFQ/Add']);
  }
}
