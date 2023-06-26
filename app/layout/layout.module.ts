import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLock, faUser, faPhone, faMapMarkerAlt, faAt, faClock, faAngleUp, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faTwitterSquare, faFacebookSquare, faGooglePlusSquare } from '@fortawesome/free-brands-svg-icons';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons/faTrashAlt';
import {FooterComponent} from './components/footer/footer.component';
import {TopNavbarComponent} from './components/top-navbar/top-navbar.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import { MemberLayoutComponent } from './member-layout/member-layout.component';
import {SharedModule} from '../shared/shared.module';
import { PlateformLayoutComponent } from './plateform-layout/plateform-layout.component';
import { MembershipFooterComponent } from './components/membership-footer/membership-footer.component';
import { MembershipHeaderComponent } from './components/membership-header/membership-header.component';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
      TopNavbarComponent,
      FooterComponent,
      MainLayoutComponent,
      MemberLayoutComponent,
      PlateformLayoutComponent,
      MembershipFooterComponent,
      MembershipHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FontAwesomeModule,
    SharedModule,
    NgbModule,
    Ng4LoadingSpinnerModule.forRoot(),
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
      })
  ],
    exports: [
        MainLayoutComponent,
        MemberLayoutComponent,
        PlateformLayoutComponent
    ]
})
export class LayoutModule {
    constructor() {
        // Add an icon to the library for convenient access in other components
        library.add(faLock, faUser, faPhone, faMapMarkerAlt, faAt, faClock, faAngleUp, faPaperPlane);
        library.add(faLock, faUser, faPhone, faMapMarkerAlt, faAt, faClock, faAngleUp);
        library.add(faTwitterSquare, faFacebookSquare, faGooglePlusSquare, faTrashAlt);
    }

}
