import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Locale} from './locale';
import {ProductCategory} from '../product-category/product.category.model';
import {CookieService} from 'ngx-cookie-service';
import {COOKIE_LANG_NAME} from '../general.constants';
import {Observable} from 'rxjs';
import {ProductModel} from '../product/product.model';
import {ObjectUtils} from '../../shared/util/object-utils';

@Injectable({providedIn: 'root'})
export class TranslatorService {

  constructor(private translate: TranslateService,
              private cookieService: CookieService) {
    this.setDefaults();
  }

  public getCurrentLang(): string {
    return this.translate.getDefaultLang();
  }

  public getTranslation(key: string): Observable<string> {
    return this.translate.get(key);
  }

  public onTranslationChange(callback: any): void {
    this.translate.onDefaultLangChange.subscribe((event) => callback());
  }

  public updateLanguage(lang: Locale | any): boolean {
    if (Object.values(Locale).includes(lang)) {
      this.translate.setDefaultLang(lang);
      this.cookieService.set(COOKIE_LANG_NAME, lang);
      return true;
    }

    return false;
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

  public getProductDescription(product: ProductModel | null): string {
    if (ObjectUtils.isNil(product)) {
      return '';
    }

    switch (this.getCurrentLang()) {
      case Locale.BG:
        // @ts-ignore
        return product.descriptionBg;
      case Locale.EN:
        // @ts-ignore
        return product.descriptionEn;
      default:
        throw new Error(`Product description does not support language ${this.getCurrentLang()}!`);
    }
  }

  private setDefaults(): void {
    if (!this.cookieService.check(COOKIE_LANG_NAME) || !this.updateLanguage(this.cookieService.get(COOKIE_LANG_NAME))) {
      this.updateLanguage(Locale.EN);
    }
  }
}
