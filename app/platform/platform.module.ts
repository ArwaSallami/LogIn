import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlatformRoutingModule} from './platform-routing.module';
import {NgForIfEmpty, PackageHistoryComponent} from './package-history/package-history.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NewCommandComponent } from './new-command/new-command.component';
import { TrackingComponent } from './tracking/tracking.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../shared/ApiServices/auth.service';
import { SettingsComponent } from './settings/settings.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {faSpinner} from '@fortawesome/free-solid-svg-icons/faSpinner';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgxPaginationModule} from 'ngx-pagination';
import {OrderModule} from 'ngx-order-pipe';
import {HomepageModule} from '../homepage/homepage.module';
import {SharedModule} from '../shared/shared.module';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import { PackageHistoryReceivedComponent } from './package-history-received/package-history-received.component';
import { TrackingReceivedComponent } from './tracking-received/tracking-received.component';
import {faFileAlt, faInfoCircle, faSortDown} from '@fortawesome/free-solid-svg-icons';
import { SuiviPlComponent } from './suivi-pl/suivi-pl.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { NewReclamationComponent } from './new-reclamation/new-reclamation.component';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import { StatsComponent } from './stats/stats.component';
@NgModule({
  declarations: [PackageHistoryComponent, NewCommandComponent, TrackingComponent, SettingsComponent, NgForIfEmpty, PackageHistoryReceivedComponent, TrackingReceivedComponent, SuiviPlComponent, ReclamationComponent, NewReclamationComponent, StatsComponent],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    OrderModule,
    HomepageModule,
    SharedModule,
    FilterPipeModule,
    Ng4LoadingSpinnerModule.forRoot(),
    AgmJsMarkerClustererModule
  ],
  providers: [AuthService]
})
export class PlatformModule {
  constructor() {
      library.add(faSpinner, faFileAlt, faSortDown);
  }
}
