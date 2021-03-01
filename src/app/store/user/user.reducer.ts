import { Action, createReducer, on } from '@ngrx/store';
import { clearUserData, loadUserSuccess } from './user.actions';
import { ShopProfileInterface } from '../../models/user.models';

const userInitialState = null;

const userReducerInner = createReducer(
  userInitialState,
  on(loadUserSuccess, (state: ShopProfileInterface, payload) => {
    return payload.user;
  }),
  on(clearUserData, (state: ShopProfileInterface, payload) => {
    return null;
  }),
);

export function userReducer(state: ShopProfileInterface | undefined, action: Action) {
  return userReducerInner(state, action);
}
