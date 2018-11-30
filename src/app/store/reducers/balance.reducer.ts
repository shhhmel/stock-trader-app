import * as fromBalance from '../actions/balance.action';

import { Balance } from '../../models/balance.model';

export interface BalanceState {
  data: Balance;
  loaded: boolean;
  loading: boolean;
}

export const initialState: BalanceState = {
  data: { value: '' },
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromBalance.BalanceActions
): BalanceState {
  switch (action.type) {
    case fromBalance.LOAD_BALANCE: {
      return {
        ...state,
        loading: true
      };
    }

    case fromBalance.LOAD_BALANCE_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        data,
        loading: false,
        loaded: true
      };
    }

    case fromBalance.LOAD_BALANCE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getBalanceLoading = (state: BalanceState) => state.loading;
export const getBalanceLoaded = (state: BalanceState) => state.loaded;
export const getBalance = (state: BalanceState) => state.data;
