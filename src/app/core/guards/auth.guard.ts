import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, Router, Route, CanLoad } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild, CanLoad{
    constructor(
        private router: Router,
       // private sessionStore: SessionStore,
 
      ) {}
    
      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
    
        return this.checkLogin(url);
      }
    
      canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> | Promise<boolean> | boolean {
          return this.canActivate(next, state);
      }
    
      canLoad(route: Route): boolean {
        let url = `/${route.path}`;
    
        return this.checkLogin(url);
      }
    
      checkLogin(url: string): boolean {
        if (this.isLoggedIn()) { return true; }        
        return true;
      }
    
      private isLoggedIn(): boolean {
        let loggedIn: boolean;
      //  this.sessionStore.isLoggedIn$.take(1).subscribe(s => loggedIn = s);
        return loggedIn;
      }
    
      private isSso(): boolean {
        let isSso: boolean;
        //this.sessionStore.isSso$.take(1).subscribe(s => isSso = s);
        // if user refreshes page, they will not have isSso state in store yet, but if they have the cookie, we assume they are an sso user.
        return isSso || this.hasAuthTokenCookie();
      }
    
      private hasAuthTokenCookie(): boolean {
        return true;//!!this.cookieService.get('AuthToken');
      }
}