import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppTranslateDirective} from '../core/translate/app-translate.directive';
import {AppTranslatePipe} from '../core/translate/app-translate-pipe';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [AppTranslateDirective, AppTranslatePipe],
  exports: [
    CommonModule,
    AppTranslateDirective,
    AppTranslatePipe,
    RouterModule,
  ]
})
export class SharedModule {

}
