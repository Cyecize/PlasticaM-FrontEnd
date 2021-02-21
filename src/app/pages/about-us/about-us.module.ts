import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {AboutUsComponent} from './about-us.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AboutUsComponent]
})
export class AboutUsModule {

}
