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

  public async searchSpecifications(query: ProductSpecificationQuery): Promise<void> {
    if (!query.specificationTypeIds || !query.specificationTypeIds.length) {
      return;
    }

    const result = await this.repository.search(query).toPromise();
    const map = new Map<number, ProductSpecificationModel[]>();

    // @ts-ignore
    Object.keys(result).forEach(id => map.set(Number(id), result[id]));
    this.specifications.next(map);
  }
}
