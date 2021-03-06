import {RouteConfig} from './core/routing/route-config';

export class AppRoutingPath {
  public static readonly NOT_FOUND: RouteConfig = new RouteConfig('not-found', null);
  public static readonly HOME: RouteConfig = new RouteConfig('', null);
  public static readonly CONTACTS: RouteConfig = new RouteConfig('contacts', null);
  public static readonly ABOUT_US: RouteConfig = new RouteConfig('about-us', null);
  public static readonly PRODUCTS: RouteConfig = new RouteConfig('products', null);
  public static readonly PRODUCTS_CATEGORY: RouteConfig = new RouteConfig('category/:catId', AppRoutingPath.PRODUCTS);
  public static readonly PRODUCT_DETAILS: RouteConfig = new RouteConfig('products/:prodId', null);
  public static readonly LOGIN: RouteConfig = new RouteConfig('login', null);
  public static readonly PRIVACY_POLICY: RouteConfig = new RouteConfig('privacy-policy', null);
  public static readonly ADMIN_PANEL: RouteConfig = new RouteConfig('admin-panel', null);
}
