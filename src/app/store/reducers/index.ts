import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromBalance from './balance.reducer';

export interface AppState {
  balance: fromBalance.BalanceState;
}

export const reducers: ActionReducerMap<AppState> = {
  balance: fromBalance.reducer
};
