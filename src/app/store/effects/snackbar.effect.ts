import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';

import { Actions, Effect, ofType } from '@ngrx/effects';
import * as snackbarActions from '../actions/snackbar.action';

import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

@Injectable()
export class SnackbarEffects {
  @Effect({
    dispatch: false
  })
  closeSnackbar$: Observable<any> = this.actions.pipe(
    ofType(snackbarActions.SNACKBAR_CLOSE),
    tap(() => this.matSnackBar.dismiss())
  );

  @Effect()
  showSnackbar$: Observable<any> = this.actions.pipe(
    ofType<snackbarActions.SnackbarOpen>(snackbarActions.SNACKBAR_OPEN),
    map((action: snackbarActions.SnackbarOpen) => action.payload),
    tap(payload =>
      this.matSnackBar.open(payload.message, payload.action, payload.config)
    ),
    delay(4000),
    map(() => new snackbarActions.SnackbarClose())
  );

  constructor(private actions: Actions, private matSnackBar: MatSnackBar) {}
}
