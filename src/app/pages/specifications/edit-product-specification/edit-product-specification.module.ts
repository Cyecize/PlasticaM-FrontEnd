import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {EditProductSpecificationComponent} from './edit-product-specification.component';

const routes: Routes = [
  {
    path: '',
    component: EditProductSpecificationComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditProductSpecificationComponent]
})
export class EditProductSpecificationModule {

}
