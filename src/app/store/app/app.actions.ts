import { createAction } from '@ngrx/store';

export const CLEAR_STORE = 'clear store';

export const clearStore = createAction(CLEAR_STORE);
