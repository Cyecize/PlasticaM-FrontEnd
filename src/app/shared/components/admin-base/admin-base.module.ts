import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared.module';
import {AdminBaseComponent} from './admin-base.component';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutingPath} from '../../../app-routing.path';
import {HasRoleGuard} from '../../../core/user/has-role-guard.service';
import {UserRole} from '../../../core/user/user.role';

const routes: Routes = [
  {
    path: '',
    component: AdminBaseComponent,
    canActivate: [HasRoleGuard],
    data: {role: UserRole.ROLE_ADMIN},
    children: [
      {
        path: AppRoutingPath.ADD_HOME_CAROUSEL.path,
        loadChildren: () => import('../../../pages/home-carousel/create-home-carousel/create-home-carousel.module')
          .then(m => m.CreateHomeCarouselModule)
      }
    ]
  },
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
