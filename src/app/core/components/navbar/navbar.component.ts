import {Component, OnInit} from '@angular/core';
import {TranslatorService} from '../../translate/translator.service';
import {Locale} from '../../translate/locale';
import {ProductCategoryService} from '../../product-category/product.category.service';
import {ProductCategory} from '../../product-category/product.category.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  languages = Object.values(Locale);
  categories: ProductCategory[] = [];

  constructor(public translator: TranslatorService,
              private categoryService: ProductCategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(value => this.categories = value);
  }
}