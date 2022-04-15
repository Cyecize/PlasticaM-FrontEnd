import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {ListCategoriesComponent} from './list-categories.component';

const routes: Routes = [
  {
    path: '',
    component: ListCategoriesComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListCategoriesComponent]
})
export class ListCategoriesModule {

}
