import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {EditSpecificationTypeComponent} from './edit-specification-type.component';

const routes: Routes = [
  {
    path: '',
    component: EditSpecificationTypeComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditSpecificationTypeComponent]
})
export class EditSpecificationTypeModule {

}
