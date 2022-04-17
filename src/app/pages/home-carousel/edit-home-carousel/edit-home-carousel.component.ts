import {Component, OnInit} from '@angular/core';
import {FieldError} from '../../../shared/field-error/field-error';
import {HomeCarouselModel} from '../../../core/home-carousel/home-carousel.model';
import {CreateHomeCarouselModel} from '../../../core/home-carousel/create-home-carousel.model';
import {HomeCarouselService} from '../../../core/home-carousel/home-carousel.service';
import {RouteNavigator} from '../../../core/routing/route-navigator.service';
import {AppRoutingPath} from '../../../app-routing.path';
import {ActivatedRoute} from '@angular/router';
import {ObjectUtils} from '../../../shared/util/object-utils';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-edit-home-carousel',
  templateUrl: './edit-home-carousel.component.html',
  styleUrls: ['./edit-home-carousel.component.scss']
})
export class EditHomeCarouselComponent implements OnInit {

  errors: FieldError[] = [];
  homeCarouselItem!: HomeCarouselModel;

  constructor(private homeCarouselService: HomeCarouselService,
              private nav: RouteNavigator,
              private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      const carouselId = Number(value.id);

      if (ObjectUtils.isNil(carouselId) || isNaN(carouselId)) {
        this.nav.navigate(AppRoutingPath.NOT_FOUND);
        return;
      }

      this.homeCarouselService.getCarouselItem(carouselId).pipe(catchError(err => {
        if (err.status === 404) {
          this.nav.navigate(AppRoutingPath.NOT_FOUND);
        }
        return throwError(err);
      })).subscribe(item => {
        if (ObjectUtils.isNil(item)) {
          this.nav.navigate(AppRoutingPath.NOT_FOUND);
          return;
        }

        this.homeCarouselItem = item;
      });
    });
  }

  async formSubmitted(data: CreateHomeCarouselModel): Promise<void> {
    this.errors = await this.homeCarouselService.editHomeCarousel(this.homeCarouselItem.id, data);
    if (this.errors.length === 0) {
      this.homeCarouselService.reloadItems();
      this.nav.navigate(AppRoutingPath.HOME);
    }
  }
}
