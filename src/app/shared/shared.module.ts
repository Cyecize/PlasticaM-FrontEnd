import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppTranslateDirective} from '../core/translate/app-translate.directive';
import {AppTranslatePipe} from '../core/translate/app-translate-pipe';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [AppTranslateDirective, AppTranslatePipe],
  exports: [
    CommonModule,
    AppTranslateDirective,
    AppTranslatePipe,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule {

}
