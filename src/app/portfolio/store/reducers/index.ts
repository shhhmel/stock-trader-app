import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromStocks from './stocks.reducer';

export interface StockFeatureState {
  stocks: fromStocks.StockState;
}

export const reducers: ActionReducerMap<StockFeatureState> = {
  stocks: fromStocks.reducer
};

export const getStockFeatureState = createFeatureSelector<StockFeatureState>(
  'stocks-feature'
);
