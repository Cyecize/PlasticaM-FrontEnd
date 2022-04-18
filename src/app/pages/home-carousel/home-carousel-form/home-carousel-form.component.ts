import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FieldError} from '../../../shared/field-error/field-error';
import {Base64File} from '../../../shared/base64/base64-file';
import {EmptyPage, Page} from '../../../shared/util/page';
import {ProductModel} from '../../../core/product/product.model';
import {RouteNavigator} from '../../../core/routing/route-navigator.service';
import {HomeCarouselService} from '../../../core/home-carousel/home-carousel.service';
import {ProductService} from '../../../core/product/product.service';
import {Base64FileUtil} from '../../../shared/base64/base64-file.util';
import {CreateHomeCarouselModel} from '../../../core/home-carousel/create-home-carousel.model';
import {HomeCarouselModel} from '../../../core/home-carousel/home-carousel.model';

@Component({
  selector: 'app-home-carousel-form',
  templateUrl: './home-carousel-form.component.html',
  styleUrls: ['./home-carousel-form.component.scss']
})
export class HomeCarouselFormComponent implements OnInit {

  form!: FormGroup;
  @Input()
  errors: FieldError[] = [];
  base64File!: Base64File;
  productPage: Page<ProductModel> = new EmptyPage();

  @Output()
  formSubmitted: EventEmitter<CreateHomeCarouselModel> = new EventEmitter<CreateHomeCarouselModel>();

  @Input()
  set homeCarouselItem(item: HomeCarouselModel) {
    if (!item || !this.form) {
      return;
    }
    this.form.patchValue(item);
  }

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
      specifications: {},
      search: value,
      page: {page: 0, size: 5},
      categoryIds: [],
      sort: {direction: 'ASC', field: 'id'}
    }).subscribe(pg => this.productPage = pg);
  }

  onFormSubmit(): void {
    const data: CreateHomeCarouselModel = this.form.value;
    data.image = this.base64File;

    this.formSubmitted.next(data);
  }
}
