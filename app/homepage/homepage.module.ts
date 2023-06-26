import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomepageRoutingModule} from './homepage-routing.module';
import {HomepageComponent} from './homepage.component';
import {SliderComponent} from './components/slider/slider.component';
import {TrackerComponent} from './components/tracker/tracker.component';
import {WhoAreWeComponent} from './components/who-are-we/who-are-we.component';
import {OurOffersComponent} from './components/our-offers/our-offers.component';
import {SimulatorComponent} from './components/simulator/simulator.component';
import {ClientsComponent} from './components/clients/clients.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../shared/shared.module';
// import {SupportComponent} from './support/support.component';
import { OffersComponent } from './offers/offers.component';
import { NewCommandComponent } from './new-command/new-command.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArchwizardModule} from 'angular-archwizard';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons/faTrashAlt';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {faChevronDown, faChevronUp, faQrcode} from '@fortawesome/free-solid-svg-icons';
import {faFilePdf} from '@fortawesome/free-regular-svg-icons/faFilePdf';
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {SupportModule} from './support/support.module';
import { SuivcolisComponent } from './suivcolis/suivcolis.component';
import {FaqComponent} from './faq/faq.component';
import { PaymentConfiramtionComponent } from './payment-confiramtion/payment-confiramtion.component';

@NgModule({
  declarations: [
    HomepageComponent,
    SliderComponent,
    TrackerComponent,
    WhoAreWeComponent,
    OurOffersComponent,
    SimulatorComponent,
    ClientsComponent,
    // SupportComponent,
    OffersComponent,
    NewCommandComponent,
    SuivcolisComponent,
    FaqComponent,
    PaymentConfiramtionComponent
  ],
  exports: [

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    HomepageRoutingModule,
    NgbModule,
    ArchwizardModule,
    FontAwesomeModule,
    SupportModule,
    Ng4LoadingSpinnerModule.forRoot()
  ]
})
export class HomepageModule {
    constructor() {
        library.add(faTrashAlt, faChevronUp, faChevronDown, faQrcode, faFilePdf, faDownload, faSignOutAlt);
    }
}
