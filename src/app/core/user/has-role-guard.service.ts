import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from './user.service';
import {UserRole} from './user.role';
import {CookieService} from 'ngx-cookie-service';
import {ObjectUtils} from '../../shared/util/object-utils';
import {AppRoutingPath} from '../../app-routing.path';
import {Observable} from 'rxjs';
import {COOKIE_AUTH_TOKEN_NAME} from '../general.constants';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class HasRoleGuard implements CanActivate, CanActivateChild {

  constructor(private userService: UserService,
              private cookieService: CookieService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.cookieService.get(COOKIE_AUTH_TOKEN_NAME);
    if (ObjectUtils.isNil(token) || token.trim() === '') {
      return this.router.createUrlTree([AppRoutingPath.LOGIN.absolutePath]);
    }

    const role = route.data.role as UserRole;
    return this.userService.hasRole(role).pipe(map(hasRole => {
      if (!hasRole) {
        return this.router.createUrlTree([AppRoutingPath.HOME.absolutePath]);
      }

      return true;
    }));
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
