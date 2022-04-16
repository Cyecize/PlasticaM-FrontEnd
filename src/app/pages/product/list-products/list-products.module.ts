import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {ListProductsComponent} from './list-products.component';

const routes: Routes = [
  {
    path: '',
    component: ListProductsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListProductsComponent]
})
export class ListProductsModule {

}
