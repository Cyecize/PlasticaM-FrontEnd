import {Injectable} from '@angular/core';
import {ProductSpecificationRepository} from './product-specification.repository';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductSpecificationModel} from './product-specification.model';
import {ProductSpecificationQuery} from './product-specification.query';
import {map} from 'rxjs/operators';
import {EditProductSpecificationModel} from './edit-product-specification.model';
import {FieldError} from '../../../shared/field-error/field-error';
import {FieldErrorWrapper} from '../../../shared/util/field-error-wrapper';

@Injectable({providedIn: 'root'})
export class ProductSpecificationService {
  private readonly specifications: BehaviorSubject<Map<number, ProductSpecificationModel[]>>
    = new BehaviorSubject<Map<number, ProductSpecificationModel[]>>(new Map<number, ProductSpecificationModel[]>());

  public readonly specifications$ = this.specifications.asObservable();

  constructor(private repository: ProductSpecificationRepository) {
  }

  public async searchSpecifications(query: ProductSpecificationQuery): Promise<void> {
    if (!query.specificationTypeIds || !query.specificationTypeIds.length) {
      return;
    }

    const result = await this.repository.search(query).toPromise();
    this.specifications.next(this.makeMap(result));
  }

  public getSpecifications(query: ProductSpecificationQuery): Observable<ProductSpecificationModel[]> {
    return this.repository.search(query).pipe(map(value => {
      const res = [];
      const valueAsMap = this.makeMap(value);
      for (const key of valueAsMap.keys()) {
        res.push(...(valueAsMap.get(key)) || []);
      }

      return res;
    }));
  }

  public async editProductSpecification(id: number, data: EditProductSpecificationModel): Promise<FieldError[]> {
    const res = await new FieldErrorWrapper(() => this.repository.put(id, data)).execute<ProductSpecificationModel>();
    if (res.hasOwnProperty('id')) {
      return [];
    }

    return res as FieldError[];
  }

  private makeMap(result: {}): Map<number, ProductSpecificationModel[]> {
    const map = new Map<number, ProductSpecificationModel[]>();
    // @ts-ignore
    Object.keys(result).forEach(id => map.set(Number(id), result[id]));
    return map;
  }
}
