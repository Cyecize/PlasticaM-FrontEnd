import {Injectable} from '@angular/core';
import {HttpClientService} from '../../shared/http/http-client.service';
import {Observable} from 'rxjs';
import {ContactInfoModel} from './contact-info.model';
import {Endpoints} from '../../shared/http/endpoints';

@Injectable({providedIn: 'root'})
export class ContactInfoRepository {

  constructor(private http: HttpClientService) {

  }

  public fetch(): Observable<ContactInfoModel> {
    return this.http.get<ContactInfoModel>(Endpoints.CONTACTS);
  }
}
