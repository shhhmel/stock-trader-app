import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromMarkets from '../reducers/markets.reducer';

export const getMarketsState = createSelector(
  fromFeature.getMarketFeatureState,
  (state: fromFeature.MarketFeatureState) => state.markets
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
