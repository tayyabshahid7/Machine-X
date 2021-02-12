import { clearStore } from './app.actions';
import { tap } from 'rxjs/operators';
import { clearUserData } from '../user/user.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class AppEffects {

  clearStore$$ = createEffect(
    () => this.actions$.pipe(
      ofType(clearStore),
      tap(() => {
        this.store.dispatch(clearUserData());
      })
    ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private store: Store,
  ) {
  }

}
