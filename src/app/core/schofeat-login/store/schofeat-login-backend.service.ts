import { Injectable, Optional } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpClient } from "@angular/common/http";


import { SchofeatLoginInfo, SchofeatLoginState } from './interfaces/schofeat-login.interfaces';
import { BackendBaseService } from "../../../core/services/backend-base.service";

@Injectable()

export class SchofeatLoginBackendService extends BackendBaseService {

  constructor(private _http: HttpClient) { super(); }
  login(request: SchofeatLoginInfo): Observable<string> {       
    return Observable.of(this.getEncrptedLogin(request));
  }

  getEncrptedLogin(request:SchofeatLoginInfo){
      return btoa(btoa(request.username+request.password));
  }

}
