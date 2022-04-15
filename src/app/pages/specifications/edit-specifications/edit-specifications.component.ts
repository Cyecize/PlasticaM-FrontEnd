import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslatorService} from '../../../core/translate/translator.service';
import {SpecificationTypeService} from '../../../core/product/productspec/specification-type.service';
import {FieldError} from '../../../shared/field-error/field-error';
import {ProductCategory} from '../../../core/product-category/product.category.model';
import {ProductCategoryService} from '../../../core/product-category/product.category.service';
import {EmptyPage, Page} from '../../../shared/util/page';
import {SpecificationTypeModel} from '../../../core/product/productspec/specification-type.model';
import {SpecificationCategoryModel} from '../../../core/product/productspec/specification-category.model';

@Component({
  selector: 'app-edit-specifications',
  templateUrl: './edit-specifications.component.html',
  styleUrls: ['./edit-specifications.component.scss']
})
export class EditSpecificationsComponent implements OnInit {

  assignForm!: FormGroup;
  newValueForm!: FormGroup;
  errors: FieldError[] = [];

  categories: ProductCategory[] = [];
  allSpecificationTypes: Page<SpecificationTypeModel> = new EmptyPage();

  specificationTypesForCategory: Page<SpecificationTypeModel> = new EmptyPage();

  @ViewChild('selectForUnAssign')
  private selectForUnAssign!: ElementRef;
  specificationTypesForCategoryUnAssign: Page<SpecificationTypeModel> = new EmptyPage();

  constructor(private fb: FormBuilder,
              public translatorService: TranslatorService,
              private specificationTypeService: SpecificationTypeService,
              private productCategoryService: ProductCategoryService) {
  }

  ngOnInit(): void {
    this.assignForm = this.fb.group({
      specificationTypeId: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
    this.newValueForm = this.fb.group({});
    this.productCategoryService.getCategories().subscribe(value => this.categories = value);
    this.specificationTypeService.search({page: {page: 0, size: 1000}, categoryIds: []})
      .subscribe(value => this.allSpecificationTypes = value);
  }

  categoryForAssignSelected(): void {
    this.assignForm.get('specificationTypeId')?.reset();
    // @ts-ignore
    const categoryId: number = this.assignForm.get('categoryId')?.value;
    if (!categoryId) {
      return;
    }
    this.specificationTypeService.search({
      categoryIds: [categoryId],
      page: {page: 0, size: 1000}
    }).subscribe(value => this.specificationTypesForCategory = value);
  }

  categoryForUnAssignSelected(): void {
    const categoryId = this.selectForUnAssign.nativeElement.value;
    if (!categoryId) {
      return;
    }
    this.specificationTypeService.search({
      categoryIds: [categoryId],
      page: {page: 0, size: 1000}
    }).subscribe(value => this.specificationTypesForCategoryUnAssign = value);
  }

  getUnassignedSpecifications(): SpecificationTypeModel[] {
    return this.allSpecificationTypes.elements
      .filter(spec => this.specificationTypesForCategory.elements.filter(value => value.id === spec.id).length <= 0);
  }

  async onFormSubmitAssign(): Promise<void> {
    const data: SpecificationCategoryModel = this.assignForm.value;
    this.assignForm.reset();

    await this.specificationTypeService.assignSpecificationToCategory(data);
    this.categoryForAssignSelected();
  }

  async unAssignSpecification(specId: number): Promise<void> {
    const categoryId = this.selectForUnAssign.nativeElement.value;
    if (!categoryId) {
      return;
    }

    await this.specificationTypeService.unAssignSpecificationToCategory({
      specificationTypeId: specId,
      categoryId
    });

    this.selectForUnAssign.nativeElement.selectedIndex = 0;
    this.specificationTypesForCategoryUnAssign = new EmptyPage();
  }
}
