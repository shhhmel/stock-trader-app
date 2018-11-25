import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

import * as fromMarkets from './markets.reducer';

export interface MarketFeatureState {
  markets: fromMarkets.MarketState;
}

export const reducers: ActionReducerMap<MarketFeatureState> = {
  markets: fromMarkets.reducer
};

export const getMarketFeatureState = createFeatureSelector<MarketFeatureState>(
  'markets-feature'
);

// markets state
export const getMarketsState = createSelector(
  getMarketFeatureState,
  (state: MarketFeatureState) => state.markets
);

export const getAllMarkets = createSelector(
  getMarketsState,
  fromMarkets.getMarkets
);
export const getMarketsLoading = createSelector(
  getMarketsState,
  fromMarkets.getMarketsLoading
);
export const getMarketsLoaded = createSelector(
  getMarketsState,
  fromMarkets.getMarketsLoaded
);
export const getMarketsCategories = createSelector(
  getMarketsState,
  fromMarkets.getMarketsCategories
);
