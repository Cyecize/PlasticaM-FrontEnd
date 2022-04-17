import {Injectable} from '@angular/core';
import {ProductQuery} from './product.query';
import {Observable} from 'rxjs';
import {Page} from '../../shared/util/page';
import {ProductModel} from './product.model';
import {HttpClientService} from '../../shared/http/http-client.service';
import {Endpoints} from '../../shared/http/endpoints';
import {RouteUtils} from '../routing/route-utils';
import {HttpClientSecuredService} from '../../shared/http/http-client-secured.service';
import {CreateProductModel} from './create-product.model';
import {UserService} from '../user/user.service';
import {switchMap} from 'rxjs/operators';
import {ObjectUtils} from '../../shared/util/object-utils';
import {UserModel} from '../user/user.model';
import {GalleryItemModel} from './gallery-item.model';

@Injectable({providedIn: 'root'})
export class ProductRepository {

  constructor(private http: HttpClientService,
              private httpSecure: HttpClientSecuredService,
              private userService: UserService) {
  }

  public search(query: ProductQuery): Observable<Page<ProductModel>> {
    return this.userService.currentUser$.pipe(switchMap((user: UserModel | undefined) => {
      if (!ObjectUtils.isNil(user?.id)) {
        return this.httpSecure.post<ProductQuery, Page<ProductModel>>(Endpoints.PRODUCTS, query);
      }

      return this.http.post<ProductQuery, Page<ProductModel>>(Endpoints.PRODUCTS, query);
    }));
  }

  public findOne(id: number): Observable<ProductModel | null> {
    return this.userService.currentUser$.pipe(switchMap((user: UserModel | undefined) => {
      if (!ObjectUtils.isNil(user?.id)) {
        return this.httpSecure.get<ProductModel | null>(RouteUtils.setPathParams(Endpoints.PRODUCT, [id]));
      }

      return this.http.get<ProductModel | null>(RouteUtils.setPathParams(Endpoints.PRODUCT, [id]));
    }));
  }

  public create(data: CreateProductModel): Observable<ProductModel> {
    return this.httpSecure.post(Endpoints.PRODUCT_CREATE, data);
  }

  public update(id: number, data: CreateProductModel): Observable<ProductModel> {
    return this.httpSecure.put(RouteUtils.setPathParams(Endpoints.PRODUCT, [id]), data);
  }

  public removeImage(prodId: number, imageId: number): Observable<any> {
    return this.httpSecure.delete(RouteUtils.setPathParams(Endpoints.PRODUCT_GALLERY_ITEM, {prodId, imageId}));
  }

  public getProductGallery(prodId: number): Observable<GalleryItemModel[]> {
    return this.http.get(RouteUtils.setPathParams(Endpoints.PRODUCT_GALLERY_ITEMS, {prodId}));
  }
}
