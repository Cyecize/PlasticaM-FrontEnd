import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FieldError} from '../../../shared/field-error/field-error';
import {HomeCarouselService} from '../../../core/home-carousel/home-carousel.service';
import {Base64File} from '../../../shared/base64/base64-file';
import {Base64FileUtil} from '../../../shared/base64/base64-file.util';
import {CreateHomeCarouselModel} from '../../../core/home-carousel/create-home-carousel.model';
import {RouteNavigator} from '../../../core/routing/route-navigator.service';
import {AppRoutingPath} from '../../../app-routing.path';
import {EmptyPage, Page} from '../../../shared/util/page';
import {ProductModel} from '../../../core/product/product.model';
import {ProductService} from '../../../core/product/product.service';

@Component({
  selector: 'app-create-home-carousel',
  templateUrl: './create-home-carousel.component.html',
  styleUrls: ['./create-home-carousel.component.scss']
})
export class CreateHomeCarouselComponent implements OnInit {

  form!: FormGroup;
  errors: FieldError[] = [];
  base64File!: Base64File;
  productPage: Page<ProductModel> = new EmptyPage();

  constructor(private fb: FormBuilder,
              private nav: RouteNavigator,
              private homeCarouselService: HomeCarouselService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      productId: ['', [Validators.pattern(/^[\d]*$/)]],
      textEn: ['', [Validators.required, Validators.maxLength(255)]],
      textBg: ['', [Validators.required, Validators.maxLength(255)]],
      customLink: ['', [Validators.maxLength(255)]],
      customLinkSamePage: [false, []],
      enabled: [true, []],
      orderNumber: [1, [Validators.required]],
    });
  }

  async onFormSubmit(): Promise<void> {
    const model: CreateHomeCarouselModel = this.form.value;
    model.image = this.base64File;

    this.errors = await this.homeCarouselService.createHomeCarousel(model);
    if (this.errors.length === 0) {
      this.homeCarouselService.reloadItems();
      this.nav.navigate(AppRoutingPath.HOME);
    }
  }

  handleImageUpload($event: Event): void {
    // @ts-ignore
    const file = $event?.target.files[0];
    const reader = new FileReader();
    reader.onload = res => {
      // @ts-ignore
      this.base64File = Base64FileUtil.createBase64File(reader.result, file.name);
    };
    reader.readAsDataURL(file);
  }

  searchProducts($event: Event): void {
    // @ts-ignore
    const value = $event.target.value;
    const existingProd = this.productPage.elements.filter(prod => prod.id === Number(value)).length;

    if (existingProd) {
      return;
    }

    this.productService.getProducts({
      specifications: [],
      search: value,
      page: {page: 0, size: 5},
      categoryIds: [],
      sort: {direction: 'ASC', field: 'id'}
    }).subscribe(pg => this.productPage = pg);
  }
}
