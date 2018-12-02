// Angular
import { Injectable } from '@angular/core';

// @ngrx
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import * as marketActions from '../actions/markets.action';
import * as fromStocksStore from '../../../portfolio/store';
import * as fromAppStore from '../../../store';

// RxJS
import { of, Observable } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  mergeMap
} from 'rxjs/operators';

// Services
import { MarketsService } from '../../services/markets/markets.service';
import { StocksService } from '../../../portfolio/services/stocks/stocks.service';

// Interfaces
import { Stock } from '../../../portfolio/models/stock.model';
import { Balance } from '../../../models/balance.model';

@Injectable()
export class MarketsEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromAppStore.AppState>,
    private marketsService: MarketsService,
    private stocksService: StocksService
  ) {}

  @Effect()
  loadMarkets$ = this.actions$.pipe(
    ofType(marketActions.LOAD_MARKETS),
    switchMap((action: marketActions.LoadMarkets) => {
      return this.marketsService.getMarkets(action.payload).pipe(
        map(markets => new marketActions.LoadMarketsSuccess(markets)),
        catchError(err => of(new marketActions.LoadMarketsFail(err)))
      );
    })
  );

  @Effect()
  buyMarket$ = this.actions$.pipe(
    ofType(marketActions.BUY_MARKET),
    withLatestFrom(
      this.store$.pipe(select(fromStocksStore.getAllStocks)),
      this.store$.pipe(select(fromAppStore.getBalance))
    ),
    switchMap(
      ([action, stocks, balance]: [
        marketActions.BuyMarket,
        Stock[],
        Balance
      ]): Observable<any> => {
        const market = action.payload.market;
        const quant = action.payload.quant;
        const currentBalance = parseFloat(balance.value);
        const purchaseCost = parseFloat(market.price) * quant;
        const newBalance = currentBalance - purchaseCost;

        const stock = {
          market: market.name,
          price: market.price,
          count: quant
        };
        const existingStock = stocks.find(el => el.market === stock.market);

        if (newBalance < 0) {
          return of(
            new fromAppStore.SnackbarOpen({
              message: 'Not enough money :(',
              action: 'Fail'
            })
          );
        }

        if (existingStock) {
          const count = quant + existingStock.count;

          return this.stocksService
            .updateStock({ ...existingStock, count })
            .pipe(
              mergeMap(updatedStock => {
                return [
                  new fromAppStore.UpdateBalance(newBalance),
                  new fromStocksStore.UpdateStocks(updatedStock),
                  new fromAppStore.SnackbarOpen({
                    message: 'Added to your Portfolio',
                    action: 'Success'
                  })
                ];
              }),
              catchError(err => of(new marketActions.BuyMarketFail(err)))
            );
        } else {
          return this.stocksService.addStock(stock).pipe(
            mergeMap(createdStock => {
              return [
                new fromAppStore.UpdateBalance(newBalance),
                new fromStocksStore.UpdateStocks(createdStock),
                new fromAppStore.SnackbarOpen({
                  message: 'Added to your Portfolio',
                  action: 'Success'
                })
              ];
            }),
            catchError(err => of(new marketActions.BuyMarketFail(err)))
          );
        }
      }
    )
  );
}
