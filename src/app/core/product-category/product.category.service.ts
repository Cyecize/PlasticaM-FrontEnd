import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductCategory} from './product.category.model';
import {productCategories} from './product.categories.data';

@Injectable({providedIn: 'root'})
export class ProductCategoryService {

  public getCategories(): Observable<ProductCategory[]> {
    return new Observable<ProductCategory[]>(subscriber => subscriber.next(productCategories));
  }

  public async getCategory(id: number | any): Promise<ProductCategory | null> {
    // tslint:disable-next-line:triple-equals
    const categories: ProductCategory[] = productCategories.filter(c => c.id == id);
    return categories.length > 0 ? categories[0] : null;
  }
}
