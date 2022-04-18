import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FieldError} from '../../../shared/field-error/field-error';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductCategory} from '../../../core/product-category/product.category.model';
import {EmptyPage, Page} from '../../../shared/util/page';
import {SpecificationTypeModel} from '../../../core/product/productspec/specification-type.model';
import {TranslatorService} from '../../../core/translate/translator.service';
import {SpecificationTypeService} from '../../../core/product/productspec/specification-type.service';
import {ProductCategoryService} from '../../../core/product-category/product.category.service';
import {RouteNavigator} from '../../../core/routing/route-navigator.service';
import {AppRoutingPath} from '../../../app-routing.path';
import {ProductSpecificationModel} from '../../../core/product/productspec/product-specification.model';
import {ProductSpecificationService} from '../../../core/product/productspec/product-specification.service';
import {EditProductSpecificationModel} from '../../../core/product/productspec/edit-product-specification.model';

@Component({
  selector: 'app-edit-product-specification',
  templateUrl: './edit-product-specification.component.html',
  styleUrls: ['./edit-product-specification.component.scss']
})
export class EditProductSpecificationComponent implements OnInit {

  errors: FieldError[] = [];
  form!: FormGroup;

  categories: ProductCategory[] = [];
  specificationTypes: Page<SpecificationTypeModel> = new EmptyPage();
  productSpecifications: ProductSpecificationModel[] = [];
  productSpecification!: ProductSpecificationModel;

  @ViewChild('categorySelect')
  categorySelect!: ElementRef;

  @ViewChild('specTypeSelect')
  specTypeSelect!: ElementRef;

  @ViewChild('prodSpecSelect')
  prodSpecSelect!: ElementRef;

  constructor(private fb: FormBuilder,
              public translatorService: TranslatorService,
              private specificationTypeService: SpecificationTypeService,
              private productCategoryService: ProductCategoryService,
              private nav: RouteNavigator,
              private productSpecificationService: ProductSpecificationService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      valueBg: ['', Validators.required],
      valueEn: ['', Validators.required],
    });

    this.productCategoryService.getCategories().subscribe(value => this.categories = value);
  }

  categorySelected(): void {
    const categoryId = this.categorySelect.nativeElement.value;
    this.specificationTypes = new EmptyPage();
    this.form.reset();
    this.specTypeSelect.nativeElement.selectedIndex = 0;
    this.prodSpecSelect.nativeElement.selectedIndex = 0;
    // @ts-ignore
    this.specificationType = undefined;
    if (!categoryId) {
      return;
    }

    this.specificationTypeService.search({categoryIds: [Number(categoryId)], page: {page: 0, size: 1000}})
      .subscribe(value => this.specificationTypes = value);
  }

  async specificationTypeSelected(): Promise<void> {
    const specId = this.specTypeSelect.nativeElement.value;
    this.prodSpecSelect.nativeElement.selectedIndex = 0;
    this.form.reset();
    this.productSpecificationService.getSpecifications({specificationTypeIds: [Number(specId)]})
      .subscribe(value => this.productSpecifications = value);
  }

  productSpecificationSelected(): void {
    const prodSpecId = Number(this.prodSpecSelect.nativeElement.value);
    this.productSpecification = this.productSpecifications.filter(value => value.id === prodSpecId)[0];
    this.form.patchValue(this.productSpecification);
  }

  async onFormSubmit(): Promise<void> {
    const data: EditProductSpecificationModel = this.form.value;
    this.errors = await this.productSpecificationService.editProductSpecification(this.productSpecification.id, data);
    if (this.errors.length <= 0) {
      this.nav.navigate(AppRoutingPath.ADMIN_PANEL);
    }
  }
}
