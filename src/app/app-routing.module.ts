import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AppRoutingPath} from './app-routing.path';

const routes: Routes = [
  {
    path: AppRoutingPath.CONTACTS.path,
    loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule),
  },
  {
    path: AppRoutingPath.HOME.path,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
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
