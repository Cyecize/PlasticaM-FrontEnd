import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FieldErrorModule} from './field-error/field-error.module';
import {TranslateModule} from '../core/translate/translate.module';
import {BreadcrumbSectionModule} from './components/breadcrumb-section/breadcrumb-section.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FieldErrorModule,
    TranslateModule,
    BreadcrumbSectionModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FieldErrorModule,
    TranslateModule,
    BreadcrumbSectionModule
  ]
})
export class SharedModule {

}
