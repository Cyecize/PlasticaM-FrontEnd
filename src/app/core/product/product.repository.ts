import {Injectable} from '@angular/core';
import {ProductQuery} from './product.query';
import {Observable} from 'rxjs';
import {Page} from '../../shared/util/page';
import {ProductModel} from './product.model';
import {HttpClientService} from '../../shared/http/http-client.service';
import {Endpoints} from '../../shared/http/endpoints';
import {RouteUtils} from '../routing/route-utils';
import {HttpClientSecuredService} from '../../shared/http/http-client-secured.service';
import {CreateProductModel} from './create-product.model';

@Injectable({providedIn: 'root'})
export class ProductRepository {

  constructor(private http: HttpClientService,
              private httpSecure: HttpClientSecuredService) {
  }

  public search(query: ProductQuery): Observable<Page<ProductModel>> {
    return this.http.post(Endpoints.PRODUCTS, query);
  }

  public findOne(id: number): Observable<ProductModel | null> {
    return this.http.get(RouteUtils.setPathParams(Endpoints.PRODUCT, [id]));
  }

  public create(data: CreateProductModel): Observable<ProductModel> {
    return this.httpSecure.post(Endpoints.PRODUCT_CREATE, data);
  }
}
