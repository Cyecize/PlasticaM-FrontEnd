import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../core/product/product.service';
import {EmptyPage, Page} from '../../../shared/util/page';
import {ProductModel} from '../../../core/product/product.model';
import {ProductQuery} from '../../../core/product/product.query';
import {ImageUtils} from '../../../shared/util/image-utils';
import {RouteUtils} from '../../../core/routing/route-utils';
import {AppRoutingPath} from '../../../app-routing.path';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  private readonly productQuery: ProductQuery = {
    sort: {field: 'id', direction: 'DESC'},
    page: {page: 0, size: 10},
    categoryIds: [],
    search: '',
    specifications: [],
    showHidden: true
  };

  products: Page<ProductModel> = new EmptyPage();

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts(this.productQuery).subscribe(value => this.products = value);
  }

  makeImgLink(imageUrl: string): string {
    return ImageUtils.makeLink(imageUrl);
  }

  createEditProductLink(prodId: number): string {
    return RouteUtils.setPathParams(AppRoutingPath.EDIT_PRODUCT.toString(), {prodId});
  }

  createProductDetailsLink(prodId: number): string {
    return RouteUtils.setPathParams(AppRoutingPath.PRODUCT_DETAILS.toString(), {prodId});
  }

  onPageChanged(page: number): void {
    // @ts-ignore
    this.productQuery.page?.page = page;
    this.productService.getProducts(this.productQuery).subscribe(value => this.products = value);
  }
}
