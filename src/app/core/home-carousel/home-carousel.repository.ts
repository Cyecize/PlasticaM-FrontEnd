import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HomeCarouselModel} from './home-carousel.model';
import {HttpClientService} from '../../shared/http/http-client.service';
import {Endpoints} from '../../shared/http/endpoints';
import {CreateHomeCarouselModel} from './create-home-carousel.model';
import {HttpClientSecuredService} from '../../shared/http/http-client-secured.service';

@Injectable({providedIn: 'root'})
export class HomeCarouselRepository {

  constructor(private http: HttpClientService,
              private httpAuth: HttpClientSecuredService) {

  }

  public fetch(): Observable<HomeCarouselModel[]> {
    return this.http.get(Endpoints.HOME_CAROUSEL);
  }

  public post(data: CreateHomeCarouselModel): Observable<HomeCarouselModel> {
    return this.httpAuth.post(Endpoints.HOME_CAROUSEL, data);
  }
}
