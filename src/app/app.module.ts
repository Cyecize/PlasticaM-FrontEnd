import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {SharedModule} from './shared/shared.module';
import {FooterModule} from './core/components/footer/footer.module';
import {NavbarModule} from './core/components/navbar/navbar.module';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
  ],
  imports: [
    SharedModule,
    NavbarModule,
    FooterModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {

}
