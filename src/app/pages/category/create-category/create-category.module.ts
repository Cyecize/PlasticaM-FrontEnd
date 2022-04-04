import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {CreateCategoryComponent} from './create-category.component';

const routes: Routes = [
  {
    path: '',
    component: CreateCategoryComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateCategoryComponent]
})
export class CreateCategoryModule {

}
