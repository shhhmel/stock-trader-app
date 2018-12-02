import { Action } from '@ngrx/store';

// Interfaces
import { Stock } from '../../models/stock.model';

// load stocks
export const LOAD_STOCKS = '[Portfolio] Load Stocks';
export const LOAD_STOCKS_FAIL = '[Portfolio] Load Stocks Fail';
export const LOAD_STOCKS_SUCCESS = '[Portfolio] Load Stocks Succsess';

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

// update cetain stock
export const UPDATE_STOCK = '[Potrfolio] Update Stock';
export const UPDATE_STOCK_SUCCESS_DELETE =
  '[Potrfolio] Update Stock Success Delete';
export const UPDATE_STOCK_SUCCESS_UPDATE =
  '[Potrfolio] Update Stock Success Update';
export const UPDATE_STOCK_FAIL = '[Potrfolio] Update Stock Fail';

export class UpdateStock implements Action {
  readonly type = UPDATE_STOCK;
  constructor(public payload: { quant: number; stock: Stock }) {}
}

export class UpdateStockFail implements Action {
  readonly type = UPDATE_STOCK_FAIL;
  constructor(public payload: any) {}
}

export class UpdateStockSuccessDelete implements Action {
  readonly type = UPDATE_STOCK_SUCCESS_DELETE;
  constructor(public payload: Stock) {}
}

export class UpdateStockSuccessUpdate implements Action {
  readonly type = UPDATE_STOCK_SUCCESS_UPDATE;
  constructor(public payload: Stock) {}
}

// update stocks
export const UPDATE_STOCKS = '[Markets] Update Stocks';

export class UpdateStocks implements Action {
  readonly type = UPDATE_STOCKS;
  constructor(public payload: Stock) {}
}

// action types
export type StocksActions =
  | LoadStocks
  | LoadStocksFail
  | LoadStocksSuccess
  | UpdateStock
  | UpdateStockSuccessDelete
  | UpdateStockSuccessUpdate
  | UpdateStockFail
  | UpdateStocks;
