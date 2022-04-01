import {Injectable} from '@angular/core';
import {HttpClientService} from '../../../shared/http/http-client.service';
import {ProductSpecificationQuery} from './product-specification.query';
import {Observable} from 'rxjs';
import {ProductSpecificationModel} from './product-specification.model';
import {Endpoints} from '../../../shared/http/endpoints';

@Injectable({providedIn: 'root'})
export class ProductSpecificationRepository {
  constructor(private http: HttpClientService) {
  }

  public search(query: ProductSpecificationQuery): Observable<Map<number, ProductSpecificationModel[]>> {
    return this.http.post<ProductSpecificationQuery, Map<number, ProductSpecificationModel[]>>(Endpoints.PRODUCT_SPECS_SEARCH, query);
  }
}
