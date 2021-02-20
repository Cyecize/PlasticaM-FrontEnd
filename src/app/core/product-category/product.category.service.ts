import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductCategory} from './product.category.model';
import {productCategories} from './product.categories.data';

@Injectable({providedIn: 'root'})
export class ProductCategoryService {

  public getCategories(): Observable<ProductCategory[]> {
    return new Observable<ProductCategory[]>(subscriber => subscriber.next(productCategories));
  }
}
