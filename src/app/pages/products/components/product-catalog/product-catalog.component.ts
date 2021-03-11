import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductCategoryService} from '../../../../core/product-category/product.category.service';
import {ProductCategory} from '../../../../core/product-category/product.category.model';
import {ProductModel} from '../../../../core/product/product.model';
import {ProductQuery} from '../../../../core/product/product.query';
import {Page} from '../../../../shared/util/page';
import {TranslatorService} from '../../../../core/translate/translator.service';
import {Router} from '@angular/router';
import {AppRoutingPath} from '../../../../app-routing.path';
import {Location} from '@angular/common';
import {SORT_OPTIONS} from '../../sort-options';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit {

  private _selectedValue = 0;

  categories: ProductCategory[] = [];

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
              private location: Location) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(value => {
      this.categories = value;
    });
    window.scrollTo(0, 0);
  }

  onCategoryFilter(id: number): void {
    if (this.query.categoryIds?.includes(id)) {
      this.query.categoryIds = this.query.categoryIds.filter(catId => catId !== id);
    } else {
      this.query.categoryIds?.push(id);
    }

    if (this.router.url !== AppRoutingPath.PRODUCTS.absolutePath) {
      this.location.replaceState(AppRoutingPath.PRODUCTS.absolutePath);
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
}
