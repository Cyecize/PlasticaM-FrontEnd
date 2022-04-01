import {Injectable} from '@angular/core';
import {ProductSpecificationRepository} from './product-specification.repository';
import {BehaviorSubject} from 'rxjs';
import {ProductSpecificationModel} from './product-specification.model';
import {ProductSpecificationQuery} from './product-specification.query';

@Injectable({providedIn: 'root'})
export class ProductSpecificationService {
  private readonly specifications: BehaviorSubject<Map<number, ProductSpecificationModel[]>>
    = new BehaviorSubject<Map<number, ProductSpecificationModel[]>>(new Map<number, ProductSpecificationModel[]>());

  public readonly specifications$ = this.specifications.asObservable();

  constructor(private repository: ProductSpecificationRepository) {
  }

  public searchSpecifications(query: ProductSpecificationQuery): void {
    if (!query.specificationTypeIds || !query.specificationTypeIds.length) {
      return;
    }

    this.repository.search(query).subscribe(value => {
      const map = new Map<number, ProductSpecificationModel[]>();

      // @ts-ignore
      Object.keys(value).forEach(id => map.set(Number(id), value[id]));
      this.specifications.next(map);
    });
  }
}
