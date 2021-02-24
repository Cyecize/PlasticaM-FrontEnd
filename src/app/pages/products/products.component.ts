import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouteNavigator} from '../../core/routing/route-navigator.service';
import {Page} from '../../shared/util/page';
import {ProductModel} from '../../core/product/product.model';
import {ProductService} from '../../core/product/product.service';
import {ProductQuery} from '../../core/product/product.query';
import {LoaderService} from '../../shared/components/loader/loader.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {

  products!: Page<ProductModel>;
  query: ProductQuery = {categoryIds: []};

  constructor(private route: ActivatedRoute,
              private nav: RouteNavigator,
              private productService: ProductService,
              private loader: LoaderService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      this.query.categoryIds = [];

      if (value.hasOwnProperty('catId')) {
        this.query.categoryIds.push(Number(value.catId));
      }

      this.fetchData();
    });
  }

  public async fetchData(): Promise<void> {
    this.loader.show();
    this.productService.getProducts(this.query).subscribe(value => {
      this.products = value;
      this.loader.hide();
    });
  }
}
