import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/startWith';


import * as schofeatLoginActions from './schofeat-login.actions';
import { SchofeatLoginInfo, SchofeatLoginState } from './interfaces/schofeat-login.interfaces';
import { SchofeatLoginBackendService } from './schofeat-login-backend.service';
@Injectable()

export class SchoFeatLoginEffects{

  constructor(private actions$: Actions,
    private backendService: SchofeatLoginBackendService,
    private router: Router,
  ) { }

  @Effect()
    loginInfo$: Observable<Action> = this.actions$
    .ofType<schofeatLoginActions.Login>(schofeatLoginActions.ActionTypes.LOGIN)
    .map((action: schofeatLoginActions.Login) => {           
        return action.payload})
    .switchMap((request:SchofeatLoginInfo) => this.backendService.login(request)
      .map((response: string) => {
          console.log(response);          
       return new schofeatLoginActions.LoginSuccess(response)})
      .catch(error => of(new schofeatLoginActions.LoginFail(error)))
    );

    @Effect({ dispatch: false })
    submitSuccess$ = this.actions$
      .ofType(schofeatLoginActions.ActionTypes.LOGIN_SUCCESS)
      .do(() => {
        this.router.navigate(['/dashboard']);
      });


}
