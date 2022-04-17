import {Component, OnInit} from '@angular/core';
import {CreateProductModel} from '../../../core/product/create-product.model';
import {FieldError} from '../../../shared/field-error/field-error';
import {ProductModel} from '../../../core/product/product.model';
import {ActivatedRoute} from '@angular/router';
import {RouteNavigator} from '../../../core/routing/route-navigator.service';
import {LoaderService} from '../../../shared/components/loader/loader.service';
import {ObjectUtils} from '../../../shared/util/object-utils';
import {AppRoutingPath} from '../../../app-routing.path';
import {ProductService} from '../../../core/product/product.service';
import {ImageUtils} from '../../../shared/util/image-utils';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {GalleryItemModel} from '../../../core/product/gallery-item.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  errors: FieldError[] = [];
  product!: ProductModel;
  productGallery: GalleryItemModel[] = [];

  constructor(private route: ActivatedRoute,
              private nav: RouteNavigator,
              private loader: LoaderService,
              private productService: ProductService) {
  }

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
        this.productService.getProductGallery(prodId).subscribe(gallery => this.productGallery = gallery);
      });
    });
  }

  async onFormSubmit(data: CreateProductModel): Promise<void> {
    this.errors = await this.productService.updateProduct(this.product.id, data);
    if (this.errors.length <= 0) {
      this.nav.navigate(AppRoutingPath.PRODUCT_DETAILS, [this.product.id]);
    }
  }

  makeImageUrl(imgPath: string): string {
    return ImageUtils.makeLink(imgPath);
  }

  removeImage(imageId: number): void {
    this.loader.show();
    this.productService.removeImage(this.product.id, imageId)
      .pipe(catchError(err => {
        this.loader.hide();
        return of([]);
      }))
      .subscribe(value => {
        this.productService.getProductGallery(this.product.id).subscribe(gallery => this.productGallery = gallery);
        this.loader.hide();
      });
  }
}
