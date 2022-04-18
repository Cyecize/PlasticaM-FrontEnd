export class Endpoints {
  public static readonly CONTACTS = '/contact-info';

  public static readonly QUESTION = '/question';

  public static readonly CATEGORIES = '/categories';

  public static readonly CATEGORY = '/category/:catId';

  public static readonly PRODUCTS = '/products';

  public static readonly PRODUCT = '/products/:id';

  public static readonly PRODUCT_GALLERY_ITEMS = '/product/:prodId/gallery_items';

  public static readonly PRODUCT_GALLERY_ITEM = '/product/:prodId/gallery_items/:imageId';

  public static readonly PRODUCT_CREATE = '/product/create';

  public static readonly HOME_CAROUSEL = '/home-carousel';

  public static readonly HOME_CAROUSEL_ITEM = '/home-carousel/:id';

  public static readonly LOGIN = '/login';

  public static readonly LOGOUT = '/logout';

  public static readonly USER_DETAILS = '/user-details';

  public static readonly SPECIFICATION_TYPES_SEARCH  = '/specification_types/search';

  public static readonly PRODUCT_SPECS_SEARCH  = '/product_specifications/search';

  public static readonly PRODUCT_SPECIFICATION = '/product_specifications/:id';

  public static readonly SPECIFICATION_CATEGORY = '/specification_types/:specTypeId/category/:catId';

  public static readonly SPECIFICATION_TYPES = '/specification_types';

  public static readonly SPECIFICATION_TYPE = '/specification_types/:typeId';
}
