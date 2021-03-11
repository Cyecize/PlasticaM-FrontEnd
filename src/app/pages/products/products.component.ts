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

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {

  products!: Page<ProductModel>;
  query: ProductQuery = {categoryIds: [], sort: SORT_OPTIONS[0].sortQuery};

  constructor(private route: ActivatedRoute,
              private nav: RouteNavigator,
              private productService: ProductService,
              private loader: LoaderService) {
  }

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(map(results => ({params: results[0], query: results[1]})))
      .subscribe(results => {
        this.query.categoryIds = [];

        if (results.params.hasOwnProperty('catId')) {
          this.query.categoryIds.push(Number(results.params.catId));
        }

        if (results.query.hasOwnProperty('q')) {
          this.query.search = results.query.q;
        }

        this.fetchData(false);
      });
  }

  public async fetchData(isPageChange: boolean): Promise<void> {
    if (!this.query.page) {
      this.query.page = {page: 1, size: 6};
    }

    if (!isPageChange) {
      this.query.page.page = 1;
    }

    this.loader.show();
    this.productService.getProducts(this.query).subscribe(value => {
      this.products = value;
      this.loader.hide();
    });
  }
}
