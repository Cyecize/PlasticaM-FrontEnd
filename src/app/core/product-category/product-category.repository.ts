import {Injectable} from '@angular/core';
import {HttpClientService} from '../../shared/http/http-client.service';
import {Observable} from 'rxjs';
import {ProductCategory} from './product.category.model';
import {Endpoints} from '../../shared/http/endpoints';
import {HttpClientSecuredService} from '../../shared/http/http-client-secured.service';
import {CreateProductCategoryModel} from './create-product-category.model';
import {RouteUtils} from '../routing/route-utils';

@Injectable({providedIn: 'root'})
export class ProductCategoryRepository {

  constructor(private http: HttpClientService,
              private httpSecured: HttpClientSecuredService) {

  }

  fetch(): Observable<ProductCategory[]> {
    return this.http.get(Endpoints.CATEGORIES);
  }

  post(data: CreateProductCategoryModel): Observable<ProductCategory> {
    return this.httpSecured.post(Endpoints.CATEGORIES, data);
  }

  get(catId: number): Observable<ProductCategory> {
    return this.http.get(RouteUtils.setPathParams(Endpoints.CATEGORY, {catId}));
  }

  put(catId: number, model: CreateProductCategoryModel): Observable<ProductCategory> {
    return this.httpSecured.put(RouteUtils.setPathParams(Endpoints.CATEGORY, {catId}), model);
  }
}
