import {Component, OnInit} from '@angular/core';
import {TranslatorService} from '../translate/translator.service';
import {Locale} from '../translate/locale';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  showLanguages = false;
  languages = Object.values(Locale);

  constructor(public translator: TranslatorService) {
  }

  ngOnInit(): void {
  }

  updateLanguage(lang: string): void {
    this.showLanguages = false;
    this.translator.updateLanguage(lang);
  }

  showLanguagesDropdown(): void {
    this.showLanguages = true;
  }
}
