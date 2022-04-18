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
        path: AppRoutingPath.EDIT_HOME_CAROUSEL.path,
        loadChildren: () => import('../../../pages/home-carousel/edit-home-carousel/edit-home-carousel.module')
          .then(m => m.EditHomeCarouselModule)
      },
      {
        path: AppRoutingPath.LIST_HOME_CAROUSEL_ITEMS.path,
        loadChildren: () => import('../../../pages/home-carousel/list-home-carousel-items/list-home-carousel-items.module')
          .then(m => m.ListHomeCarouselItemsModule)
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
        path: AppRoutingPath.EDIT_PRODUCT.path,
        loadChildren: () => import('../../../pages/product/edit-product/edit-product.module')
          .then(m => m.EditProductModule)
      },
      {
        path: AppRoutingPath.ADD_PRODUCT.path,
        loadChildren: () => import('../../../pages/product/create-product/create-product.module')
          .then(m => m.CreateProductModule)
      },
      {
        path: AppRoutingPath.LIST_PRODUCTS.path,
        loadChildren: () => import('../../../pages/product/list-products/list-products.module')
          .then(m => m.ListProductsModule)
      },
      {
        path: AppRoutingPath.EDIT_SPEC_CAT.path,
        loadChildren: () => import('../../../pages/specifications/assign-specifications/assign-specifications.module')
          .then(m => m.AssignSpecificationsModule)
      },
      {
        path: AppRoutingPath.EDIT_SPEC_TYPE.path,
        loadChildren: () => import('../../../pages/specifications/edit-specification-type/edit-specification-type.module')
          .then(m => m.EditSpecificationTypeModule)
      },
      {
        path: AppRoutingPath.EDIT_PROD_SPEC.path,
        loadChildren: () => import('../../../pages/specifications/edit-product-specification/edit-product-specification.module')
          .then(m => m.EditProductSpecificationModule)
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
