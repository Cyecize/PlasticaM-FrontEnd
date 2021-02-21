import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AppRoutingPath} from './app-routing.path';

const routes: Routes = [
  {
    path: AppRoutingPath.CONTACTS.path,
    loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsModule),
  },
  {
    path: AppRoutingPath.PRIVACY_POLICY.path,
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule),
  },
  {
    path: AppRoutingPath.HOME.path,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    pathMatch: 'full'
  },
];

// canActivate: [AuthenticationGuard],
// canActivateChild: [AuthenticationGuard],

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
