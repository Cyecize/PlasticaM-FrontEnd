import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HomeCarouselModel} from './home-carousel.model';
import {homeCarouselItems} from './home-carousel.data';

@Injectable({providedIn: 'root'})
export class HomeCarouselService {

  public getItems(): Observable<HomeCarouselModel[]> {
    return new Observable<HomeCarouselModel[]>(subscriber => subscriber.next(homeCarouselItems));
  }
}
