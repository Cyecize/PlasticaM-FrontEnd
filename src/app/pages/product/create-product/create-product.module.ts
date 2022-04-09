import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {CreateProductComponent} from './create-product.component';

const routes: Routes = [
  {
    path: '',
    component: CreateProductComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateProductComponent]
})
export class CreateProductModule {

}
