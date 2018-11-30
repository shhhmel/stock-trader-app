// Angular
import { Injectable } from '@angular/core';

// @ngrx
import { Effect, Actions, ofType } from '@ngrx/effects';

// RxJS
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

// Services
import { BalanceService } from '../../services/balance/balance.service';

import * as balanceActions from '../actions/balance.action';

@Injectable()
export class BalanceEffects {
  constructor(
    private actions$: Actions,
    private balanceService: BalanceService
  ) {}

  @Effect()
  loadBalance$ = this.actions$.pipe(
    ofType(balanceActions.LOAD_BALANCE),
    switchMap(() => {
      return this.balanceService.getBalance().pipe(
        map(balance => new balanceActions.LoadBalanceSuccess(balance)),
        catchError(err => of(new balanceActions.LoadBalanceFail(err)))
      );
    })
  );
}
