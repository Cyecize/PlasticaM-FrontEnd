import {Injectable} from '@angular/core';
import {HttpClientService} from '../../../shared/http/http-client.service';
import {SpecificationTypeQuery} from './specification-type.query';
import {Observable} from 'rxjs';
import {Page} from '../../../shared/util/page';
import {SpecificationTypeModel} from './specification-type.model';
import {Endpoints} from '../../../shared/http/endpoints';

@Injectable({providedIn: 'root'})
export class SpecificationTypeRepository {

  constructor(private http: HttpClientService) {

  }

  public search(query: SpecificationTypeQuery): Observable<Page<SpecificationTypeModel>> {
    return this.http.post<SpecificationTypeQuery, Page<SpecificationTypeModel>>(Endpoints.SPECIFICATION_TYPES_SEARCH, query);
  }
}