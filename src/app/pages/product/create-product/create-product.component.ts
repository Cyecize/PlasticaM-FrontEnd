import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FieldError} from '../../../shared/field-error/field-error';
import {RouteNavigator} from '../../../core/routing/route-navigator.service';
import {ProductService} from '../../../core/product/product.service';
import {CreateProductModel} from '../../../core/product/create-product.model';
import {AppRoutingPath} from '../../../app-routing.path';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  errors: FieldError[] = [];

  constructor(private fb: FormBuilder,
              private nav: RouteNavigator,
              private productService: ProductService) {
  }

  ngOnInit(): void {

  }

  async onFormSubmit(data: CreateProductModel): Promise<void> {
    this.errors = await this.productService.createProduct(data);
    if (this.errors.length === 0) {
      this.nav.navigate(AppRoutingPath.ADMIN_PANEL);
    }
  }
}
