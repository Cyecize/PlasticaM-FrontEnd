import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FieldError} from '../../../shared/field-error/field-error';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslatorService} from '../../../core/translate/translator.service';
import {SpecificationTypeService} from '../../../core/product/productspec/specification-type.service';
import {ProductCategoryService} from '../../../core/product-category/product.category.service';
import {ProductCategory} from '../../../core/product-category/product.category.model';
import {SpecificationTypeModel} from '../../../core/product/productspec/specification-type.model';
import {EmptyPage, Page} from '../../../shared/util/page';
import {EditSpecificationTypeModel} from '../../../core/product/productspec/edit-specification-type.model';
import {RouteNavigator} from '../../../core/routing/route-navigator.service';
import {AppRoutingPath} from '../../../app-routing.path';

@Component({
  selector: 'app-edit-specification-type',
  templateUrl: './edit-specification-type.component.html',
  styleUrls: ['./edit-specification-type.component.scss']
})
export class EditSpecificationTypeComponent implements OnInit {

  errors: FieldError[] = [];
  form!: FormGroup;

  categories: ProductCategory[] = [];
  specificationTypes: Page<SpecificationTypeModel> = new EmptyPage();
  specificationType!: SpecificationTypeModel;

  @ViewChild('categorySelect')
  categorySelect!: ElementRef;

  @ViewChild('specTypeSelect')
  specTypeSelect!: ElementRef;

  constructor(private fb: FormBuilder,
              public translatorService: TranslatorService,
              private specificationTypeService: SpecificationTypeService,
              private productCategoryService: ProductCategoryService,
              private nav: RouteNavigator) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      titleBg: ['', Validators.required],
      titleEn: ['', Validators.required],
    });

    this.productCategoryService.getCategories().subscribe(value => this.categories = value);
  }

  categorySelected(): void {
    const categoryId = this.categorySelect.nativeElement.value;
    this.specificationTypes = new EmptyPage();
    this.form.reset();
    this.specTypeSelect.nativeElement.selectedIndex = 0;
    // @ts-ignore
    this.specificationType = undefined;
    if (!categoryId) {
      return;
    }

    this.specificationTypeService.search({categoryIds: [Number(categoryId)], page: {page: 0, size: 1000}})
      .subscribe(value => this.specificationTypes = value);
  }

  specificationTypeSelected(): void {
    const specId = this.specTypeSelect.nativeElement.value;
    this.specificationType = this.specificationTypes.elements.filter(value => value.id === Number(specId))[0];
    this.form.patchValue(this.specificationType);
  }

  async onFormSubmit(): Promise<void> {
    const data: EditSpecificationTypeModel = this.form.value;
    this.errors = await this.specificationTypeService.editSpecificationType(this.specificationType.id, data);
    if (this.errors.length <= 0) {
      this.nav.navigate(AppRoutingPath.ADMIN_PANEL);
    }
  }
}
