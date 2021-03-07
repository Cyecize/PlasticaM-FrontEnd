import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductCategory} from './product.category.model';
import {ProductCategoryRepository} from './product-category.repository';
import {ObjectUtils} from '../../shared/util/object-utils';

@Injectable({providedIn: 'root'})
export class ProductCategoryService {

  private categories?: ProductCategory[];
  private readonly categoriesEvent: EventEmitter<ProductCategory[]> = new EventEmitter<ProductCategory[]>();

  constructor(private repository: ProductCategoryRepository) {
    this.repository.fetch().subscribe(value => {
      this.categories = value;
      this.categoriesEvent.emit(value);
    });
  }

  public getCategories(): Observable<ProductCategory[]> {
    if (!ObjectUtils.isNil(this.categories)) {
      return new Observable<ProductCategory[]>(subscriber => subscriber.next(this.categories));
    }

    return this.categoriesEvent;
  }
}
