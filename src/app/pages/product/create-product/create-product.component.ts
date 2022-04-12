import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FieldError} from '../../../shared/field-error/field-error';
import {Base64File} from '../../../shared/base64/base64-file';
import {EmptyPage, Page} from '../../../shared/util/page';
import {RouteNavigator} from '../../../core/routing/route-navigator.service';
import {ProductService} from '../../../core/product/product.service';
import {Base64FileUtil} from '../../../shared/base64/base64-file.util';
import {Observable} from 'rxjs';
import {ProductCategoryService} from '../../../core/product-category/product.category.service';
import {ProductCategory} from '../../../core/product-category/product.category.model';
import {TranslatorService} from '../../../core/translate/translator.service';
import {SpecificationTypeModel} from '../../../core/product/productspec/specification-type.model';
import {SpecificationTypeService} from '../../../core/product/productspec/specification-type.service';
import {ProductSpecificationModel} from '../../../core/product/productspec/product-specification.model';
import {ProductSpecificationService} from '../../../core/product/productspec/product-specification.service';
import {isNumeric} from 'rxjs/internal-compatibility';
import {CreateProductSpecificationModel} from '../../../core/product/productspec/create-product-specification.model';
import {CreateProductModel} from '../../../core/product/create-product.model';
import {AppRoutingPath} from '../../../app-routing.path';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  form!: FormGroup;
  errors: FieldError[] = [];
  imageBase64File!: Base64File;
  tagsPage: Page<string> = new EmptyPage();
  selectedTags: string[] = [];
  tagInput = '';
  gallery: Base64File[] = [];
  selectedExistingSpecifications: ProductSpecificationModel[] = [];
  selectedSpecifications: CreateProductSpecificationModel[] = [];

  categories: ProductCategory[] = [];
  specificationTypes: Page<SpecificationTypeModel> = new EmptyPage();
  specificationValues: ProductSpecificationModel[] = [];

  @ViewChild('specTypeSelect')
  private specTypeSelect!: ElementRef;

  @ViewChild('specValueSelect')
  private specValueSelect!: ElementRef;

  @ViewChild('specNewValueBg')
  private specNewValueBg!: ElementRef;

  @ViewChild('specNewValueEn')
  private specNewValueEn!: ElementRef;

  constructor(private fb: FormBuilder,
              private nav: RouteNavigator,
              private productService: ProductService,
              private translateService: TranslatorService,
              private categoryService: ProductCategoryService,
              private specificationTypeService: SpecificationTypeService,
              private productSpecificationService: ProductSpecificationService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(value => this.categories = value);
    this.specificationTypeService.specificationTypes$.subscribe(value => this.specificationTypes = value);
    this.productSpecificationService.specifications$.subscribe(value => this.specificationValues = value.values().next().value);
    this.form = this.fb.group({
      categoryId: ['', Validators.required],
      productName: ['', Validators.required],
      price: ['', []],
      descriptionEn: ['', []],
      descriptionBg: ['', []],
      enabled: [true, []]
    });
  }

  async onFormSubmit(): Promise<void> {
    const data: CreateProductModel = this.form.value;
    data.gallery = this.gallery;
    data.image = this.imageBase64File;
    data.tagNames = this.selectedTags;
    data.productSpecifications = this.selectedSpecifications;
    data.existingProductSpecifications = this.selectedExistingSpecifications.map(value => value.id);

    this.errors = await this.productService.createProduct(data);
    if (this.errors.length === 0) {
      this.nav.navigate(AppRoutingPath.ADMIN_PANEL);
    }
  }

  handleProductImageUpload($event: Event): void {
    this.handleImageUpload($event).subscribe(value => this.imageBase64File = value);
  }

  handleGalleryImageUpload($event: Event): void {
    this.handleImageUpload($event).subscribe(value => this.gallery.push(value));
  }

  categorySelected(): void {
    this.specificationTypes = new EmptyPage();
    this.specificationValues = [];
    this.specTypeSelect.nativeElement.selectedIndex = 0;
    this.specValueSelect.nativeElement.selectedIndex = 0;
    this.specNewValueBg.nativeElement.value = '';
    this.specNewValueEn.nativeElement.value = '';

    // @ts-ignore
    const categoryId: number = this.form.get('categoryId')?.value;
    this.specificationTypeService.loadSpecificationTypes({
      categoryIds: [categoryId],
      page: {page: 0, size: 1000}
    });
  }

  specificationTypeSelected($event: Event): void {
    // @ts-ignore
    const specificationType = $event.target.value;
    this.specificationValues = [];
    this.specValueSelect.nativeElement.selectedIndex = 0;
    this.specNewValueBg.nativeElement.value = '';
    this.specNewValueEn.nativeElement.value = '';

    if (!specificationType) {
      return;
    }

    this.productSpecificationService.searchSpecifications({
      specificationTypeIds: [specificationType]
    });
  }

  addNewSpecification(): void {
    const specType = this.specTypeSelect.nativeElement.value;
    const existingSpecId = this.specValueSelect.nativeElement.value;
    const newSpecValueBg = this.specNewValueBg.nativeElement.value;
    const newSpecValueEn = this.specNewValueEn.nativeElement.value;

    this.specTypeSelect.nativeElement.selectedIndex = 0;
    this.specValueSelect.nativeElement.selectedIndex = 0;
    this.specNewValueBg.nativeElement.value = '';
    this.specNewValueEn.nativeElement.value = '';

    if (!isNumeric(specType)
      || this.selectedExistingSpecifications.findIndex(value => value.specificationTypeId === Number(specType)) !== -1
      || this.selectedSpecifications.findIndex(value => value.specificationTypeId === Number(specType)) !== -1) {
      return;
    }

    if (isNumeric(existingSpecId)) {
      this.specificationValues.filter(value => value.id === Number(existingSpecId))
        .forEach(value => this.selectedExistingSpecifications.push(value));
      return;
    }

    if (!newSpecValueBg || !newSpecValueEn) {
      return;
    }

    this.selectedSpecifications.push({
      specificationTypeId: Number(specType),
      valueBg: newSpecValueBg,
      valueEn: newSpecValueEn
    });
  }

  removeExistingSpecification(spec: ProductSpecificationModel): void {
    this.selectedExistingSpecifications.splice(this.selectedExistingSpecifications.findIndex(value => value.id === spec.id), 1);
  }

  removeSpecification(ind: number): void {
    this.selectedSpecifications.splice(ind, 1);
  }

  private handleImageUpload($event: Event): Observable<Base64File> {
    const result = new Observable();
    // @ts-ignore
    const file = $event?.target.files[0];
    const reader = new FileReader();

    return new Observable<Base64File>(subscriber => {
      reader.onload = res => {
        // @ts-ignore
        subscriber.next(Base64FileUtil.createBase64File(reader.result, file.name));
        subscriber.complete();
      };
      reader.readAsDataURL(file);
    });
  }

  removeTag(tag: string): void {
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
  }

  removeImageFromGallery(imgId: number): void {
    this.gallery.splice(imgId, 1);
  }

  addTag($event: Event): void {
    $event.preventDefault();
    // @ts-ignore
    const tag = this.tagInput;
    if (!tag) {
      return;
    }

    this.removeTag(tag);
    this.selectedTags.push(tag);
    this.tagInput = '';
  }

  getCategoryName(cat: ProductCategory): string {
    return this.translateService.getCategoryName(cat);
  }

  getSpecificationName(spec: SpecificationTypeModel): string {
    if (!spec) { return ''; }
    return this.translateService.getSpecificationTitle(spec);
  }

  getSpecificationNameFromProductSpec(spec: ProductSpecificationModel | CreateProductSpecificationModel): string {
    if (!spec) { return ''; }
    return this.getSpecificationName(this.specificationTypes.elements.filter(s => s.id === spec.specificationTypeId)[0]);
  }

  getSpecificationValue(spec: ProductSpecificationModel | CreateProductSpecificationModel): string {
    return this.translateService.getSpecificationValue(spec as ProductSpecificationModel);
  }
}
