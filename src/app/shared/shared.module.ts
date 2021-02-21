import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppTranslateDirective} from '../core/translate/app-translate.directive';
import {AppTranslatePipe} from '../core/translate/app-translate-pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [AppTranslateDirective, AppTranslatePipe],
  exports: [CommonModule, AppTranslateDirective, AppTranslatePipe]
})
export class SharedModule {

}
