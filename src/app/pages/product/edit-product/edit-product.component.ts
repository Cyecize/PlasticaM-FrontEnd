import { Component, OnInit } from '@angular/core';
import {CreateProductModel} from '../../../core/product/create-product.model';
import {FieldError} from '../../../shared/field-error/field-error';
import {ProductModel} from '../../../core/product/product.model';
import {ActivatedRoute} from '@angular/router';
import {RouteNavigator} from '../../../core/routing/route-navigator.service';
import {LoaderService} from '../../../shared/components/loader/loader.service';
import {ObjectUtils} from '../../../shared/util/object-utils';
import {AppRoutingPath} from '../../../app-routing.path';
import {ProductService} from '../../../core/product/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  errors: FieldError[] = [];
  product!: ProductModel;

  constructor(private route: ActivatedRoute,
              private nav: RouteNavigator,
              private loader: LoaderService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      const prodId = Number(value.prodId);

      if (ObjectUtils.isNil(prodId) || isNaN(prodId)) {
        this.nav.navigate(AppRoutingPath.NOT_FOUND);
        return;
      }

      this.loader.show();
      this.productService.getProduct(prodId).subscribe(product => {

        if (ObjectUtils.isNil(product)) {
          this.loader.hide();
          this.nav.navigate(AppRoutingPath.NOT_FOUND);
          return;
        }

        // @ts-ignore
        this.product = product;
        this.loader.hide();
      });
    });
  }

  async onFormSubmit(data: CreateProductModel): Promise<void> {
  }
}
