import { Observable } from 'rxjs/Observable';
import { SchofeatLoginState } from './interfaces/schofeat-login.interfaces';
import { createSelector } from '@ngrx/store';


export const getIsSubmitting = (state: SchofeatLoginState) => state.isSubmitting;
export const getHasError = (state: SchofeatLoginState) => state.hasError;
export const getErrorMessage = (state: SchofeatLoginState) => state.errorMessage;
export const getIsCompleted = (state: SchofeatLoginState) => state.isCompleted;
