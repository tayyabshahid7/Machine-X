import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserAPIService } from '../../services/api/user-api.service';
import { LOAD_USER, loadUserFailure, loadUserSuccess } from './user.actions';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { getUser } from './user.selectors';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class UserEffects {

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(LOAD_USER),
    withLatestFrom(this.store.select(getUser)),
    switchMap(([action, user]) => {
      const existsInStore = Boolean(user);
      if (existsInStore) {
        return of(loadUserSuccess({user}));
      } else {
        return this.userAPIService.getEngineerProfile().pipe(
          map(engineer => loadUserSuccess({user: engineer})),
          catchError(() => {
            this.notification.error('Error while loading user profile', null);
            return of(loadUserFailure());
          })
        );
      }
    })
  ));

  constructor(
    private actions$: Actions,
    private userAPIService: UserAPIService,
    private store: Store,
    private notification: NzNotificationService
  ) {

  }

}
