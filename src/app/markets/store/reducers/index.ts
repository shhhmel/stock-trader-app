import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

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
