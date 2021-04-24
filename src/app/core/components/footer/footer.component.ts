import {Component, OnInit} from '@angular/core';
import {TranslatorService} from '../../translate/translator.service';
import {Locale} from '../../translate/locale';
import {ProductCategoryService} from '../../product-category/product.category.service';
import {ProductCategory} from '../../product-category/product.category.model';
import {AppRoutingPath} from '../../../app-routing.path';
import {RouteUtils} from '../../routing/route-utils';
import {ContactInfoService} from '../../contact-info/contact-info.service';
import {ContactInfoModel} from '../../contact-info/contact-info.model';
import {UserService} from '../../user/user.service';
import {UserModel} from '../../user/user.model';
import {RouteNavigator} from '../../routing/route-navigator.service';
import {LoaderService} from '../../../shared/components/loader/loader.service';
import {UserRole} from '../../user/user.role';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  showLanguages = false;
  languages = Object.values(Locale);
  categories: ProductCategory[] = [];

  routes = AppRoutingPath;
  routeUtils = RouteUtils;
  contactInfo?: ContactInfoModel;
  user!: UserModel;
  isAdmin!: boolean;

  constructor(public translator: TranslatorService,
              private categoryService: ProductCategoryService,
              private contactInfoService: ContactInfoService,
              private userService: UserService,
              private nav: RouteNavigator,
              private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(value => this.categories = value);
    this.contactInfoService.getContactInfo().subscribe(value => this.contactInfo = value);
    this.userService.getUser().subscribe(value => this.user = value);
    this.userService.hasRole(UserRole.ROLE_ADMIN).subscribe(value => this.isAdmin = value);
  }

  updateLanguage(lang: string): void {
    this.translator.updateLanguage(lang);
  }

  showLanguagesDropdown(): void {
    this.showLanguages = !this.showLanguages;
  }

  async onLogout(): Promise<void> {
    this.loaderService.show();
    await this.userService.logout();
    this.loaderService.hide();
    this.nav.navigate(AppRoutingPath.HOME);
  }
}
