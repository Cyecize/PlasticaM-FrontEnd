import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Locale} from './locale';

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

  private setDefaults(): void {
    // TODO: load setting from cookie
    this.translate.setDefaultLang(Locale.EN);
  }
}
