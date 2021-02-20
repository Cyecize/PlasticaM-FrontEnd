import {Component, OnInit} from '@angular/core';
import {TranslatorService} from '../translate/translator.service';
import {Locale} from '../translate/locale';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  languages = Object.values(Locale);

  constructor(public translator: TranslatorService) {
  }

  ngOnInit(): void {

  }

}
