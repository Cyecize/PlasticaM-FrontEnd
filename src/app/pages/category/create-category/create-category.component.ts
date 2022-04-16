import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FieldError} from '../../../shared/field-error/field-error';
import {Base64File} from '../../../shared/base64/base64-file';
import {EmptyPage, Page} from '../../../shared/util/page';
import {Base64FileUtil} from '../../../shared/base64/base64-file.util';
import {ProductCategoryService} from '../../../core/product-category/product.category.service';
import {AppRoutingPath} from '../../../app-routing.path';
import {CreateProductCategoryModel} from '../../../core/product-category/create-product-category.model';
import {RouteNavigator} from '../../../core/routing/route-navigator.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  errors: FieldError[] = [];

  constructor(private nav: RouteNavigator,
              private categoryService: ProductCategoryService) {
  }

  ngOnInit(): void {}

  async onFormSubmit(model: CreateProductCategoryModel): Promise<void> {
    this.errors = await this.categoryService.createCategory(model);
    if (this.errors.length === 0) {
      this.nav.navigate(AppRoutingPath.ADMIN_PANEL);
    }
  }
}
