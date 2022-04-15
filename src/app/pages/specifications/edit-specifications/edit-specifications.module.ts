import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {EditSpecificationsComponent} from './edit-specifications.component';

const routes: Routes = [
  {
    path: '',
    component: EditSpecificationsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditSpecificationsComponent]
})
export class EditSpecificationsModule {

}
