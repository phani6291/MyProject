import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Effect, Actions  } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/startWith';


import * as registrationActions from './registration.actions';
import { RegistrationInfo } from './registration.interface'
import { RegistrationBackendService } from './registration-backend.service';
@Injectable()

export class RegistrationEffects{

  constructor(private actions$: Actions,
    private backendService: RegistrationBackendService,
    private router: Router,
  ) { }

  @Effect()
    loginInfo$: Observable<Action> = this.actions$
    .ofType<registrationActions.Register>(registrationActions.ActionTypes.REGISTER)
    .map((action: registrationActions.Register) => {           
        return action.payload})
    .switchMap((request:RegistrationInfo) => this.backendService.login(request)
      .map((response: string) => {
          console.log(response);          
       return new registrationActions.RegisterSuccess(response)})
      .catch(error => of(new registrationActions.RegisterFail(error)))
    );

    @Effect({ dispatch: false })
    submitSuccess$ = this.actions$
      .ofType(registrationActions.ActionTypes.REGISTER)
      .do(() => {
        this.router.navigate(['/dashboard']);
      });


}
