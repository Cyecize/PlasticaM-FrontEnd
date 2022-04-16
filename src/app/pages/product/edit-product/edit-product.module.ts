import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {ProductFormModule} from '../product-form/product-form.module';
import {EditProductComponent} from './edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: EditProductComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ProductFormModule
  ],
  declarations: [EditProductComponent]
})
export class EditProductModule {

}
