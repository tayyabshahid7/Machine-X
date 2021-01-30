import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-revision',
  templateUrl: './add-revision.component.html',
  styleUrls: ['./add-revision.component.css']
})
export class AddRevisionComponent implements OnInit {

  constructor(private modal: NzModalService,private route: ActivatedRoute,
    private router: Router  ) { }

  ngOnInit(): void {
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzStyle:{top: '40%'},
      nzTitle: '<b>Do you want to discard this revision?</b>',
      nzContent: '<p style="color: #595959;">All of the information you added will be lost</p>',
      nzOkText: 'Ok',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.router.navigate(['/dashboard/parts/view']);
      },
      nzCancelText: 'Cancel',
      nzOnCancel: ()=>{
      },
      nzMaskStyle:{background: 'rgb(0, 39, 102, 0.9)'}
    });
  }
}
