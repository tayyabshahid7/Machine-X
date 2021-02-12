import { Action, createReducer, on } from '@ngrx/store';
import { clearUserData, loadUserSuccess } from './user.actions';
import { EngineerProfileInterface } from '../../models/user.models';

const userInitialState = null;

const userReducerInner = createReducer(
  userInitialState,
  on(loadUserSuccess, (state: EngineerProfileInterface, payload) => {
    return payload.user;
  }),
  on(clearUserData, (state: EngineerProfileInterface, payload) => {
    return null;
  }),
);

export function userReducer(state: EngineerProfileInterface | undefined, action: Action) {
  return userReducerInner(state, action);
}
