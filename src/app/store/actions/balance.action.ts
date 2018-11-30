import { Action } from '@ngrx/store';

// Interfaces
import { Balance } from '../../models/balance.model';

// load balance
export const LOAD_BALANCE = '[Nav] Load Balance';
export const LOAD_BALANCE_FAIL = '[Nav] Load Balance Fail';
export const LOAD_BALANCE_SUCCESS = '[Nav] Load Balance Succsess';

export class LoadBalance implements Action {
  readonly type = LOAD_BALANCE;
}

export class LoadBalanceFail implements Action {
  readonly type = LOAD_BALANCE_FAIL;
  constructor(public payload: any) {}
}

export class LoadBalanceSuccess implements Action {
  readonly type = LOAD_BALANCE_SUCCESS;
  constructor(public payload: Balance) {}
}

// action types
export type BalanceActions = LoadBalance | LoadBalanceFail | LoadBalanceSuccess;
