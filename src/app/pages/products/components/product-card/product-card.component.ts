import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../../core/product/product.model';
import {RouteUtils} from '../../../../core/routing/route-utils';
import {AppRoutingPath} from '../../../../app-routing.path';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input()
  product!: ProductModel;

  constructor() {
  }

  ngOnInit(): void {
  }

  createProductDetailsLink(): string {
    return RouteUtils.setPathParams(AppRoutingPath.PRODUCT_DETAILS.toString(), [this.product.id]);
  }
}
