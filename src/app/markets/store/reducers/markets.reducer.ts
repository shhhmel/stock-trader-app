import * as fromMarkets from '../actions/markets.action';

import { Market } from '../../models/market.model';

export interface MarketState {
  data: Market[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: MarketState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromMarkets.MarketsActions
): MarketState {
  switch (action.type) {
    case fromMarkets.LOAD_MARKETS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromMarkets.LOAD_MARKETS_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        data,
        loading: false,
        loaded: true
      };
    }

    case fromMarkets.LOAD_MARKETS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getMarketsLoading = (state: MarketState) => state.loading;
export const getMarketsLoaded = (state: MarketState) => state.loaded;
export const getMarkets = (state: MarketState) => state.data;
export const getMarketsCategories = (state: MarketState) => [
  ...new Set(state.data.map(market => market.category))
];
