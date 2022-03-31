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

  public loadSpecificationTypes(query: SpecificationTypeQuery): void {
    if (!query.categoryIds) {
      return;
    }

    this.repository.search(query).subscribe(value => this.specificationTypes.next(value));
  }
}
