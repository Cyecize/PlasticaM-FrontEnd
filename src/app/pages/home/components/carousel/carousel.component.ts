import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HomeCarouselService} from '../../../../core/home-carousel/home-carousel.service';
import {HomeCarouselModel} from '../../../../core/home-carousel/home-carousel.model';
import {TranslatorService} from '../../../../core/translate/translator.service';
import {RouteUtils} from '../../../../core/routing/route-utils';
import {AppRoutingPath} from '../../../../app-routing.path';
import {ObjectUtils} from '../../../../shared/util/object-utils';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {

  private _swiper!: ElementRef;

  items?: HomeCarouselModel[];

  @ViewChild('carousel') set swiper(value: ElementRef) {
    this._swiper = value;
    console.log('setting MANE ');
    this.initCarousel();
  }

  get swiper(): ElementRef {
    return this._swiper;
  }

  constructor(private homeCarouselService: HomeCarouselService,
              public translator: TranslatorService) {
  }

  getProductLink(productId: number): string {
    return RouteUtils.setPathParams(AppRoutingPath.PRODUCT_DETAILS.absolutePath, [productId]);
  }

  ngOnInit(): void {
    this.homeCarouselService.getItems().subscribe(value => {
      this.items = value;
      this.initCarousel();
    });
  }

  ngAfterViewInit(): void {
    console.log('view init!');
  }

  private initCarousel(): void {
    if (ObjectUtils.isNil(this.items) || ObjectUtils.isNil(this.swiper)) {
      return;
    }

    if (window.hasOwnProperty('components')) {
      console.log('initting carousel!');
      // @ts-ignore
      window.components.swiper.init([this.swiper.nativeElement]);
    }
  }
}
