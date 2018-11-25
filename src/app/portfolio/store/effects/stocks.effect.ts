// Angular
import { Injectable } from '@angular/core';

// @ngrx
import { Effect, Actions, ofType } from '@ngrx/effects';

// RxJS
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

// Services
import { StocksService } from '../../services/stocks/stocks.service';

import * as stockActions from '../actions/stock.action';

@Injectable()
export class StocksEffects {
  constructor(
    private actions$: Actions,
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
}
