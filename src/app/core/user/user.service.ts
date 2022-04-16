import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from './user.model';
import {UserRepository} from './user.repository';
import {ObjectUtils} from '../../shared/util/object-utils';
import {CookieService} from 'ngx-cookie-service';
import {COOKIE_AUTH_TOKEN_NAME} from '../general.constants';
import {FieldError} from '../../shared/field-error/field-error';
import {FieldErrorWrapper} from '../../shared/util/field-error-wrapper';
import {HttpClientService} from '../../shared/http/http-client.service';
import {Endpoints} from '../../shared/http/endpoints';
import {LoginModel} from './login.model';
import {AuthTokenModel} from './auth-token.model';
import {HttpClientSecuredService} from '../../shared/http/http-client-secured.service';
import {UserRole} from './user.role';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserService {
  private readonly currentUser: BehaviorSubject<UserModel | undefined> = new BehaviorSubject<UserModel | undefined>(undefined);
  public readonly currentUser$ = this.currentUser.asObservable();

  constructor(private repository: UserRepository,
              private cookieService: CookieService,
              private http: HttpClientService,
              private authenticatedHttp: HttpClientSecuredService) {
    this.tryGetUser();
  }

  public hasRole(role: UserRole): Observable<boolean> {
    return this.currentUser$.pipe(map(value => {
      if (ObjectUtils.isNil(value)) {
        return false;
      }

      return (value as UserModel).roles?.includes(role);
    }));
  }

  public async login(loginModel: LoginModel): Promise<FieldError[]> {
    const result = await new FieldErrorWrapper(() => this.http.post(Endpoints.LOGIN, loginModel)).execute<AuthTokenModel>();

    if (result.hasOwnProperty('lastAccessDate')) {
      const token: AuthTokenModel = result as AuthTokenModel;
      this.cookieService.set(COOKIE_AUTH_TOKEN_NAME, token.id, undefined, '/');
      this.tryGetUser();
      return [];
    }

    return result as FieldError[];
  }

  public async logout(): Promise<void> {
    await this.authenticatedHttp.post(Endpoints.LOGOUT, {}).toPromise();
    this.cookieService.set(COOKIE_AUTH_TOKEN_NAME, '', undefined, '/');
    this.currentUser.next(undefined);
  }

  private tryGetUser(): void {
    const token = this.cookieService.get(COOKIE_AUTH_TOKEN_NAME);

    if (!ObjectUtils.isNil(token) && token.trim() !== '') {
      this.repository.fetch().subscribe(value => {
        this.currentUser.next(value);
      });
    }
  }
}
