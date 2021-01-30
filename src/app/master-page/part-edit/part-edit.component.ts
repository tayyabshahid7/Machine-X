import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-part-edit',
  templateUrl: './part-edit.component.html',
  styleUrls: ['./part-edit.component.css']
})
export class PartEditComponent implements OnInit {
  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ];
  constructor(private modal: NzModalService,private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {
  }

  showArchive(): void {
    this.modal.error({
      nzStyle:{top: '40%'},
      nzTitle: '<b>Do you want to archive this part?</b>',
      nzContent: '<p style="color: #595959;">All of the information you added will be lost</p>',
      nzOkText: 'Archive',
      nzOkType: 'danger',
      nzOnOk: () =>{
        this.router.navigate(['/dashboard/parts']);
      },
      nzCancelText: 'Cancel',
      nzOnCancel: ()=>{
       
      },
      nzMaskStyle:{background: 'rgb(0, 39, 102, 0.9)'}
    });
  }
  addRevision(){
    this.router.navigate(["/dashboard/parts/view/addrevision"]);
  }

}
