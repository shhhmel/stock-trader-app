import * as snackbarActions from '../actions/snackbar.action';

export interface State {
  show: boolean;
}

const initialState: State = {
  show: false
};

export function reducer(
  state: State = initialState,
  action: snackbarActions.SnackbarActions
) {
  switch (action.type) {
    case snackbarActions.SNACKBAR_CLOSE: {
      return { ...state, show: false };
    }

    case snackbarActions.SNACKBAR_OPEN: {
      return { ...state, show: true };
    }
  }
}
