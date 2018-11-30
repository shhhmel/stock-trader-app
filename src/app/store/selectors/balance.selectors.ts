import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromBalance from '../reducers/balance.reducer';

export const getBalanceState = createSelector(
  state => state,
  (state: fromFeature.AppState) => state.balance
);

export const getBalance = createSelector(
  getBalanceState,
  fromBalance.getBalance
);
export const getBalanceLoading = createSelector(
  getBalanceState,
  fromBalance.getBalanceLoading
);
export const getBalanceLoaded = createSelector(
  getBalanceState,
  fromBalance.getBalanceLoaded
);
