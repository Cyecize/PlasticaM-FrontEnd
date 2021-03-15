import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HomeCarouselModel} from './home-carousel.model';
import {HttpClientService} from '../../shared/http/http-client.service';
import {Endpoints} from '../../shared/http/endpoints';

@Injectable({providedIn: 'root'})
export class HomeCarouselRepository {

  constructor(private http: HttpClientService) {

  }

  public fetch(): Observable<HomeCarouselModel[]> {
    return this.http.get(Endpoints.HOME_CAROUSEL);
  }
}
