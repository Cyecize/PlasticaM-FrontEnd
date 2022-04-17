import {Injectable} from '@angular/core';
import {ProductQuery} from './product.query';
import {Observable} from 'rxjs';
import {Page} from '../../shared/util/page';
import {ProductModel} from './product.model';
import {ProductRepository} from './product.repository';
import {FieldError} from '../../shared/field-error/field-error';
import {FieldErrorWrapper} from '../../shared/util/field-error-wrapper';
import {CreateProductModel} from './create-product.model';

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

  public async createProduct(data: CreateProductModel): Promise<FieldError[]> {
    const res = await new FieldErrorWrapper(() => this.repository.create(data)).execute<ProductModel>();
    if (res.hasOwnProperty('id')) {
      return [];
    }

    return res as FieldError[];
  }

  public async updateProduct(id: number, data: CreateProductModel): Promise<FieldError[]> {
    const res = await new FieldErrorWrapper(() => this.repository.update(id, data)).execute<ProductModel>();
    if (res.hasOwnProperty('id')) {
      return [];
    }

    return res as FieldError[];
  }
}
