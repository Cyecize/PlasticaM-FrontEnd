import {Injectable} from '@angular/core';
import {HttpClientService} from '../../../shared/http/http-client.service';
import {ProductSpecificationQuery} from './product-specification.query';
import {Observable} from 'rxjs';
import {ProductSpecificationModel} from './product-specification.model';
import {Endpoints} from '../../../shared/http/endpoints';
import {EditProductSpecificationModel} from './edit-product-specification.model';
import {RouteUtils} from '../../routing/route-utils';
import {HttpClientSecuredService} from '../../../shared/http/http-client-secured.service';

@Injectable({providedIn: 'root'})
export class ProductSpecificationRepository {
  constructor(private http: HttpClientService,
              private httpSecure: HttpClientSecuredService) {
  }

  public search(query: ProductSpecificationQuery): Observable<Map<number, ProductSpecificationModel[]>> {
    return this.http.post<ProductSpecificationQuery, Map<number, ProductSpecificationModel[]>>(Endpoints.PRODUCT_SPECS_SEARCH, query);
  }

  public put(id: number, data: EditProductSpecificationModel): Observable<ProductSpecificationModel> {
    return this.httpSecure.put(RouteUtils.setPathParams(Endpoints.PRODUCT_SPECIFICATION, {id}), data);
  }
}
