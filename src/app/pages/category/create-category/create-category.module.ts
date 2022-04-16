import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {CreateCategoryComponent} from './create-category.component';
import {CategoryFormModule} from '../category-form/category-form.module';

const routes: Routes = [
  {
    path: '',
    component: CreateCategoryComponent
  }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        CategoryFormModule
    ],
  declarations: [CreateCategoryComponent]
})
export class CreateCategoryModule {

}
