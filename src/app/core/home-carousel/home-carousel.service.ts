import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HomeCarouselModel} from './home-carousel.model';
import {HomeCarouselRepository} from './home-carousel.repository';
import {CreateHomeCarouselModel} from './create-home-carousel.model';
import {FieldError} from '../../shared/field-error/field-error';
import {FieldErrorWrapper} from '../../shared/util/field-error-wrapper';

@Injectable({providedIn: 'root'})
export class HomeCarouselService {

  private readonly homeCarouselItems: BehaviorSubject<HomeCarouselModel[]> = new BehaviorSubject<HomeCarouselModel[]>([]);
  public readonly homeCarouselItems$ = this.homeCarouselItems.asObservable();

  constructor(private repository: HomeCarouselRepository) {
    this.reloadItems();
  }

  public reloadItems(): void {
    this.repository.fetch(false).subscribe(value => {
      this.homeCarouselItems.next(value);
    });
  }

  public getAllCarouselItems(showHidden: boolean): Observable<HomeCarouselModel[]> {
    return this.repository.fetch(showHidden);
  }

  async createHomeCarousel(model: CreateHomeCarouselModel): Promise<FieldError[]> {
    const res = await new FieldErrorWrapper(() => this.repository.post(model)).execute<HomeCarouselModel>();
    if (res.hasOwnProperty('id')) {
      return [];
    }

    return res as FieldError[];
  }

  public async editHomeCarousel(id: number, model: CreateHomeCarouselModel): Promise<FieldError[]> {
    const res = await new FieldErrorWrapper(() => this.repository.put(id, model)).execute<HomeCarouselModel>();
    if (res.hasOwnProperty('id')) {
      return [];
    }

    return res as FieldError[];
  }

  public getCarouselItem(carouselId: number): Observable<HomeCarouselModel> {
    return this.repository.get(carouselId);
  }
}
