import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {CategoryFormComponent} from './category-form.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    CategoryFormComponent
  ],
  declarations: [CategoryFormComponent]
})
export class CategoryFormModule {

}
