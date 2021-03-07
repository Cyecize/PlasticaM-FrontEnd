import {NgModule} from '@angular/core';
import {AppTranslateDirective} from './app-translate.directive';
import {AppTranslatePipe} from './app-translate-pipe';

@NgModule({
  declarations: [AppTranslateDirective, AppTranslatePipe],
  exports: [AppTranslatePipe, AppTranslateDirective]
})
export class TranslateModule {}
