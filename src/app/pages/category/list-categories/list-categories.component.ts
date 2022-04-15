import {Component, OnInit} from '@angular/core';
import {ProductCategoryService} from '../../../core/product-category/product.category.service';
import {ProductCategory} from '../../../core/product-category/product.category.model';
import {TranslatorService} from '../../../core/translate/translator.service';
import {ImageUtils} from '../../../shared/util/image-utils';
import {RouteUtils} from '../../../core/routing/route-utils';
import {AppRoutingPath} from '../../../app-routing.path';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  categories: ProductCategory[] = [];

  constructor(private productCategoryService: ProductCategoryService,
              public translatorService: TranslatorService) {
  }

  ngOnInit(): void {
    this.productCategoryService.getCategories().subscribe(value => this.categories = value);
  }

  makeLink(imageUrl: string): string {
    return ImageUtils.makeLink(imageUrl);
  }

  createEditCategoryLink(catId: number): string {
    return RouteUtils.setPathParams(AppRoutingPath.EDIT_CATEGORY.toString(), {catId});
  }
}
