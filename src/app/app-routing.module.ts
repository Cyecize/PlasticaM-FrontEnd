import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AppRoutingPath} from './app-routing.path';

const routes: Routes = [
  {
    path: AppRoutingPath.CONTACTS.path,
    loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsModule),
  },
  {
    path: AppRoutingPath.ABOUT_US.path,
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule),
  },
  {
    path: AppRoutingPath.PRIVACY_POLICY.path,
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule),
  },
  {
    path: AppRoutingPath.PRODUCTS.path,
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule),
  },
  {
    path: AppRoutingPath.PRODUCT_DETAILS.path,
    loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsModule),
  },
  {
    path: AppRoutingPath.HOME.path,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

// canActivate: [AuthenticationGuard],
// canActivateChild: [AuthenticationGuard],

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
