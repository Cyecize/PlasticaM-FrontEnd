import {Injectable} from '@angular/core';
import {ProductQuery} from './product.query';
import {Observable} from 'rxjs';
import {Page} from '../../shared/util/page';
import {ProductModel} from './product.model';
import {products} from './product.data';
import {ObjectUtils} from '../../shared/util/object-utils';

@Injectable({providedIn: 'root'})
export class ProductService {

  public getProducts(query: ProductQuery): Observable<Page<ProductModel>> {
    let prods = products;

    if (query.categoryIds.length > 0) {
      prods = prods.filter(prod => query.categoryIds.includes(prod.categoryId));
    }

    if (!ObjectUtils.isNil(query.search)) {
      const search: string = (query.search + '').toLowerCase();
      prods = prods.filter(prod => prod.name.toLowerCase().indexOf(search) > -1);
    }

    return new Observable<Page<ProductModel>>(subscriber => {
      setTimeout(() => {
        subscriber.next({
          elements: prods,
          itemsCount: prods.length,
          pageable: {page: 1, size: prods.length + 100},
          pages: 1
        });
      }, 500);
    });
  }

  public getProduct(prodId: number): Observable<ProductModel | null> {
    const prods = products.filter(prod => prod.id === prodId);
    const product = prods.length < 1 ? null : prods[0];

    return new Observable(subscriber => subscriber.next(product));
  }
}
