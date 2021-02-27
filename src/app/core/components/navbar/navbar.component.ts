import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TranslatorService} from '../../translate/translator.service';
import {Locale} from '../../translate/locale';
import {ProductCategoryService} from '../../product-category/product.category.service';
import {ProductCategory} from '../../product-category/product.category.model';
import {AppRoutingPath} from '../../../app-routing.path';
import {RouteUtils} from '../../routing/route-utils';

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

  @ViewChild('menuToggleButton') private menuToggleButton!: ElementRef;

  constructor(public translator: TranslatorService,
              private categoryService: ProductCategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(value => this.categories = value);
  }

  hideMenu(): void {
    this.menuToggleButton.nativeElement.click();
  }

  updateLanguage(lang: string): void {
    this.translator.updateLanguage(lang);
    this.hideMenu();
  }
}
