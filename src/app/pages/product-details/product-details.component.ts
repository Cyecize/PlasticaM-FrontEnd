import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouteNavigator} from '../../core/routing/route-navigator.service';
import {ProductService} from '../../core/product/product.service';
import {LoaderService} from '../../shared/components/loader/loader.service';
import {ProductModel} from '../../core/product/product.model';
import {AppRoutingPath} from '../../app-routing.path';
import {ObjectUtils} from '../../shared/util/object-utils';
import {TranslatorService} from '../../core/translate/translator.service';
import {BreadcrumbModel} from '../../shared/components/breadcrumb-section/breadcrumb.model';
import {RouteUtils} from '../../core/routing/route-utils';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product!: ProductModel | null;
  images!: string[];
  topicParam!: any;
  breadcrumbItems: BreadcrumbModel[] = [];

  constructor(private route: ActivatedRoute,
              private nav: RouteNavigator,
              private productService: ProductService,
              private loader: LoaderService,
              public translator: TranslatorService) {
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

        this.product = product;
        if (this.product?.imageGallery) {
          this.images = this.product.imageGallery;
        }

        this.topicParam = {what: product?.name};
        this.initBreadcrumb(this.product);
        window.scrollTo(0, 0);
        this.loader.hide();
      });
    });
  }

  private initBreadcrumb(product: ProductModel | null): void {
    if (!product) {
      return;
    }

    this.breadcrumbItems = [
      {
        text: 'home',
        link: AppRoutingPath.HOME.absolutePath
      },
      {
        text: 'products',
        link: AppRoutingPath.PRODUCTS.absolutePath
      },
      {
        text: this.translator.getProductCategoryName(product),
        link: RouteUtils.setPathParams(AppRoutingPath.PRODUCTS_CATEGORY.absolutePath, [product.categoryId])
      },
      {
        text: product.name
      }
    ];
  }
}
