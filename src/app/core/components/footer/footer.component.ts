import {Component, OnInit} from '@angular/core';
import {TranslatorService} from '../../translate/translator.service';
import {Locale} from '../../translate/locale';
import {ProductCategoryService} from '../../product-category/product.category.service';
import {ProductCategory} from '../../product-category/product.category.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  showLanguages = false;
  languages = Object.values(Locale);
  categories: ProductCategory[] = [];

  constructor(public translator: TranslatorService,
              private categoryService: ProductCategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(value => this.categories = value);
  }

  updateLanguage(lang: string): void {
    this.translator.updateLanguage(lang);
  }

  showLanguagesDropdown(): void {
    this.showLanguages = !this.showLanguages;
  }
}
