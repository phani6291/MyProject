import { Action } from '@ngrx/store';

import * as schofeatLoginActions from './schofeat-login.actions';
import { SchofeatLoginInfo, SchofeatLoginState } from './interfaces/schofeat-login.interfaces';

export const initialFormState:SchofeatLoginState={
    isSubmitting: false,    
    hasError: false,
    errorMessage: null,
    isCompleted: false,
}

export function reducer(state = initialFormState, action: schofeatLoginActions.Actions): SchofeatLoginState {
  switch (action.type) {
    case schofeatLoginActions.ActionTypes.LOGIN:
      return {          
        ...state,
        isSubmitting: true,
        hasError: false,
        errorMessage: null,
        isCompleted: false
      };
    case schofeatLoginActions.ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        hasError: false,
        errorMessage: null,
        isCompleted: true
      };
    case schofeatLoginActions.ActionTypes.LOGIN_FAIL:
      return {
        ...state,
        isSubmitting: false,
        hasError: true,
        errorMessage: action.payload,
        isCompleted: false
      };   

    default:
      return state;
  }
}
