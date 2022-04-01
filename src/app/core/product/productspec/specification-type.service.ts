import {Injectable} from '@angular/core';
import {SpecificationTypeRepository} from './specification-type.repository';
import {BehaviorSubject} from 'rxjs';
import {EmptyPage, Page} from '../../../shared/util/page';
import {SpecificationTypeModel} from './specification-type.model';
import {SpecificationTypeQuery} from './specification-type.query';

@Injectable({providedIn: 'root'})
export class SpecificationTypeService {
  private readonly specificationTypes: BehaviorSubject<Page<SpecificationTypeModel>>
    = new BehaviorSubject<Page<SpecificationTypeModel>>(new EmptyPage());

  public readonly specificationTypes$ = this.specificationTypes.asObservable();

  constructor(private repository: SpecificationTypeRepository) {
  }

  public async loadSpecificationTypes(query: SpecificationTypeQuery): Promise<void> {
    if (!query.categoryIds || !query.categoryIds.length) {
      return;
    }

    const result = await this.repository.search(query).toPromise();
    this.specificationTypes.next(result);
  }
}