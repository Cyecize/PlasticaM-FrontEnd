import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductCategoryService} from '../../../../core/product-category/product.category.service';
import {ProductCategory} from '../../../../core/product-category/product.category.model';
import {ProductModel} from '../../../../core/product/product.model';
import {ProductQuery} from '../../../../core/product/product.query';
import {EmptyPage, Page} from '../../../../shared/util/page';
import {TranslatorService} from '../../../../core/translate/translator.service';
import {Router} from '@angular/router';
import {AppRoutingPath} from '../../../../app-routing.path';
import {Location} from '@angular/common';
import {SORT_OPTIONS} from '../../sort-options';
import {SpecificationTypeService} from '../../../../core/product/productspec/specification-type.service';
import {SpecificationTypeModel} from '../../../../core/product/productspec/specification-type.model';
import {ProductSpecificationModel} from '../../../../core/product/productspec/product-specification.model';
import {ProductSpecificationService} from '../../../../core/product/productspec/product-specification.service';
import {ObjectUtils} from '../../../../shared/util/object-utils';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit {

  private _selectedValue = 0;

  categories: ProductCategory[] = [];

  specificationTypes: Page<SpecificationTypeModel> = new EmptyPage();
  specifications: Map<number, ProductSpecificationModel[]> = new Map<number, ProductSpecificationModel[]>();

  @Input()
  query!: ProductQuery;

  @Input()
  products!: Page<ProductModel>;

  @Output()
  filtersUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

  sortOptions = SORT_OPTIONS;

  get searchValue(): string | undefined {
    return this.query?.search;
  }

  set searchValue(val) {
    this.query.search = val;
  }

  constructor(private categoryService: ProductCategoryService,
              public translator: TranslatorService,
              private router: Router,
              private location: Location,
              private specificationTypeService: SpecificationTypeService,
              private productSpecificationService: ProductSpecificationService) {
  }

  async ngOnInit(): Promise<void> {
    this.categoryService.getCategories().subscribe(value => {
      this.categories = value;
    });
    this.specificationTypeService.specificationTypes$.subscribe(value => this.specificationTypes = value);
    this.productSpecificationService.specifications$.subscribe(value => this.setSpecifications(value));
    await this.loadSpecificationTypes();
    await this.loadSpecifications();
  }

  async onCategoryFilter(id: number): Promise<void> {
    if (this.query.categoryIds?.includes(id)) {
      this.query.categoryIds = this.query.categoryIds.filter(catId => catId !== id);
    } else {
      this.query.categoryIds?.push(id);
    }

    if (this.router.url !== AppRoutingPath.PRODUCTS.absolutePath) {
      this.location.replaceState(AppRoutingPath.PRODUCTS.absolutePath);
    }

    await this.loadSpecificationTypes();

    this.filtersUpdated.emit();
  }

  onSpecificationFilter(specTypeId: number, specId: number): void {
    if (ObjectUtils.isNil(this.query.specifications[specTypeId])) {
      this.query.specifications[specTypeId] = [];
    }

    const specs: number[] = this.query.specifications[specTypeId];

    if (specs.includes(specId)) {
      specs.splice(specs.indexOf(specId), 1);
    } else {
      specs.push(specId);
    }

    this.filtersUpdated.emit();
  }

  onSearchChanged(): void {
    this.query.search = this.searchValue;
    this.filtersUpdated.emit();
  }

  get selectedValue(): number {
    return this._selectedValue;
  }

  set selectedValue(value: number) {
    this._selectedValue = value;
    this.query.sort = this.sortOptions[value].sortQuery;
    this.filtersUpdated.emit();
  }

  onPageChanged(page: number): void {
    // @ts-ignore
    this.query.page?.page = page;
    this.filtersUpdated.emit(true);
  }

  private async loadSpecificationTypes(): Promise<void> {
    if (!this.query.categoryIds) {
      return;
    }


    await this.specificationTypeService.loadSpecificationTypes({categoryIds: this.query.categoryIds, page: {page: 0, size: 100000}});
    await this.loadSpecifications();
  }

  private async loadSpecifications(): Promise<void> {
    if (!this.specificationTypes.elements.length) {
      return;
    }

    await this.productSpecificationService.searchSpecifications({
      specificationTypeIds: this.specificationTypes.elements.map(value => value.id)
    });
  }

  private setSpecifications(specs: Map<number, ProductSpecificationModel[]>): void {
    for (const key of Object.keys(this.query.specifications)) {
      const keyNum = Number(key);
      const allSpecs: number[] = specs.get(keyNum)?.map(spec => spec.id) || [];
      if (!specs.has(keyNum)) {
        this.query.specifications[keyNum] = [];
        continue;
      }

      this.query.specifications[keyNum] = this.query.specifications[keyNum].filter(specId => allSpecs.includes(specId));
    }

    this.specifications = specs;
  }
}
