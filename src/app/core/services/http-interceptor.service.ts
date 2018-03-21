import  { 
    HttpRequest, 
    HttpHandler, 
    HttpEvent,
    HttpInterceptor, 
    HttpResponse, 
    HttpErrorResponse, 
    HttpHeaders  
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment'; // Angular CLI environment
//import { SessionStore } from '../store';
import { WeServerError } from './backend-base.service';

@Injectable()
export class SchoFeatHttpInterceptor implements HttpInterceptor{
    baseUrl =  environment.apiUrl;    
    constructor(
        //private sessionStore: SessionStore
    ){}

    private get bearerTokenValue(): string | null {
        let token: string | null;
        //this.sessionStore.token$.take(1).subscribe(t => token= t);
        return token;
      }
    
      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers= {'Content-Type': 'application/json'};
        const authHeader = this.bearerTokenValue ? {'Authorization': `Bearer ${this.bearerTokenValue}`} : null;
        const reformattedReq = req.clone({
          url: `${this.baseUrl}${req.url}`,
          setHeaders: {
            ...headers,
            ...authHeader
          }
        });
    
        return next.handle(reformattedReq)
          .map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              //this.sessionStore.serverCalled();
              if(event.body.IsSuccessful===false){
                throw(new WeServerError(event.body));
              }
              return event;
            }
          })
          .catch((error: HttpErrorResponse) => {
            if(!error || !error.error)
              return Observable.throw(new WeServerError('An error has occurred.', 'An error has occurred.'))
            if (error.status === 401 || error.status === 403) {
             // this.sessionStore.logout();
            }
            if (error.status === 404) {
              return Observable.throw(new WeServerError(error, 'Invalid procedure.'))
            }
            if(error instanceof WeServerError)
              return Observable.throw(error);
    
            try {
              return Observable.throw(new WeServerError(JSON.parse(error.error)));
            } catch(error){
              Observable.throw(new WeServerError(error,'An error has occurred.'));
            }
    
          });
      }
}