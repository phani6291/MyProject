import { Injectable, Optional } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from "@angular/common/http";

import { BackendBaseService } from 'app/core/services/backend-base.service';
import { RegistrationInfo } from './registration.interface';


@Injectable()

export class RegistrationBackendService extends BackendBaseService {

  constructor(private _http: HttpClient) { super(); }
  login(request: RegistrationInfo): Observable<string> {       
    return Observable.of('Success');
  }

}
