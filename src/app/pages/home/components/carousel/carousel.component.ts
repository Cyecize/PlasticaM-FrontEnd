import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HomeCarouselService} from '../../../../core/home-carousel/home-carousel.service';
import {HomeCarouselModel} from '../../../../core/home-carousel/home-carousel.model';
import {TranslatorService} from '../../../../core/translate/translator.service';
import {RouteUtils} from '../../../../core/routing/route-utils';
import {AppRoutingPath} from '../../../../app-routing.path';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {

  items?: HomeCarouselModel[];

  @ViewChild('carousel') private swiper!: ElementRef;

  constructor(private homeCarouselService: HomeCarouselService,
              public translator: TranslatorService) {
  }

  getProductLink(productId: number): string {
    return RouteUtils.setPathParams(AppRoutingPath.PRODUCT_DETAILS.absolutePath, [productId]);
  }

  ngOnInit(): void {
    this.homeCarouselService.getItems().subscribe(value => {
      this.items = value;
    });
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    if (window.components) {
      // @ts-ignore
      window.components.swiper.init([this.swiper.nativeElement]);
    }
  }
}
