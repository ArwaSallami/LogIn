import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import {HomepageModule} from './homepage/homepage.module';
import { AppRoutingModule } from './app-routing.module';
import {MembershipModule} from './membership/membership.module';
import {OfferModule} from './homepage/offers/offer.module';
import {JwtInterceptorService} from './shared/ApiServices/jwt-interceptor.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {PlatformModule} from './platform/platform.module';
import {HomepageRoutingModule} from './homepage/homepage-routing.module';
import {MembershipRoutingModule} from './membership/membership-routing.module';
import {PlatformRoutingModule} from './platform/platform-routing.module';
import {AuthGuardService} from './shared/ApiServices/auth-guard.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { AgmCoreModule} from "@agm/core";



@NgModule({
  declarations: [
    AppComponent,
  
    
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    PlatformRoutingModule,
    MembershipRoutingModule,
    HomepageRoutingModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    HomepageModule,
    MembershipModule,
    PlatformModule,
    OfferModule,


  ],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
    }
}
