import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouteNavigator} from '../../core/routing/route-navigator.service';
import {Page} from '../../shared/util/page';
import {ProductModel} from '../../core/product/product.model';
import {ProductService} from '../../core/product/product.service';
import {ProductQuery} from '../../core/product/product.query';
import {LoaderService} from '../../shared/components/loader/loader.service';
import {SORT_OPTIONS} from './sort-options';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {BreadcrumbModel} from '../../shared/components/breadcrumb-section/breadcrumb.model';
import {AppRoutingPath} from '../../app-routing.path';
import {ProductCategory} from '../../core/product-category/product.category.model';
import {ProductCategoryService} from '../../core/product-category/product.category.service';
import {TranslatorService} from '../../core/translate/translator.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {

  products!: Page<ProductModel>;
  query: ProductQuery = {categoryIds: [], sort: SORT_OPTIONS[0].sortQuery};
  breadcrumbItems: BreadcrumbModel[] = [];
  private categories: ProductCategory[] = [];

  constructor(private route: ActivatedRoute,
              private nav: RouteNavigator,
              private productService: ProductService,
              private loader: LoaderService,
              private categoryService: ProductCategoryService,
              private translate: TranslatorService) {
  }

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.queryParams, this.categoryService.getCategories()])
      .pipe(map(results => ({params: results[0], query: results[1], categories: results[2]})))
      .subscribe(results => {
        this.query.categoryIds = [];

        if (results.params.hasOwnProperty('catId')) {
          this.query.categoryIds.push(Number(results.params.catId));
        }

        if (results.query.hasOwnProperty('q')) {
          this.query.search = results.query.q;
        }

        this.categories = results.categories;

        this.fetchData(false);
      });
  }

  public async fetchData(isPageChange: boolean): Promise<void> {
    if (!this.query.page) {
      this.query.page = {page: 0, size: 6};
    }

    if (!isPageChange) {
      this.query.page.page = 0;
    }

    this.initBreadcrumb();

    this.loader.show();
    this.productService.getProducts(this.query).subscribe(value => {
      this.products = value;
      this.loader.hide();
    });
  }

  private initBreadcrumb(): void {
    const isOneCategorySelected: boolean = this.query.categoryIds.length === 1;

    this.breadcrumbItems = [
      {
        text: 'home',
        link: AppRoutingPath.HOME.absolutePath
      },
      {
        text: 'products',
        link: isOneCategorySelected ? AppRoutingPath.PRODUCTS.absolutePath : undefined
      }
    ];

    if (isOneCategorySelected) {
      this.breadcrumbItems.push({
        text: this.translate.getCategoryName(this.categories.filter(cat => cat.id === this.query.categoryIds[0])[0]),
      });
    }
  }
}
