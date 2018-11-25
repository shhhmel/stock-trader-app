// Angular
import { Injectable } from '@angular/core';

// @ngrx
import { Effect, Actions, ofType } from '@ngrx/effects';

// RxJS
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

// Services
import { MarketsService } from '../../services/markets/markets.service';

import * as marketActions from '../actions/markets.action';

@Injectable()
export class MarketsEffects {
  constructor(
    private actions$: Actions,
    private marketsService: MarketsService
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
}
