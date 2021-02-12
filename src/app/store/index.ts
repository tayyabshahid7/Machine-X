import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppStateInterface } from '../models/app-state.models';
import { userReducer } from './user/user.reducer';

export const appReducers: ActionReducerMap<AppStateInterface> = {
  user: userReducer
};

export const getAppState = createFeatureSelector<AppStateInterface>('app');
