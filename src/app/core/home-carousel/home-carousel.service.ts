import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HomeCarouselModel} from './home-carousel.model';
import {HomeCarouselRepository} from './home-carousel.repository';
import {ObjectUtils} from '../../shared/util/object-utils';
import {CreateHomeCarouselModel} from './create-home-carousel.model';
import {FieldError} from '../../shared/field-error/field-error';
import {FieldErrorWrapper} from '../../shared/util/field-error-wrapper';

@Injectable({providedIn: 'root'})
export class HomeCarouselService {

  private homeCarouselItems?: HomeCarouselModel[];
  private readonly homeCarouselItemsEvent: EventEmitter<HomeCarouselModel[]> = new EventEmitter<HomeCarouselModel[]>();

  constructor(private repository: HomeCarouselRepository) {
    this.reloadItems();
  }

  public getItems(): Observable<HomeCarouselModel[]> {
    if (!ObjectUtils.isNil(this.homeCarouselItems)) {
      return new Observable<HomeCarouselModel[]>(subscriber => subscriber.next(this.homeCarouselItems));
    }

    return this.homeCarouselItemsEvent;
  }

  public reloadItems(): void {
    this.repository.fetch().subscribe(value => {
      this.homeCarouselItems = value;
      this.homeCarouselItemsEvent.emit(value);
    });
  }

  async createHomeCarousel(model: CreateHomeCarouselModel): Promise<FieldError[]> {
    const res = await new FieldErrorWrapper(() => this.repository.post(model)).execute<HomeCarouselModel>();
    if (res.hasOwnProperty('id')) {
      return [];
    }

    return res as FieldError[];
  }
}
