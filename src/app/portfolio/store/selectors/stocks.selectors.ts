import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromStocks from '../reducers/stocks.reducer';

export const getStocksState = createSelector(
  fromFeature.getStockFeatureState,
  (state: fromFeature.StockFeatureState) => state.stocks
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
