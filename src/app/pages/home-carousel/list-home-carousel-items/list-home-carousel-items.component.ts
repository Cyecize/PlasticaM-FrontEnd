import { Component, OnInit } from '@angular/core';
import {HomeCarouselService} from '../../../core/home-carousel/home-carousel.service';
import {HomeCarouselModel} from '../../../core/home-carousel/home-carousel.model';
import {RouteUtils} from '../../../core/routing/route-utils';
import {ImageUtils} from '../../../shared/util/image-utils';
import {TranslatorService} from '../../../core/translate/translator.service';
import {AppRoutingPath} from '../../../app-routing.path';

@Component({
  selector: 'app-list-home-carousel-items',
  templateUrl: './list-home-carousel-items.component.html',
  styleUrls: ['./list-home-carousel-items.component.scss']
})
export class ListHomeCarouselItemsComponent implements OnInit {

  carouselItems: HomeCarouselModel[] = [];

  constructor(private homeCarouselService: HomeCarouselService,
              public translatorService: TranslatorService) { }

  ngOnInit(): void {
    this.homeCarouselService.getAllCarouselItems(true).subscribe(value => this.carouselItems = value);
  }

  generateEditLink(itemId: number): string {
    return RouteUtils.setPathParams(AppRoutingPath.EDIT_HOME_CAROUSEL.toString(), [itemId]);
  }

  makeLink(imageUrl: string): string {
    return ImageUtils.makeLink(imageUrl);
  }
}
