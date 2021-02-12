import { style } from '@angular/animations';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.css']
})
export class PartsComponent implements OnInit {
Data = [1, 2, 3, 4, 5, 6, 7];
  constructor(private notification: NzNotificationService, private route: ActivatedRoute,
              private router: Router ) { }

  ngOnInit(): void {
    this.notification.success('Part Added Successfully',
    'This {Part name} is the content of the notification. This is the content of the notification. This is the content of the notification.');
  }

  view(){
    this.router.navigate(['/dashboard/parts/view']);
  }

  addPart(){
    this.router.navigate(['/dashboard/parts/add']);
  }
}
