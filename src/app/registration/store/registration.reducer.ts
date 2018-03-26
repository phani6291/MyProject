import { Action } from '@ngrx/store';

import * as registrationActions from './registration.actions';
import { RegistrationState } from './registration.interface';


export const initialFormState:RegistrationState={
    isSubmitting: false,    
    hasError: false,
    errorMessage: null,
    isCompleted: false,
}

export function reducer(state = initialFormState, action: registrationActions.Actions): RegistrationState {
  switch (action.type) {
    case registrationActions.ActionTypes.REGISTER:
      return {          
        ...state,
        isSubmitting: true,
        hasError: false,
        errorMessage: null,
        isCompleted: false
      };
    case registrationActions.ActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        hasError: false,
        errorMessage: null,
        isCompleted: true
      };
    case registrationActions.ActionTypes.REGISTER_FAIL:
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
