import { Action } from '@ngrx/store';

// Interfaces
import { Stock } from '../../models/stock.model';

// load stocks
export const LOAD_STOCKS = '[Stocks] Load Stocks';
export const LOAD_STOCKS_FAIL = '[Stocks] Load Stocks Fail';
export const LOAD_STOCKS_SUCCESS = '[Stocks] Load Stocks Succsess';

export class LoadStocks implements Action {
  readonly type = LOAD_STOCKS;
}

export class LoadStocksFail implements Action {
  readonly type = LOAD_STOCKS_FAIL;
  constructor(public payload: any) {}
}

export class LoadStocksSuccess implements Action {
  readonly type = LOAD_STOCKS_SUCCESS;
  constructor(public payload: Stock[]) {}
}

// action types
export type StocksActions = LoadStocks | LoadStocksFail | LoadStocksSuccess;
