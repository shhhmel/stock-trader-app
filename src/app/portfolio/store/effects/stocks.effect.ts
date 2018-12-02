// Angular
import { Injectable } from '@angular/core';

// @ngrx
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import * as stockActions from '../actions/stock.action';
import * as fromAppStore from '../../../store';

// RxJS
import { of, Observable } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  tap,
  mergeMap
} from 'rxjs/operators';

// Services
import { StocksService } from '../../services/stocks/stocks.service';

import { Balance } from '../../../models/balance.model';

@Injectable()
export class StocksEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromAppStore.AppState>,
    private stocksService: StocksService
  ) {}

  @Effect()
  loadStocks$ = this.actions$.pipe(
    ofType(stockActions.LOAD_STOCKS),
    switchMap(() => {
      return this.stocksService.getStocks().pipe(
        map(stocks => new stockActions.LoadStocksSuccess(stocks)),
        catchError(err => of(new stockActions.LoadStocksFail(err)))
      );
    })
  );

  @Effect()
  updateStock$ = this.actions$.pipe(
    ofType(stockActions.UPDATE_STOCK),
    withLatestFrom(this.store$.pipe(select(fromAppStore.getBalance))),
    switchMap(
      ([action, balance]: [stockActions.UpdateStock, Balance]): Observable<
        any
      > => {
        const newCount = action.payload.quant;
        const currentBalance = parseFloat(balance.value);
        let newStock = action.payload.stock;

        if (newStock.count > newCount) {
          const count = newStock.count - newCount;
          const purchaseCost = parseFloat(newStock.price) * newCount;
          newStock = { ...newStock, count };
          return this.stocksService.updateStock(newStock).pipe(
            mergeMap(stock => {
              const newBalance = currentBalance + purchaseCost;
              return [
                new stockActions.UpdateStockSuccessUpdate(stock),
                new fromAppStore.UpdateBalance(newBalance),
                new fromAppStore.SnackbarOpen({
                  message: 'Stock got sold',
                  action: 'Success'
                })
              ];
            }),
            catchError(err => of(new stockActions.UpdateStockFail(err)))
          );
        } else {
          return this.stocksService.deleteStock(newStock).pipe(
            mergeMap(() => {
              const purchaseCost = parseFloat(newStock.price) * newStock.count;
              const newBalance = currentBalance + purchaseCost;
              return [
                new stockActions.UpdateStockSuccessDelete(newStock),
                new fromAppStore.UpdateBalance(newBalance),
                new fromAppStore.SnackbarOpen({
                  message: 'Stock got sold',
                  action: 'Success'
                })
              ];
            }),
            catchError(err => of(new stockActions.UpdateStockFail(err)))
          );
        }
      }
    )
  );
}
