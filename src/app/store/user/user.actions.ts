import { createAction, props } from '@ngrx/store';
import { EngineerProfileInterface } from '../../models/user.models';

export const LOAD_USER = 'load user';
export const LOAD_USER_SUCCESS = 'load user success';
export const LOAD_USER_FAILURE = 'load user failure';
export const CLEAR_USER_DATA = 'clear user data';

export const loadUser = createAction(LOAD_USER);
export const loadUserSuccess = createAction(LOAD_USER_SUCCESS, props<{ user: EngineerProfileInterface }>());
export const loadUserFailure = createAction(LOAD_USER_FAILURE);
export const clearUserData = createAction(CLEAR_USER_DATA);
