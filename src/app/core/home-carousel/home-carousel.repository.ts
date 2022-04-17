import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HomeCarouselModel} from './home-carousel.model';
import {HttpClientService} from '../../shared/http/http-client.service';
import {Endpoints} from '../../shared/http/endpoints';
import {CreateHomeCarouselModel} from './create-home-carousel.model';
import {HttpClientSecuredService} from '../../shared/http/http-client-secured.service';
import {UserService} from '../user/user.service';
import {switchMap} from 'rxjs/operators';
import {ObjectUtils} from '../../shared/util/object-utils';
import {RouteUtils} from '../routing/route-utils';

@Injectable({providedIn: 'root'})
export class HomeCarouselRepository {

  constructor(private http: HttpClientService,
              private httpAuth: HttpClientSecuredService,
              private userService: UserService) {

  }

  public fetch(showHidden: boolean): Observable<HomeCarouselModel[]> {
    const url = `${Endpoints.HOME_CAROUSEL}?showHidden=${showHidden}`;

    return this.userService.currentUser$.pipe(switchMap(user => {
      if (ObjectUtils.isNil(user)) {
        return this.http.get<HomeCarouselModel[]>(url);
      }

      return this.httpAuth.get<HomeCarouselModel[]>(url);
    }));
  }

  public post(data: CreateHomeCarouselModel): Observable<HomeCarouselModel> {
    return this.httpAuth.post(Endpoints.HOME_CAROUSEL, data);
  }

  public put(id: number, data: CreateHomeCarouselModel): Observable<HomeCarouselModel> {
    return this.httpAuth.put(RouteUtils.setPathParams(Endpoints.HOME_CAROUSEL_ITEM, {id}), data);
  }

  public get(id: number): Observable<HomeCarouselModel> {
    return this.httpAuth.get(RouteUtils.setPathParams(Endpoints.HOME_CAROUSEL_ITEM, {id}));
  }
}
