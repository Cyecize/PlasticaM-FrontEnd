import {Injectable} from '@angular/core';
import {HttpClientService} from '../../../shared/http/http-client.service';
import {SpecificationTypeQuery} from './specification-type.query';
import {Observable} from 'rxjs';
import {Page} from '../../../shared/util/page';
import {SpecificationTypeModel} from './specification-type.model';
import {Endpoints} from '../../../shared/http/endpoints';
import {HttpClientSecuredService} from '../../../shared/http/http-client-secured.service';
import {SpecificationCategoryModel} from './specification-category.model';
import {RouteUtils} from '../../routing/route-utils';
import {CreateSpecificationTypeModel} from './create-specification-type.model';

@Injectable({providedIn: 'root'})
export class SpecificationTypeRepository {

  constructor(private http: HttpClientService,
              private httpSecure: HttpClientSecuredService) {

  }

  public search(query: SpecificationTypeQuery): Observable<Page<SpecificationTypeModel>> {
    return this.http.post<SpecificationTypeQuery, Page<SpecificationTypeModel>>(Endpoints.SPECIFICATION_TYPES_SEARCH, query);
  }

  public assign(data: SpecificationCategoryModel): Observable<any> {
    return this.httpSecure.put(RouteUtils.setPathParams(
      Endpoints.SPECIFICATION_CATEGORY, [data.specificationTypeId, data.categoryId]
    ), {});
  }

  public unAssign(data: SpecificationCategoryModel): Observable<any> {
    return this.httpSecure.delete(RouteUtils.setPathParams(
      Endpoints.SPECIFICATION_CATEGORY, [data.specificationTypeId, data.categoryId]
    ));
  }

  public create(data: CreateSpecificationTypeModel): Observable<SpecificationTypeModel> {
    return this.httpSecure.post(Endpoints.SPECIFICATION_TYPES, data);
  }
}
