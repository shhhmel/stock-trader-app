import { MatSnackBarConfig } from '@angular/material';
import { Action } from '@ngrx/store';

export const SNACKBAR_OPEN = '[Snackbar] Snackbar Open';
export const SNACKBAR_CLOSE = '[Snackbar] Snackbar Close';

export class SnackbarOpen implements Action {
  readonly type = SNACKBAR_OPEN;

  constructor(
    public payload: {
      message: string;
      action?: string;
      config?: MatSnackBarConfig;
    }
  ) {}
}

export class SnackbarClose implements Action {
  readonly type = SNACKBAR_CLOSE;
}

export type SnackbarActions = SnackbarOpen | SnackbarClose;
