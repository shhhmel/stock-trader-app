import * as fromStocks from '../actions/stock.action';

import { Stock } from '../../models/stock.model';

export interface StockState {
  data: Stock[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: StockState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromStocks.StocksActions
): StockState {
  switch (action.type) {
    case fromStocks.LOAD_STOCKS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromStocks.LOAD_STOCKS_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        data,
        loading: false,
        loaded: true
      };
    }

    case fromStocks.LOAD_STOCKS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromStocks.UPDATE_STOCKS: {
      const stock = action.payload;
      const index = state.data.findIndex(el => el.id === stock.id);
      let data = [...state.data];
      if (index !== -1) {
        data = [
          ...state.data.slice(0, index),
          { ...stock },
          ...state.data.slice(index + 1)
        ];
      } else {
        data.push(stock);
      }
      return {
        ...state,
        data
      };
    }

    case fromStocks.UPDATE_STOCK_SUCCESS_UPDATE: {
      const stock = action.payload;
      const index = state.data.findIndex(el => el.id === stock.id);

      const data = [
        ...state.data.slice(0, index),
        stock,
        ...state.data.slice(index + 1)
      ];

      return {
        ...state,
        data
      };
    }

    case fromStocks.UPDATE_STOCK_SUCCESS_DELETE: {
      const stock = action.payload;
      const index = state.data.findIndex(el => el.id === stock.id);

      const data = [
        ...state.data.slice(0, index),
        ...state.data.slice(index + 1)
      ];

      return {
        ...state,
        data
      };
    }
  }

  return state;
}

export const getStocksLoading = (state: StockState) => state.loading;
export const getStocksLoaded = (state: StockState) => state.loaded;
export const getStocks = (state: StockState) => state.data;
export const getStocksTotalPrice = (state: StockState) => {
  return state.data.reduce((prev, curr) => {
    return (prev += parseFloat(curr.price) * curr.count);
  }, 0);
};
