import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {NavbarComponent} from './navbar.component';
import {AppRoutingModule} from '../../../app-routing.module';

@NgModule({
  imports: [SharedModule, AppRoutingModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class NavbarModule {

}
