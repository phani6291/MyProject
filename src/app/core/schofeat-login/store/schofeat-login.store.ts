import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/take';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';

import { SchofeatLoginState, SchofeatLoginInfo } from './interfaces/schofeat-login.interfaces';
import * as actions from './schofeat-login.actions';
import * as selectors from './schofeat-login.selectors';

export { SchofeatLoginState, SchofeatLoginInfo };

export const getSchofeatLoginState = createFeatureSelector<SchofeatLoginState>('schofeatLogin');
export const getSchofeatLoginIsSubmitting = createSelector(getSchofeatLoginState, selectors.getIsSubmitting);
export const getSchofeatLoginHasError = createSelector(getSchofeatLoginState, selectors.getHasError);
export const getSchofeatLoginErrorMessage = createSelector(getSchofeatLoginState, selectors.getErrorMessage);
export const getSchofeatLoginIsCompleted = createSelector(getSchofeatLoginState, selectors.getIsCompleted);

@Injectable()

export class SchoFeatLoginStore {
    isSubmitting$: Observable<boolean>;
    hasError$: Observable<boolean>;
    errorMessage$: Observable<string | null>;
    isCompleted$: Observable<boolean>;

    constructor(private store: Store<any>) {
        this.isSubmitting$ = this.store.select(getSchofeatLoginIsSubmitting);
        this.hasError$ = this.store.select(getSchofeatLoginHasError);
        this.errorMessage$ = this.store.select(getSchofeatLoginErrorMessage);
        this.isCompleted$ = this.store.select(getSchofeatLoginIsCompleted);
    }

    login(schofeatLoginInfo: SchofeatLoginInfo) {
        this.store.dispatch(new actions.Login(schofeatLoginInfo));
    }
}