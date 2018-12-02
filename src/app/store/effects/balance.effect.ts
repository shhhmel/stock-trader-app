// Angular
import { Injectable } from '@angular/core';

// @ngrx
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromBalanceActions from '../actions/balance.action';
import * as fromBalanceSelectors from '../selectors/balance.selectors';
// import * as fromBalanceStore from '../index';
import * as fromMarketsStore from '../../markets/store';

// RxJS
import { of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

// Services
import { BalanceService } from '../../services/balance/balance.service';

// Interfaces
import { Balance } from '../../models/balance.model';

@Injectable()
export class BalanceEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<any>,
    private balanceService: BalanceService
  ) {}

  @Effect()
  loadBalance$ = this.actions$.pipe(
    ofType(fromBalanceActions.LOAD_BALANCE),
    switchMap(() => {
      return this.balanceService.getBalance().pipe(
        map(balance => new fromBalanceActions.LoadBalanceSuccess(balance)),
        catchError(err => of(new fromBalanceActions.LoadBalanceFail(err)))
      );
    })
  );

  @Effect()
  changeBalance$ = this.actions$.pipe(
    ofType(fromBalanceActions.UPDATE_BALANCE),
    switchMap((action: fromBalanceActions.UpdateBalance) => {
      return this.balanceService.updateBalance(action.payload).pipe(
        map(balance => new fromBalanceActions.LoadBalanceSuccess(balance)),
        catchError(err => of(new fromBalanceActions.LoadBalanceFail(err)))
      );
    })
  );
}
