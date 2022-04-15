import {Injectable} from '@angular/core';
import {SpecificationTypeRepository} from './specification-type.repository';
import {BehaviorSubject, Observable} from 'rxjs';
import {EmptyPage, Page} from '../../../shared/util/page';
import {SpecificationTypeModel} from './specification-type.model';
import {SpecificationTypeQuery} from './specification-type.query';
import {SpecificationCategoryModel} from './specification-category.model';
import {CreateSpecificationTypeModel} from './create-specification-type.model';
import {FieldError} from '../../../shared/field-error/field-error';
import {FieldErrorWrapper} from '../../../shared/util/field-error-wrapper';

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

  public search(query: SpecificationTypeQuery): Observable<Page<SpecificationTypeModel>> {
    return this.repository.search(query);
  }

  async assignSpecificationToCategory(data: SpecificationCategoryModel): Promise<void> {
    await this.repository.assign(data).toPromise();
  }

  async unAssignSpecificationToCategory(data: SpecificationCategoryModel): Promise<void> {
    await this.repository.unAssign(data).toPromise();
  }

  async createSpecificationType(data: CreateSpecificationTypeModel): Promise<FieldError[]> {
    const res = await new FieldErrorWrapper(() => this.repository.create(data)).execute<SpecificationTypeModel>();
    if (res.hasOwnProperty('id')) {
      return [];
    }

    return res as FieldError[];
  }
}
