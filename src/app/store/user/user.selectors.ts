import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../models/app-state.models';
import { getAppState } from '../index';
import { ShopProfileInterface } from '../../models/user.models';

export const getUser = createSelector<AppStateInterface, AppStateInterface, ShopProfileInterface>(
  getAppState,
  (state: AppStateInterface) => {
    return state.user;
  }
);
