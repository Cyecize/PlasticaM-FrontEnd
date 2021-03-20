import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {SharedModule} from './shared/shared.module';
import {FooterModule} from './core/components/footer/footer.module';
import {NavbarModule} from './core/components/navbar/navbar.module';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {AuthInterceptor} from './core/user/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    NavbarModule,
    FooterModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
