import {Injectable} from '@angular/core';
import {HttpClientService} from '../../shared/http/http-client.service';
import {Observable} from 'rxjs';
import {ProductCategory} from './product.category.model';
import {Endpoints} from '../../shared/http/endpoints';

@Injectable({providedIn: 'root'})
export class ProductCategoryRepository {

  constructor(private http: HttpClientService) {

  }

  fetch(): Observable<ProductCategory[]> {
    return this.http.get(Endpoints.CATEGORIES);
  }
}
