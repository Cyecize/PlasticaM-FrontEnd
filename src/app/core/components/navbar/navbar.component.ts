import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TranslatorService} from '../../translate/translator.service';
import {Locale} from '../../translate/locale';
import {ProductCategoryService} from '../../product-category/product.category.service';
import {ProductCategory} from '../../product-category/product.category.model';
import {AppRoutingPath} from '../../../app-routing.path';
import {RouteUtils} from '../../routing/route-utils';
import {NavbarService} from './navbar.service';
import {ContactInfoModel} from '../../contact-info/contact-info.model';
import {ContactInfoService} from '../../contact-info/contact-info.service';
import {ObjectUtils} from '../../../shared/util/object-utils';
import {RouteNavigator} from '../../routing/route-navigator.service';
import {UserService} from '../../user/user.service';
import {UserModel} from '../../user/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  languages = Object.values(Locale);
  categories: ProductCategory[] = [];

  routes = AppRoutingPath;
  routeUtils = RouteUtils;
  contactInfo?: ContactInfoModel;
  searchTerm?: string;
  user!: UserModel;

  isNavbarTransparent = false;

  @ViewChild('menuToggleButton') private menuToggleButton!: ElementRef;

  constructor(public translator: TranslatorService,
              private categoryService: ProductCategoryService,
              private navbarService: NavbarService,
              private contactInfoService: ContactInfoService,
              private nav: RouteNavigator,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(value => this.categories = value);
    this.navbarService.onNavbarTransparentChanged.subscribe(value => this.isNavbarTransparent = value);
    this.contactInfoService.getContactInfo().subscribe(value => this.contactInfo = value);
    // @ts-ignore
    this.userService.currentUser$.subscribe(value => this.user = value);
  }

  hideMenu(): void {
    this.menuToggleButton.nativeElement.click();
  }

  updateLanguage(lang: string): void {
    this.translator.updateLanguage(lang);
    this.hideMenu();
  }

  search(): void {
    if (ObjectUtils.isNil(this.searchTerm)) {
      return;
    }

    this.nav.navigate(AppRoutingPath.PRODUCTS, null, {queryParams: {q: this.searchTerm}});
  }
}
