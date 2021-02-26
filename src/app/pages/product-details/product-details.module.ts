import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ProductDetailsComponent} from './product-details.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductDetailsComponent]
})
export class ProductDetailsModule {

}
