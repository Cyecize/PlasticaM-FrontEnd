import {Component, Input, OnInit} from '@angular/core';
import {ProductCategory} from '../../../../core/product-category/product.category.model';
import {TranslatorService} from '../../../../core/translate/translator.service';
import {AppRoutingPath} from '../../../../app-routing.path';
import {RouteUtils} from '../../../../core/routing/route-utils';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {

  @Input()
  category!: ProductCategory;
  route = '';

  constructor(public translator: TranslatorService) {

  }

  ngOnInit(): void {
    this.route = RouteUtils.setPathParams(AppRoutingPath.PRODUCTS_CATEGORY.toString(), [this.category.id]);
  }
}
