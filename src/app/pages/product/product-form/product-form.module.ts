import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {ProductFormComponent} from './product-form.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    ProductFormComponent
  ],
  declarations: [ProductFormComponent]
})
export class ProductFormModule {

}
