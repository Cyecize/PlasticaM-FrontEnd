import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared.module';
import {AdminBaseComponent} from './admin-base.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminBaseComponent,
    children: []
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AdminBaseComponent],
  exports: [AdminBaseComponent]
})
export class AdminBaseModule {

}
