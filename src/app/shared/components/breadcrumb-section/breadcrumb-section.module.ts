import {NgModule} from '@angular/core';
import {BreadcrumbSectionComponent} from './breadcrumb-section.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '../../../core/translate/translate.module';

@NgModule({
  imports: [CommonModule, RouterModule, TranslateModule],
  declarations: [BreadcrumbSectionComponent],
  exports: [BreadcrumbSectionComponent]
})
export class BreadcrumbSectionModule {

}
