import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

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

// stocks state
export const getStocksState = createSelector(
  getStockFeatureState,
  (state: StockFeatureState) => state.stocks
);

export const getAllStocks = createSelector(
  getStocksState,
  fromStocks.getStocks
);
export const getStocksLoading = createSelector(
  getStocksState,
  fromStocks.getStocksLoading
);
export const getStocksLoaded = createSelector(
  getStocksState,
  fromStocks.getStocksLoaded
);
export const getTotalPrice = createSelector(
  getStocksState,
  fromStocks.getStocksTotalPrice
);
