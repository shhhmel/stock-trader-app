import { Action } from '@ngrx/store';

// Interfaces
import { Market } from '../../models/market.model';

// load markets
export const LOAD_MARKETS = '[Markets] Load Markets';
export const LOAD_MARKETS_FAIL = '[Markets] Load Markets Fail';
export const LOAD_MARKETS_SUCCESS = '[Markets] Load Markets Succsess';

export class LoadMarkets implements Action {
  readonly type = LOAD_MARKETS;
  constructor(public payload?: string) {}
}

export class LoadMarketsFail implements Action {
  readonly type = LOAD_MARKETS_FAIL;
  constructor(public payload: any) {}
}

export class LoadMarketsSuccess implements Action {
  readonly type = LOAD_MARKETS_SUCCESS;
  constructor(public payload: Market[]) {}
}

// action types
export type MarketsActions = LoadMarkets | LoadMarketsFail | LoadMarketsSuccess;
