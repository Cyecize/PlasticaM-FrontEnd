import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Locale} from './locale';
import {ProductCategory} from '../product-category/product.category.model';

@Injectable({providedIn: 'root'})
export class TranslatorService {

  constructor(private translate: TranslateService) {
    this.setDefaults();
  }

  public getCurrentLang(): string {
    return this.translate.getDefaultLang();
  }

  public updateLanguage(lang: Locale | any): void {
    if (Object.values(Locale).includes(lang)) {
      this.translate.setDefaultLang(lang);
    }
  }

  public getCategoryName(category: ProductCategory): string {
    switch (this.getCurrentLang()) {
      case Locale.BG:
        return category.nameBg;
      case Locale.EN:
        return category.nameEn;
      default:
        throw new Error(`Category does not support language ${this.getCurrentLang()}!`);
    }
  }

  private setDefaults(): void {
    // TODO: load setting from cookie
    this.translate.setDefaultLang(Locale.EN);
  }
}
