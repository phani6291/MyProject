import { Observable } from 'rxjs/Observable';
import { createSelector } from '@ngrx/store';
import { RegistrationState } from './registration.interface';


export const getIsSubmitting = (state: RegistrationState) => state.isSubmitting;
export const getHasError = (state: RegistrationState) => state.hasError;
export const getErrorMessage = (state: RegistrationState) => state.errorMessage;
export const getIsCompleted = (state: RegistrationState) => state.isCompleted;
