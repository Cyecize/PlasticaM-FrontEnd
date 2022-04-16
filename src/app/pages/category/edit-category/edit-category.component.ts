import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouteNavigator} from '../../../core/routing/route-navigator.service';
import {TranslatorService} from '../../../core/translate/translator.service';
import {ObjectUtils} from '../../../shared/util/object-utils';
import {AppRoutingPath} from '../../../app-routing.path';
import {LoaderService} from '../../../shared/components/loader/loader.service';
import {ProductCategoryService} from '../../../core/product-category/product.category.service';
import {ProductCategory} from '../../../core/product-category/product.category.model';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {CreateProductCategoryModel} from '../../../core/product-category/create-product-category.model';
import {FieldError} from '../../../shared/field-error/field-error';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  category!: ProductCategory;
  errors: FieldError[] = [];

  constructor(private route: ActivatedRoute,
              private nav: RouteNavigator,
              private loader: LoaderService,
              public translatorService: TranslatorService,
              private productCategoryService: ProductCategoryService,
              private categoryService: ProductCategoryService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      const catId = Number(value.catId);

      if (ObjectUtils.isNil(catId) || isNaN(catId)) {
        this.nav.navigate(AppRoutingPath.NOT_FOUND);
        return;
      }

      this.loader.show();
      this.productCategoryService.getCategory(catId).pipe(catchError(err => {
        if (err.status === 404) {
          this.nav.navigate(AppRoutingPath.NOT_FOUND);
        }
        return throwError(err);
      })).subscribe(cat => {

        if (ObjectUtils.isNil(cat)) {
          this.loader.hide();
          this.nav.navigate(AppRoutingPath.NOT_FOUND);
          return;
        }

        this.category = cat;
        this.loader.hide();
      });
    });
  }

  async onFormSubmit(model: CreateProductCategoryModel): Promise<void> {
    this.errors = await this.categoryService.updateCategory(this.category.id, model);
    if (this.errors.length === 0) {
      this.nav.navigate(AppRoutingPath.ADMIN_PANEL);
    }
  }
}
