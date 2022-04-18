import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {AssignSpecificationsComponent} from './assign-specifications.component';

const routes: Routes = [
  {
    path: '',
    component: AssignSpecificationsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AssignSpecificationsComponent]
})
export class AssignSpecificationsModule {

}
