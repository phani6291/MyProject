import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/take';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';

import * as actions from './registration.actions';
import * as selectors from './registration.selectors';
import { RegistrationState, RegistrationInfo } from './registration.interface';

export { RegistrationInfo, RegistrationState };

export const getRegistrationState = createFeatureSelector<RegistrationState>('registration');
export const getRegistrationIsSubmitting = createSelector(getRegistrationState, selectors.getIsSubmitting);
export const getRegistrationHasError = createSelector(getRegistrationState, selectors.getHasError);
export const getRegistrationErrorMessage = createSelector(getRegistrationState, selectors.getErrorMessage);
export const getRegistrationIsCompleted = createSelector(getRegistrationState, selectors.getIsCompleted);

@Injectable()

export class RegistrationStore {
    isSubmitting$: Observable<boolean>;
    hasError$: Observable<boolean>;
    errorMessage$: Observable<string | null>;
    isCompleted$: Observable<boolean>;

    constructor(private store: Store<any>) {
        this.isSubmitting$ = this.store.select(getRegistrationIsSubmitting);
        this.hasError$ = this.store.select(getRegistrationHasError);
        this.errorMessage$ = this.store.select(getRegistrationErrorMessage);
        this.isCompleted$ = this.store.select(getRegistrationIsCompleted);
    }

    register(registrationInfo: RegistrationInfo) {
        this.store.dispatch(new actions.Register(registrationInfo));
    }
}