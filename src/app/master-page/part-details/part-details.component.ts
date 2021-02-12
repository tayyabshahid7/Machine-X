import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-part-details',
  templateUrl: './part-details.component.html',
  styleUrls: ['./part-details.component.css']
})
export class PartDetailsComponent implements OnInit {
  isVisible = false;
  name = '';
  number = '';
  note = '';
  constructor(private modal: NzModalService, private route: ActivatedRoute,
              private router: Router  ) { }

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
        this.router.navigate(['/dashboard/parts']);
      },
      nzCancelText: 'Cancel',
      nzOnCancel: () => {
      },
      nzMaskStyle: {background: 'rgb(0, 39, 102, 0.9)'}
    });
  }
  addPart(){
    this.router.navigate(['/dashboard/parts/']);

  }
}
