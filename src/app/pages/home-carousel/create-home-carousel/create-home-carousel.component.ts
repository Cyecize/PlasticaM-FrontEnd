import {Component, OnInit} from '@angular/core';
import {FieldError} from '../../../shared/field-error/field-error';
import {HomeCarouselService} from '../../../core/home-carousel/home-carousel.service';
import {CreateHomeCarouselModel} from '../../../core/home-carousel/create-home-carousel.model';
import {RouteNavigator} from '../../../core/routing/route-navigator.service';
import {AppRoutingPath} from '../../../app-routing.path';

@Component({
  selector: 'app-create-home-carousel',
  templateUrl: './create-home-carousel.component.html',
  styleUrls: ['./create-home-carousel.component.scss']
})
export class CreateHomeCarouselComponent implements OnInit {
  errors: FieldError[] = [];

  constructor(private nav: RouteNavigator,
              private homeCarouselService: HomeCarouselService) {
  }

  ngOnInit(): void {

  }

  async onFormSubmit(model: CreateHomeCarouselModel): Promise<void> {
    this.errors = await this.homeCarouselService.createHomeCarousel(model);
    if (this.errors.length === 0) {
      this.homeCarouselService.reloadItems();
      this.nav.navigate(AppRoutingPath.HOME);
    }
  }
}
