import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TranslatorService} from '../../translate/translator.service';
import {Locale} from '../../translate/locale';
import {ProductCategoryService} from '../../product-category/product.category.service';
import {ProductCategory} from '../../product-category/product.category.model';
import {AppRoutingPath} from '../../../app-routing.path';
import {RouteUtils} from '../../routing/route-utils';
import {NavbarService} from './navbar.service';

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

  isNavbarTransparent = false;

  @ViewChild('menuToggleButton') private menuToggleButton!: ElementRef;

  constructor(public translator: TranslatorService,
              private categoryService: ProductCategoryService,
              private navbarService: NavbarService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(value => this.categories = value);
    this.navbarService.onNavbarTransparentChanged.subscribe(value => this.isNavbarTransparent = value);
  }

  hideMenu(): void {
    this.menuToggleButton.nativeElement.click();
  }

  updateLanguage(lang: string): void {
    this.translator.updateLanguage(lang);
    this.hideMenu();
  }
}
