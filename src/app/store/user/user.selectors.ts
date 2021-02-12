import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../models/app-state.models';
import { getAppState } from '../index';
import { EngineerProfileInterface } from '../../models/user.models';

export const getUser = createSelector<AppStateInterface, AppStateInterface, EngineerProfileInterface>(
  getAppState,
  (state: AppStateInterface) => {
    return state.user;
  }
);
