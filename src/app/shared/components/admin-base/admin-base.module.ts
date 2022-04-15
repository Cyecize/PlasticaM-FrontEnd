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
      },
      {
        path: AppRoutingPath.ADD_CATEGORY.path,
        loadChildren: () => import('../../../pages/category/create-category/create-category.module')
          .then(m => m.CreateCategoryModule)
      },
      {
        path: AppRoutingPath.EDIT_CATEGORY.path,
        loadChildren: () => import('../../../pages/category/edit-category/edit-category.module')
          .then(m => m.EditCategoryModule)
      },
      {
        path: AppRoutingPath.LIST_CATEGORIES.path,
        loadChildren: () => import('../../../pages/category/list-categories/list-categories.module')
          .then(m => m.ListCategoriesModule)
      },
      {
        path: AppRoutingPath.ADD_PRODUCT.path,
        loadChildren: () => import('../../../pages/product/create-product/create-product.module')
          .then(m => m.CreateProductModule)
      },
      {
        path: AppRoutingPath.EDIT_SPECIFICATIONS.path,
        loadChildren: () => import('../../../pages/specifications/edit-specifications/edit-specifications.module')
          .then(m => m.EditSpecificationsModule)
      },
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
