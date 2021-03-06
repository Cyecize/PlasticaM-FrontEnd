import {Component, OnInit} from '@angular/core';
import {TranslatorService} from '../../translate/translator.service';
import {Locale} from '../../translate/locale';
import {ProductCategoryService} from '../../product-category/product.category.service';
import {ProductCategory} from '../../product-category/product.category.model';
import {AppRoutingPath} from '../../../app-routing.path';
import {RouteUtils} from '../../routing/route-utils';
import {ContactInfoService} from '../../contact-info/contact-info.service';
import {ContactInfoModel} from '../../contact-info/contact-info.model';

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

  constructor(public translator: TranslatorService,
              private categoryService: ProductCategoryService,
              private contactInfoService: ContactInfoService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(value => this.categories = value);
    this.contactInfoService.getContactInfo().subscribe(value => this.contactInfo = value);
  }

  updateLanguage(lang: string): void {
    this.translator.updateLanguage(lang);
  }

  showLanguagesDropdown(): void {
    this.showLanguages = !this.showLanguages;
  }
}
