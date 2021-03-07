import {Injectable} from '@angular/core';
import {ProductQuery} from './product.query';
import {Observable} from 'rxjs';
import {Page} from '../../shared/util/page';
import {ProductModel} from './product.model';
import {ProductRepository} from './product.repository';

@Injectable({providedIn: 'root'})
export class ProductService {

  constructor(private repository: ProductRepository) {
  }

  public getProducts(query: ProductQuery): Observable<Page<ProductModel>> {
    return this.repository.search(query);
  }

  public getProduct(prodId: number): Observable<ProductModel | null> {
    return this.repository.findOne(prodId);
  }
}
