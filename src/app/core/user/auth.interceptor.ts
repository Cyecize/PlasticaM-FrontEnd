import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RouteNavigator} from '../routing/route-navigator.service';
import {AppRoutingPath} from '../../app-routing.path';
import {tap} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {COOKIE_AUTH_TOKEN_NAME} from '../general.constants';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private nav: RouteNavigator,
              private cookieService: CookieService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(
      () => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }

          this.cookieService.set(COOKIE_AUTH_TOKEN_NAME, '', undefined, '/');
          this.nav.navigate(AppRoutingPath.LOGIN);
        }
      }));
  }
}
