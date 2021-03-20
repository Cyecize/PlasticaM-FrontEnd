import {Injectable} from '@angular/core';
import {HttpClientSecuredService} from '../../shared/http/http-client-secured.service';
import {Observable} from 'rxjs';
import {UserModel} from './user.model';
import {Endpoints} from '../../shared/http/endpoints';

@Injectable({providedIn: 'root'})
export class UserRepository {
  constructor(private http: HttpClientSecuredService) {

  }

  public fetch(): Observable<UserModel> {
    return this.http.get<UserModel>(Endpoints.USER_DETAILS);
  }
}
