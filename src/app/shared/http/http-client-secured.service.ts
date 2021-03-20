import {Injectable} from '@angular/core';
import {HttpClientService} from './http-client.service';
import {HttpHeader} from './http-header';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {COOKIE_AUTH_TOKEN_NAME, HEADER_AUTH_TOKEN_NAME} from '../../core/general.constants';

@Injectable({providedIn: 'root'})
export class HttpClientSecuredService extends HttpClientService {

  constructor(httpClient: HttpClient,
              private cookieService: CookieService) {
    super(httpClient);
  }

  protected getHeaders(): HttpHeader {
    const headers = super.getHeaders();

    const authToken = this.cookieService.get(COOKIE_AUTH_TOKEN_NAME);
    headers[HEADER_AUTH_TOKEN_NAME] = authToken || '';

    return headers;
  }
}
