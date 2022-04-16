import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {EditCategoryComponent} from './edit-category.component';
import {CategoryFormModule} from '../category-form/category-form.module';

const routes: Routes = [
  {
    path: '',
    component: EditCategoryComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CategoryFormModule
  ],
  declarations: [EditCategoryComponent]
})
export class EditCategoryModule {

}
