import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RfqAPIService } from '../services/api/rfq-api.service';
import { AuthenticationService } from '../services/auth/authentication.service';
import { Observable } from 'rxjs';
import { ShopProfileInterface } from '../models/user.models';
import { getUser } from '../store/user/user.selectors';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent implements OnInit {
  shopProfile$: Observable<ShopProfileInterface>;

  constructor(
    private authenticationService: AuthenticationService,
    private partsAPIService: RfqAPIService,
    private notification: NzNotificationService,
    private store: Store
  ) {
    this.shopProfile$ = this.store.select(getUser);
  }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout().subscribe(
      success => {
        this.notification.info('Goodbye', null);
      },
      error => {
        this.notification.error('Error logging out', null);
      }
    );
  }
}
