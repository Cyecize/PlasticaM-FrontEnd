import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HomeCarouselModel} from './home-carousel.model';
import {HomeCarouselRepository} from './home-carousel.repository';
import {ObjectUtils} from '../../shared/util/object-utils';

@Injectable({providedIn: 'root'})
export class HomeCarouselService {

  private homeCarouselItems?: HomeCarouselModel[];
  private readonly homeCarouselItemsEvent: EventEmitter<HomeCarouselModel[]> = new EventEmitter<HomeCarouselModel[]>();

  constructor(private repository: HomeCarouselRepository) {
    this.repository.fetch().subscribe(value => {
      this.homeCarouselItems = value;
      this.homeCarouselItemsEvent.emit(value);
    });
  }

  public getItems(): Observable<HomeCarouselModel[]> {
    if (!ObjectUtils.isNil(this.homeCarouselItems)) {
      return new Observable<HomeCarouselModel[]>(subscriber => subscriber.next(this.homeCarouselItems));
    }

    return this.homeCarouselItemsEvent;
  }
}
